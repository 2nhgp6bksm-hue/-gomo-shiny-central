const RADAR_DATA_URL = "https://timely-meringue-812f51.netlify.app/data/historique-central.json";
const MAX_REMOTE_BYTES = 1000000;

function isRadarPayload(payload) {
  const history = Array.isArray(payload?.history) ? payload.history : payload?.days;
  return Boolean(payload && typeof payload === "object" && Array.isArray(history));
}

async function fallbackResponse(request, env) {
  const fallbackURL = new URL("/fallback.json", request.url);
  const fallback = await env.ASSETS.fetch(new Request(fallbackURL));
  const headers = new Headers(fallback.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store, max-age=0");
  headers.set("x-gomo-source", "fallback");
  return new Response(fallback.body, { status: fallback.status, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/shiny-data") {
      try {
        const remote = await fetch(`${RADAR_DATA_URL}?t=${Date.now()}`, {
          headers: { "user-agent": "GoMo-Shiny-Central/1.1" },
          cf: { cacheTtl: 0, cacheEverything: false },
          signal: AbortSignal.timeout(5000)
        });
        if (!remote.ok) throw new Error(`Radar source HTTP ${remote.status}`);
        const contentLength = Number(remote.headers.get("content-length") || 0);
        if (contentLength > MAX_REMOTE_BYTES) throw new Error("Radar source too large");

        const payload = await remote.json();
        if (!isRadarPayload(payload)) throw new Error("Invalid Radar payload");

        return Response.json(payload, {
          status: 200,
          headers: {
            "cache-control": "no-store, max-age=0",
            "access-control-allow-origin": "*",
            "x-gomo-source": "radar-netlify"
          }
        });
      } catch (error) {
        console.warn(JSON.stringify({
          message: "Radar source unavailable; serving verified baseline",
          error: error instanceof Error ? error.message : String(error)
        }));
        return fallbackResponse(request, env);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
