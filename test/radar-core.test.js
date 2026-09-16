"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const Core = require("../radar-core.js");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");

test("03:59:59 Europe/Brussels reste sur la journée précédente", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-07-10T01:59:59Z")), "2026-07-09");
});

test("04:00:00 Europe/Brussels passe à la nouvelle journée", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-07-10T02:00:00Z")), "2026-07-10");
});

test("03:30 en été belge reste sur la veille", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-07-10T01:30:00Z")), "2026-07-09");
});

test("04:30 en été belge utilise la date courante", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-07-10T02:30:00Z")), "2026-07-10");
});

test("03:30 en hiver belge reste sur la veille", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-01-10T02:30:00Z")), "2026-01-09");
});

test("04:30 en hiver belge utilise la date courante", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-01-10T03:30:00Z")), "2026-01-10");
});

test("passage CET vers CEST respecte la coupure belge", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-03-29T01:30:00Z")), "2026-03-28");
  assert.equal(Core.shinyLogicalDate(new Date("2026-03-29T02:00:00Z")), "2026-03-29");
});

test("passage CEST vers CET respecte les deux occurrences de 02:30", () => {
  assert.equal(Core.shinyLogicalDate(new Date("2026-10-25T00:30:00Z")), "2026-10-24");
  assert.equal(Core.shinyLogicalDate(new Date("2026-10-25T01:30:00Z")), "2026-10-24");
  assert.equal(Core.shinyLogicalDate(new Date("2026-10-25T03:00:00Z")), "2026-10-25");
});

test("hors de 00:00–03:59 le résultat reste identique à l'ancien calcul", () => {
  const instants = [
    "2026-01-10T03:00:00Z",
    "2026-03-29T02:00:00Z",
    "2026-07-10T02:00:00Z",
    "2026-10-25T03:00:00Z",
    "2026-12-31T22:59:59Z"
  ];
  for (const instant of instants) {
    const date = new Date(instant);
    assert.equal(Core.shinyLogicalDate(date), Core.dateInTimeZone(date));
  }
});

test("le cycle A → C → B reste inchangé", () => {
  assert.deepEqual(Core.CYCLE, ["A", "C", "B"]);
});

test("les groupes A/B/C et fallback.json restent inchangés", () => {
  assert.equal(sha256("fallback.json"), "d0a2fc1eb8840f0bb953e3ed653b06405a180779e57c55d58aac91cd96db8fc7");
  const fallback = JSON.parse(read("fallback.json"));
  assert.deepEqual(Object.keys(fallback.groups).sort(), ["A", "B", "C"]);
  const model = Core.normalizeBaseline(fallback);
  assert.deepEqual(Object.fromEntries(Object.entries(model.groups).map(([group, servers]) => [group, servers.length])), { A: 21, B: 19, C: 23 });
});

test("1591 reste exclu des groupes extérieurs", () => {
  const model = Core.normalizeBaseline(JSON.parse(read("fallback.json")));
  for (const servers of Object.values(model.groups)) assert.equal(servers.includes(1591), false);
  assert.equal(Core.HOME_SERVER, 1591);
});

test("l'affichage et le contrôle minute utilisent la journée Shiny", () => {
  const app = read("app.js");
  assert.equal((app.match(/Core\.shinyLogicalDate\(/g) || []).length, 2);
  assert.equal((app.match(/Core\.dateInTimeZone\(new Date\(\)/g) || []).length, 0);
});

test("aucune requête réseau supplémentaire n'est ajoutée", () => {
  assert.equal(sha256("worker.js"), "050ee82f2956c72d748948c08f291a857237f4466e07e79599f31af7750db716");
  assert.equal((read("app.js").match(/\bfetch\s*\(/g) || []).length, 1);
  assert.match(read("worker.js"), /const RADAR_DATA_URL = "https:\/\/timely-meringue-812f51\.netlify\.app\/data\/historique-central\.json";/);
});

test("aucun Cron n'est ajouté", () => {
  assert.equal(sha256("wrangler.jsonc"), "70fc7e2d94d37e1ab3abaeb3cb813781a4d5e4a3dd661e33dc60833448572f71");
  assert.doesNotMatch(read("wrangler.jsonc"), /cron|triggers|scheduled/i);
});

test("l'interface visuelle reste inchangée", () => {
  assert.equal(sha256("index.html"), "2f24cb4c9ef65b745768fb3881cac1a41b2de884f3dc3a3618f167b746b11ef1");
  assert.equal(sha256("styles.css"), "88ebc52113c085e77a6c35012382fd93f41b791a55d71a15f916dd24d7c4d9c7");
  assert.equal(sha256("shiny-hero.png"), "21ea9e48f35a8741858485cc811f459d3e9aa3783b01b179a9c986eedde5023d");
});
