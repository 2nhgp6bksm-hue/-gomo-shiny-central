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

let lang=localStorage.getItem("gomo-shiny-central-lang")||"fr";
let model=null;
let todayModel=null;
const $=s=>document.querySelector(s);
const tr=(k,vars={})=>{let v=(I18N[lang]||I18N.fr)[k]||I18N.fr[k]||k;for(const [a,b] of Object.entries(vars))v=v.replaceAll(`{${a}}`,b);return v};
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const parseDate=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d,12,0,0)};
const fmtDate=s=>new Intl.DateTimeFormat(lang==="fr"?"fr-BE":lang,{day:"2-digit",month:"2-digit",year:"numeric"}).format(parseDate(s));
const uniq=a=>[...new Set((a||[]).map(Number).filter(Number.isFinite))].sort((a,b)=>a-b);

function normalize(data){
  const history=(Array.isArray(data?.history)?data.history:Array.isArray(data?.days)?data.days:[]).filter(x=>x?.date).map(x=>({...x,group:String(x.group||"").toUpperCase(),servers:uniq(x.servers),status:String(x.status||"").toLowerCase()}));
  const groups={A:uniq(data?.groups?.A),B:uniq(data?.groups?.B),C:uniq(data?.groups?.C)};
  for(const g of ["A","B","C"]){if(!groups[g].length){const latest=[...history].reverse().find(x=>x.group===g&&x.servers.length);if(latest)groups[g]=latest.servers;}}
  return {history,groups,updated_at:data?.updated_at||data?.updatedAt||"",central_version:data?.central_version||data?.version||""};
}

function confirmedDays(){return model.history.filter(d=>d.status.includes("confirm")||d.status==="confirmed").sort((a,b)=>a.date.localeCompare(b.date));}
function latestConfirmed(){return confirmedDays().at(-1)||null;}
function dayDiff(a,b){return Math.round((parseDate(b)-parseDate(a))/86400000);}
function predictGroup(dateStr){
  const latest=latestConfirmed();
  if(!latest)return {group:"A",confidence:0};
  const cycle=["A","C","B"];
  let idx=cycle.indexOf(latest.group);if(idx<0)idx=0;
  const diff=dayDiff(latest.date,dateStr);
  const group=cycle[(idx+((diff%3)+3)%3)%3];
  const days=confirmedDays();let matches=0,total=0;
  for(let i=1;i<days.length;i++){const prev=days[i-1],cur=days[i],d=dayDiff(prev.date,cur.date);if(d===1&&cycle.includes(prev.group)&&cycle.includes(cur.group)){total++;const p=cycle[(cycle.indexOf(prev.group)+1)%3];if(p===cur.group)matches++;}}
  return {group,confidence:total?Math.round(matches/total*100):100};
}
function getToday(){
  const date=iso(new Date());
  const exact=model.history.find(d=>d.date===date&&(d.status.includes("confirm")||d.status==="confirmed"));
  if(exact)return {date,group:exact.group,servers:exact.servers,confirmed:true,confidence:100};
  const p=predictGroup(date);return {date,group:p.group,servers:model.groups[p.group]||[],confirmed:false,confidence:p.confidence};
}

function applyI18n(){document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=tr(el.dataset.i18n)});$("#language").value=lang;if(todayModel)render();}
function renderServers(list){$("#todayServers").innerHTML=list.map(n=>`<div class="server-pill">${n}</div>`).join("");}
function render(){
  todayModel=getToday();
  $("#todayGroup").textContent=todayModel.group||"—";$("#confidence").textContent=todayModel.confidence;$("#todayCount").textContent=todayModel.servers.length;
  $("#todayStatus").textContent=todayModel.confirmed?tr("confirmed"):tr("forecast");
  $(".today-card").classList.toggle("confirmed",todayModel.confirmed);renderServers(todayModel.servers);
  const last=latestConfirmed();$("#lastConfirmed").textContent=last?tr("last",{d:fmtDate(last.date),g:last.group,n:last.servers.length}):"—";
  searchServer();
}
async function loadData(){
  $("#todayStatus").textContent=tr("loading");
  let live=false,data;
  try{const r=await fetch(`/api/shiny-data?t=${Date.now()}`,{cache:"no-store"});if(!r.ok)throw new Error(r.status);data=await r.json();live=true;}catch(e){const r=await fetch(`/fallback.json?t=${Date.now()}`,{cache:"no-store"});data=await r.json();}
  model=normalize(data);$("#syncLine").textContent=`${live?tr("syncLive"):tr("syncFallback")} · ${new Date().toLocaleString(lang==="fr"?"fr-BE":lang)}`;render();
}
function findGroup(server){for(const g of ["A","B","C"])if((model?.groups?.[g]||[]).includes(server))return g;return null;}
function searchServer(){
  if(!model||!todayModel)return;const n=Number($("#serverSearch").value);if(!n){$("#searchResult").textContent="";return;}const g=findGroup(n);if(!g){$("#searchResult").textContent=tr("notFound");return;}const yes=todayModel.servers.includes(n);$("#searchResult").innerHTML=`<strong>${tr("serverGroup",{s:n,g})}</strong> ${tr(yes?"todayYes":"todayNo")}`;
}
$("#language").addEventListener("change",e=>{lang=e.target.value;localStorage.setItem("gomo-shiny-central-lang",lang);applyI18n()});
$("#refreshBtn").addEventListener("click",loadData);$("#searchBtn").addEventListener("click",searchServer);$("#serverSearch").addEventListener("input",searchServer);
applyI18n();loadData();
