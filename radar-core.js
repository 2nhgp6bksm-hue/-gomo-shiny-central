(function (root, factory) {
  "use strict";

  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.ShinyRadarCore = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DAY_MS = 86400000;
  const HOME_SERVER = 1591;
  const TIME_ZONE = "Europe/Brussels";
  const CYCLE = ["A", "C", "B"];
  const GROUPS = ["A", "B", "C"];
  const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

  function uniqServers(values) {
    return [...new Set((Array.isArray(values) ? values : [])
      .map(Number)
      .filter((value) => Number.isInteger(value) && value > 0 && value !== HOME_SERVER))]
      .sort((a, b) => a - b);
  }

  function dateSerial(value) {
    if (!ISO_DATE.test(String(value || ""))) return Number.NaN;
    const [year, month, day] = value.split("-").map(Number);
    const serial = Date.UTC(year, month - 1, day);
    const check = new Date(serial);

    if (
      check.getUTCFullYear() !== year ||
      check.getUTCMonth() !== month - 1 ||
      check.getUTCDate() !== day
    ) {
      return Number.NaN;
    }

    return serial;
  }

  function dayDiff(from, to) {
    const start = dateSerial(from);
    const end = dateSerial(to);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.NaN;
    return Math.round((end - start) / DAY_MS);
  }

  function dateInTimeZone(date = new Date(), timeZone = TIME_ZONE) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function sameServers(left, right) {
    const a = uniqServers(left);
    const b = uniqServers(right);
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  function detectGroup(servers, groups) {
    return GROUPS.find((group) => sameServers(servers, groups[group])) || null;
  }

  function normalizeGroups(rawGroups) {
    return Object.fromEntries(GROUPS.map((group) => [group, uniqServers(rawGroups?.[group])]));
  }

  function isConfirmed(status) {
    const value = String(status || "").toLowerCase();
    return value === "confirmed" || value.includes("confirm");
  }

  function normalizeBaseline(data) {
    const groups = normalizeGroups(data?.groups);
    if (GROUPS.some((group) => groups[group].length === 0)) {
      throw new Error("Groupes Shiny incomplets");
    }

    const sourceHistory = Array.isArray(data?.history)
      ? data.history
      : Array.isArray(data?.days)
        ? data.days
        : [];
    const byDate = new Map();

    for (const item of sourceHistory) {
      const date = String(item?.date || "");
      if (!Number.isFinite(dateSerial(date))) continue;

      const suppliedServers = uniqServers(item?.servers);
      let group = String(item?.group || "").toUpperCase();
      if (!GROUPS.includes(group) && suppliedServers.length) {
        group = detectGroup(suppliedServers, groups) || "";
      }
      if (!GROUPS.includes(group)) continue;
      if (suppliedServers.length && !sameServers(suppliedServers, groups[group])) continue;

      byDate.set(date, {
        date,
        group,
        servers: [...groups[group]],
        status: "confirmed",
        source: String(item?.source || "Archive confirmée")
      });
    }

    return {
      groups,
      history: [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)),
      updatedAt: String(data?.updated_at || data?.updatedAt || data?.generated_at || ""),
      version: String(data?.central_version || data?.version || data?.schema_version || ""),
      timeZone: String(data?.timezone || TIME_ZONE)
    };
  }

  function mergeConfirmedRemote(model, data) {
    const sourceHistory = Array.isArray(data?.history)
      ? data.history
      : Array.isArray(data?.days)
        ? data.days
        : [];
    const byDate = new Map(model.history.map((item) => [item.date, item]));
    let accepted = 0;
    let rejected = 0;

    for (const item of sourceHistory) {
      const date = String(item?.date || "");
      const servers = uniqServers(item?.servers);
      if (!Number.isFinite(dateSerial(date)) || !isConfirmed(item?.status) || servers.length === 0) {
        rejected += 1;
        continue;
      }

      let group = String(item?.group || "").toUpperCase();
      if (!GROUPS.includes(group)) group = detectGroup(servers, model.groups) || "";
      if (!GROUPS.includes(group) || !sameServers(servers, model.groups[group])) {
        rejected += 1;
        continue;
      }

      const existing = byDate.get(date);
      if (existing) {
        if (existing.group !== group) rejected += 1;
        continue;
      }

      byDate.set(date, {
        date,
        group,
        servers: [...model.groups[group]],
        status: "confirmed",
        source: String(item?.source || "Confirmation Radar")
      });
      accepted += 1;
    }

    return {
      model: {
        ...model,
        history: [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
      },
      accepted,
      rejected
    };
  }

  function confirmedDays(model) {
    return (model?.history || [])
      .filter((item) => GROUPS.includes(item.group) && isConfirmed(item.status))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function latestConfirmed(model) {
    return confirmedDays(model).at(-1) || null;
  }

  function transitionStats(model) {
    const days = confirmedDays(model);
    let matches = 0;
    let trials = 0;

    for (let index = 1; index < days.length; index += 1) {
      const previous = days[index - 1];
      const current = days[index];
      if (dayDiff(previous.date, current.date) !== 1) continue;

      trials += 1;
      const expected = CYCLE[(CYCLE.indexOf(previous.group) + 1) % CYCLE.length];
      if (current.group === expected) matches += 1;
    }

    return {
      matches,
      trials,
      confidence: trials ? Math.round((matches / trials) * 100) : 0
    };
  }

  function predictGroup(model, date) {
    const latest = latestConfirmed(model);
    if (!latest || !Number.isFinite(dateSerial(date))) {
      return { group: null, confidence: 0 };
    }

    const difference = dayDiff(latest.date, date);
    const startIndex = CYCLE.indexOf(latest.group);
    const offset = ((difference % CYCLE.length) + CYCLE.length) % CYCLE.length;
    const stats = transitionStats(model);

    return {
      group: CYCLE[(startIndex + offset) % CYCLE.length],
      confidence: stats.confidence
    };
  }

  function getDay(model, date) {
    const exact = confirmedDays(model).find((item) => item.date === date);
    if (exact) {
      return {
        date,
        group: exact.group,
        servers: [...exact.servers],
        confirmed: true,
        confidence: 100
      };
    }

    const prediction = predictGroup(model, date);
    return {
      date,
      group: prediction.group,
      servers: prediction.group ? [...model.groups[prediction.group]] : [],
      confirmed: false,
      confidence: prediction.confidence
    };
  }

  return {
    CYCLE: [...CYCLE],
    GROUPS: [...GROUPS],
    HOME_SERVER,
    TIME_ZONE,
    confirmedDays,
    dateInTimeZone,
    dayDiff,
    detectGroup,
    getDay,
    latestConfirmed,
    mergeConfirmedRemote,
    normalizeBaseline,
    predictGroup,
    sameServers,
    transitionStats,
    uniqServers
  };
});
