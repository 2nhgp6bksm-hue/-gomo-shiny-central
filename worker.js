const RADAR_DATA_URL = "https://timely-meringue-812f51.netlify.app/data/historique-central.json";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/shiny-data") {
      try {
        const remote = await fetch(`${RADAR_DATA_URL}?t=${Date.now()}`, {
          headers: {"user-agent":"GoMo-Shiny-Central/1.0"},
          cf: {cacheTtl: 0, cacheEverything: false}
        });
        if (!remote.ok) throw new Error(`Radar source HTTP ${remote.status}`);
        const body = await remote.text();
        return new Response(body, {status: 200, headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store, max-age=0","access-control-allow-origin":"*","x-gomo-source":"radar-netlify"}});
      } catch (error) {
        const fallbackURL = new URL("/data/fallback.json", request.url);
        const fallback = await env.ASSETS.fetch(new Request(fallbackURL));
        const headers = new Headers(fallback.headers);
        headers.set("cache-control","no-store, max-age=0");
        headers.set("x-gomo-source","fallback");
        return new Response(fallback.body,{status:fallback.status,headers});
      }
    }
    return env.ASSETS.fetch(request);
  }
};
