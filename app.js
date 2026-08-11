"use strict";

const I18N={
fr:{today:"AUJOURD’HUI",group:"Groupe",servers:"serveurs",loading:"Chargement…",confirmed:"Confirmé par le Bot",forecast:"Prévision à vérifier par capture",botConfirmed:"Dernière confirmation Bot",refresh:"Actualiser",searchTitle:"Rechercher un serveur",search:"Rechercher",localRule:"Géré séparément : Shiny mardi et samedi.",howTitle:"Comment la mise à jour fonctionne",howText:"La page récupère la source de données du Radar Shiny existant. Si aucune confirmation n’est disponible pour aujourd’hui, elle affiche automatiquement le groupe prévu selon le cycle A → C → B.",syncLive:"Source Radar Shiny synchronisée",syncFallback:"Mode secours : données locales utilisées",notFound:"Serveur non présent dans les groupes Shiny suivis.",serverGroup:"Le serveur {s} appartient au groupe {g}.",todayYes:"Il est dans la liste d’aujourd’hui.",todayNo:"Il n’est pas dans la liste d’aujourd’hui.",last:"Dernière confirmation : {d} · Groupe {g} · {n} serveurs"},
de:{today:"HEUTE",group:"Gruppe",servers:"Server",loading:"Laden…",confirmed:"Vom Bot bestätigt",forecast:"Vorhersage per Screenshot zu prüfen",botConfirmed:"Letzte Bot-Bestätigung",refresh:"Aktualisieren",searchTitle:"Server suchen",search:"Suchen",localRule:"Separat verwaltet: Shiny Dienstag und Samstag.",howTitle:"So funktioniert die Aktualisierung",howText:"Die Seite liest die Datenquelle des bestehenden Shiny Radars. Fehlt für heute eine Bestätigung, wird automatisch die erwartete Gruppe nach dem Zyklus A → C → B angezeigt.",syncLive:"Shiny-Radar-Quelle synchronisiert",syncFallback:"Notfallmodus: lokale Daten verwendet",notFound:"Server ist in den verfolgten Shiny-Gruppen nicht vorhanden.",serverGroup:"Server {s} gehört zur Gruppe {g}.",todayYes:"Er steht auf der heutigen Liste.",todayNo:"Er steht heute nicht auf der Liste.",last:"Letzte Bestätigung: {d} · Gruppe {g} · {n} Server"},
en:{today:"TODAY",group:"Group",servers:"servers",loading:"Loading…",confirmed:"Confirmed by Bot",forecast:"Forecast — verify by screenshot",botConfirmed:"Latest Bot confirmation",refresh:"Refresh",searchTitle:"Search a server",search:"Search",localRule:"Handled separately: Shiny Tuesday and Saturday.",howTitle:"How updates work",howText:"This page reads the existing Shiny Radar data source. If there is no confirmation for today, it automatically shows the expected group using the A → C → B cycle.",syncLive:"Shiny Radar source synchronized",syncFallback:"Fallback mode: local data in use",notFound:"Server is not present in the tracked Shiny groups.",serverGroup:"Server {s} belongs to group {g}.",todayYes:"It is on today’s list.",todayNo:"It is not on today’s list.",last:"Latest confirmation: {d} · Group {g} · {n} servers"},
ro:{today:"ASTĂZI",group:"Grupa",servers:"servere",loading:"Se încarcă…",confirmed:"Confirmat de Bot",forecast:"Previziune de verificat prin captură",botConfirmed:"Ultima confirmare Bot",refresh:"Actualizează",searchTitle:"Caută un server",search:"Caută",localRule:"Gestionat separat: Shiny marți și sâmbătă.",howTitle:"Cum funcționează actualizarea",howText:"Pagina citește sursa de date a Radarului Shiny existent. Dacă azi nu există confirmare, afișează automat grupa probabilă după ciclul A → C → B.",syncLive:"Sursa Radar Shiny sincronizată",syncFallback:"Mod de rezervă: date locale",notFound:"Serverul nu apare în grupele Shiny urmărite.",serverGroup:"Serverul {s} aparține grupei {g}.",todayYes:"Este în lista de azi.",todayNo:"Nu este în lista de azi.",last:"Ultima confirmare: {d} · Grupa {g} · {n} servere"},
uk:{today:"СЬОГОДНІ",group:"Група",servers:"серверів",loading:"Завантаження…",confirmed:"Підтверджено Bot",forecast:"Прогноз — перевірити скриншотом",botConfirmed:"Останнє підтвердження Bot",refresh:"Оновити",searchTitle:"Пошук сервера",search:"Шукати",localRule:"Окремо: Shiny у вівторок і суботу.",howTitle:"Як працює оновлення",howText:"Сторінка читає джерело даних існуючого Shiny Radar. Якщо на сьогодні немає підтвердження, автоматично показується очікувана група за циклом A → C → B.",syncLive:"Джерело Shiny Radar синхронізовано",syncFallback:"Резервний режим: локальні дані",notFound:"Сервера немає у відстежуваних Shiny-групах.",serverGroup:"Сервер {s} належить до групи {g}.",todayYes:"Він є у сьогоднішньому списку.",todayNo:"Його немає у сьогоднішньому списку.",last:"Останнє підтвердження: {d} · Група {g} · {n} серверів"},
ko:{today:"오늘",group:"그룹",servers:"서버",loading:"불러오는 중…",confirmed:"Bot 확인",forecast:"예상 — 캡처 확인 필요",botConfirmed:"최근 Bot 확인",refresh:"새로고침",searchTitle:"서버 검색",search:"검색",localRule:"별도 관리: 화요일 / 토요일 Shiny.",howTitle:"업데이트 방식",howText:"이 페이지는 기존 Shiny Radar 데이터 소스를 읽습니다. 오늘 확인 데이터가 없으면 A → C → B 주기에 따라 예상 그룹을 자동 표시합니다.",syncLive:"Shiny Radar 소스 동기화됨",syncFallback:"백업 모드: 로컬 데이터 사용",notFound:"추적 중인 Shiny 그룹에 없는 서버입니다.",serverGroup:"서버 {s}는 그룹 {g}에 속합니다.",todayYes:"오늘 목록에 있습니다.",todayNo:"오늘 목록에 없습니다.",last:"최근 확인: {d} · 그룹 {g} · 서버 {n}개"},
hr:{today:"DANAS",group:"Grupa",servers:"servera",loading:"Učitavanje…",confirmed:"Bot potvrđeno",forecast:"Predviđanje — provjeriti snimkom",botConfirmed:"Zadnja Bot potvrda",refresh:"Osvježi",searchTitle:"Pronađi server",search:"Traži",localRule:"Odvojeno: Shiny utorkom i subotom.",howTitle:"Kako radi ažuriranje",howText:"Stranica čita izvor podataka postojećeg Shiny Radara. Ako danas nema potvrde, automatski prikazuje očekivanu grupu po ciklusu A → C → B.",syncLive:"Izvor Shiny Radara sinkroniziran",syncFallback:"Rezervni način: lokalni podaci",notFound:"Server nije u praćenim Shiny grupama.",serverGroup:"Server {s} pripada grupi {g}.",todayYes:"Nalazi se na današnjem popisu.",todayNo:"Nije na današnjem popisu.",last:"Zadnja potvrda: {d} · Grupa {g} · {n} servera"},
pt:{today:"HOJE",group:"Grupo",servers:"servidores",loading:"A carregar…",confirmed:"Confirmado pelo Bot",forecast:"Previsão — confirmar por captura",botConfirmed:"Última confirmação Bot",refresh:"Atualizar",searchTitle:"Procurar um servidor",search:"Procurar",localRule:"Gerido separadamente: Shiny terça e sábado.",howTitle:"Como funciona a atualização",howText:"A página lê a fonte de dados do Shiny Radar existente. Se não houver confirmação para hoje, mostra automaticamente o grupo previsto segundo o ciclo A → C → B.",syncLive:"Fonte Shiny Radar sincronizada",syncFallback:"Modo de segurança: dados locais",notFound:"Servidor não presente nos grupos Shiny acompanhados.",serverGroup:"O servidor {s} pertence ao grupo {g}.",todayYes:"Está na lista de hoje.",todayNo:"Não está na lista de hoje.",last:"Última confirmação: {d} · Grupo {g} · {n} servidores"}
};

const Core=window.ShinyRadarCore;
if(!Core)throw new Error("Moteur Shiny Radar indisponible");

const SUPPORTED_LANGS=Object.keys(I18N);
const requestedLang=new URLSearchParams(location.search).get("lang");
let lang=SUPPORTED_LANGS.includes(requestedLang)?requestedLang:localStorage.getItem("gomo-shiny-central-lang")||"fr";
if(!SUPPORTED_LANGS.includes(lang))lang="fr";

const AUTONOMOUS_TEXT={
  fr:"Mode autonome · archive confirmée de 21 jours",
  de:"Autonomer Modus · bestätigtes 21-Tage-Archiv",
  en:"Autonomous mode · verified 21-day archive",
  ro:"Mod autonom · arhivă confirmată de 21 de zile",
  uk:"Автономний режим · підтверджений архів за 21 день",
  ko:"자동 모드 · 확인된 21일 기록",
  hr:"Samostalni način · potvrđena arhiva od 21 dana",
  pt:"Modo autónomo · arquivo confirmado de 21 dias"
};

let model=null;
let todayModel=null;
let syncMode="autonomous";
let lastSyncAt=null;
let loadingPromise=null;
const $=selector=>document.querySelector(selector);
const tr=(key,vars={})=>{let value=(I18N[lang]||I18N.fr)[key]||I18N.fr[key]||key;for(const [name,replacement] of Object.entries(vars))value=value.replaceAll(`{${name}}`,replacement);return value};
const locale=()=>lang==="fr"?"fr-BE":lang;
const fmtDate=date=>new Intl.DateTimeFormat(locale(),{day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC"}).format(new Date(`${date}T12:00:00Z`));

function renderSync(){
  if(!lastSyncAt)return;
  const label=syncMode==="live"?tr("syncLive"):(AUTONOMOUS_TEXT[lang]||AUTONOMOUS_TEXT.fr);
  $("#syncLine").textContent=`${label} · ${lastSyncAt.toLocaleString(locale())}`;
}

function applyI18n(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(element=>{element.textContent=tr(element.dataset.i18n)});
  $("#language").value=lang;
  if(todayModel)render();
  renderSync();
}

function renderServers(list){
  const pills=list.map(server=>{
    const pill=document.createElement("div");
    pill.className="server-pill";
    pill.textContent=String(server);
    return pill;
  });
  $("#todayServers").replaceChildren(...pills);
}

function render(){
  const today=Core.dateInTimeZone(new Date(),model.timeZone||Core.TIME_ZONE);
  todayModel=Core.getDay(model,today);
  $("#todayGroup").textContent=todayModel.group||"—";
  $("#confidence").textContent=String(todayModel.confidence);
  $("#todayCount").textContent=String(todayModel.servers.length);
  $("#todayStatus").textContent=todayModel.confirmed?tr("confirmed"):tr("forecast");
  $(".today-card").classList.toggle("confirmed",todayModel.confirmed);
  renderServers(todayModel.servers);

  const last=Core.latestConfirmed(model);
  $("#lastConfirmed").textContent=last?tr("last",{d:fmtDate(last.date),g:last.group,n:last.servers.length}):"—";
  searchServer();
}

async function fetchJson(url){
  const response=await fetch(url,{cache:"no-store"});
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  return {data:await response.json(),source:response.headers.get("x-gomo-source")||""};
}

async function loadData(){
  if(loadingPromise)return loadingPromise;
  $("#todayStatus").textContent=tr("loading");

  loadingPromise=(async()=>{
    try{
      const baseline=await fetchJson(`/fallback.json?t=${Date.now()}`);
      model=Core.normalizeBaseline(baseline.data);
      syncMode="autonomous";

      try{
        const remote=await fetchJson(`/api/shiny-data?t=${Date.now()}`);
        if(remote.source!=="fallback"&&remote.source!=="verified-baseline"){
          const merged=Core.mergeConfirmedRemote(model,remote.data);
          model=merged.model;
          syncMode="live";
        }
      }catch(error){
        console.info("Source Radar distante indisponible, archive confirmée utilisée.",error);
      }

      lastSyncAt=new Date();
      renderSync();
      render();
    }catch(error){
      console.error("Impossible de charger les données Shiny Radar.",error);
      $("#todayStatus").textContent=tr("syncFallback");
    }
  })().finally(()=>{loadingPromise=null});

  return loadingPromise;
}

function findGroup(server){
  return Core.GROUPS.find(group=>(model?.groups?.[group]||[]).includes(server))||null;
}

function searchServer(){
  if(!model||!todayModel)return;
  const server=Number($("#serverSearch").value);
  if(!server){$("#searchResult").textContent="";return;}
  if(server===Core.HOME_SERVER){$("#searchResult").textContent=tr("localRule");return;}
  const group=findGroup(server);
  if(!group){$("#searchResult").textContent=tr("notFound");return;}
  const today=todayModel.servers.includes(server);
  $("#searchResult").textContent=`${tr("serverGroup",{s:server,g:group})} ${tr(today?"todayYes":"todayNo")}`;
}

$("#language").addEventListener("change",event=>{
  lang=event.target.value;
  localStorage.setItem("gomo-shiny-central-lang",lang);
  applyI18n();
});
$("#refreshBtn").addEventListener("click",()=>{void loadData()});
$("#searchBtn").addEventListener("click",searchServer);
$("#serverSearch").addEventListener("input",searchServer);

setInterval(()=>{
  if(!model||!todayModel)return;
  const today=Core.dateInTimeZone(new Date(),model.timeZone||Core.TIME_ZONE);
  if(today!==todayModel.date)render();
},60000);
setInterval(()=>{void loadData()},1800000);

applyI18n();
void loadData();
