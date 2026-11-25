/* Переключатель гаммы, темы, логотипа, названия и шрифта для черновиков витрины.
   Подключается на каждой странице: <script src="../palette.js"></script>
   Страница задаёт window.PALMAP: какие её CSS-переменные на какие роли гаммы ложатся (светлая тема).
   Для тёмной темы можно задать window.PALMAP_DARK; если его нет, светлые роли меняются на тёмные автоматически.
   Если страница задаёт window.FONT_VAR (например "--font-h"), в панели появляется выбор шрифта заголовков.
   Выбор запоминается в браузере; можно открыть сразу нужное: #classic,ii,dark,unb (гамма,логотип,тема,шрифт). */
(function(){
  var M = {
    classic:  {name:"Классика: бежевый и латунь",   l:["#f4efe6","#ebe3d6","#fbf8f2","#2b1d16","#5a463b","#8a7768","#d9cdbb"], a:["#a8824f","#8b6a3c","#ffffff"], d:["#231811","#2f2119","#3a2a21","#efe7da","#cdbfae","#a3917f","#5d4a3e"]},
    white:    {name:"Белый, чёрный и электрик",      l:["#ffffff","#f3f4f6","#ffffff","#0b0b0d","#3c3f46","#80848d","#e2e4e8"], a:["#1f4fff","#1538cc","#ffffff"], d:["#0b0b0d","#15161a","#1b1d22","#f4f4f6","#b9bcc4","#7d818a","#2c2f36"]},
    whitewarm:{name:"Белый и латунь",                l:["#ffffff","#f6f2ec","#ffffff","#1f1612","#54463d","#8a7a6d","#e4ddd3"], a:["#a8824f","#8b6a3c","#ffffff"], d:["#151010","#1f1816","#2a211d","#f1e9df","#cbbfb2","#9b8e82","#4a3c34"]},
    blue:     {name:"Синий на светлом",              l:["#eef3fb","#e1e9f6","#ffffff","#0b2a5b","#3a5380","#7a8cab","#ccd7ea"], a:["#1a56db","#1343b0","#ffffff"], d:["#081a3a","#0c2248","#112a55","#e9eef8","#b4c2dd","#7f91b4","#27406c"]},
    cobalt:   {name:"Белый и кобальт",               l:["#ffffff","#f1f4f9","#ffffff","#10233f","#3f516d","#7f8ca2","#dde3ec"], a:["#0047ab","#003a8c","#ffffff"], d:["#0a1a33","#10233f","#15294b","#edf1f8","#b6c2d6","#8290aa","#2b3f60"]},
    electric: {name:"Тёмно-синий и голубой электрик",l:["#f3f6ff","#e7ecfb","#ffffff","#0c1222","#3b4560","#7d869e","#d6dcef"], a:["#3b5bff","#2a46d6","#ffffff"], d:["#0a0e1f","#10162c","#161d36","#eef0fa","#b5bcd6","#7f88a8","#2a3357"]},
    green:    {name:"Бутылочно-зелёный и кремовый",  l:["#f5f2ea","#ebe7db","#fbfaf5","#1d3330","#475c58","#7e8f8b","#d5d3c4"], a:["#2e6b5e","#235247","#ffffff"], d:["#1d3330","#22403b","#28433f","#ecefe9","#b9c7c2","#8a9c97","#3b5a55"]},
    bordeaux: {name:"Бордо на кремовом",             l:["#f7f3ee","#efe8e0","#fcfaf7","#2a1f1e","#5b4a47","#8e7f7c","#ddd2ca"], a:["#7a1f2b","#611722","#ffffff"], d:["#2a1f1e","#332625","#3b2d2b","#f1e9e6","#c9bab5","#9c8b87","#564442"]},
    terra:    {name:"Тёплый серый и терракота",      l:["#f6f4f1","#ebe8e3","#fdfcfa","#26221f","#564f4a","#8c847d","#dcd7d0"], a:["#c25a2e","#a04824","#ffffff"], d:["#26221f","#2e2926","#36302c","#f1ede8","#c6bfb8","#9a918a","#524a45"]},
    graphite: {name:"Графит и красный",              l:["#ffffff","#f2f2f0","#fafaf8","#1c1c1c","#474747","#8a8a8a","#dcdcd8"], a:["#b5322a","#93251f","#ffffff"], d:["#1c1c1c","#242424","#2b2b2b","#f2f2f2","#bdbdbd","#8f8f8f","#444444"]},
    corp:     {name:"Светлый корпоративный синий",   l:["#f5f7fa","#e9edf3","#ffffff","#142540","#3e4e6a","#7a869c","#d5dce6"], a:["#1f4e8c","#173b6b","#ffffff"], d:["#142540","#1a2f52","#1e3252","#eef2f8","#b9c4d6","#8795ad","#34496e"]},
    navy:     {name:"Тёмно-синий и латунь",          l:["#f3f4f7","#e8eaef","#ffffff","#0f1f3a","#3b4a66","#7a849a","#d3d8e2"], a:["#b8914f","#9c7838","#ffffff"], d:["#0a1628","#0f1f3a","#15294b","#eceff5","#b8c2d6","#7f8ca8","#2a3c5e"]},
    darkblue: {name:"Графит и голубой",              l:["#f4f5f6","#e9ebed","#ffffff","#1f2225","#4a5057","#80878e","#d7dadd"], a:["#2f8bbf","#246f99","#ffffff"], d:["#15181b","#1a1e22","#272b2f","#e8e9eb","#b3b8be","#7c838a","#3a4046"]}
  };
  // роли: lbg lbg2 lpaper link link2 lmute lline | acc acc2 btnink | dbg dbg2 dpanel dink dink2 dmute dline
  var LR=["lbg","lbg2","lpaper","link","link2","lmute","lline"], AR=["acc","acc2","btnink"], DR=["dbg","dbg2","dpanel","dink","dink2","dmute","dline"];
  function roles(p){var r={};LR.forEach(function(k,i){r[k]=p.l[i]});AR.forEach(function(k,i){r[k]=p.a[i]});DR.forEach(function(k,i){r[k]=p.d[i]});return r}
  var SWAP={}; LR.forEach(function(k,i){SWAP[k]=DR[i];SWAP[DR[i]]=k});

  var L = {
    brick1: {name:"Кладка: в один цвет", svg:'<svg viewBox="0 0 68 48" fill="currentColor"><rect x="0" y="0" width="8" height="8"/><rect x="30" y="0" width="8" height="8"/><rect x="60" y="0" width="8" height="8"/><rect x="0" y="10" width="8" height="8"/><rect x="30" y="10" width="8" height="8"/><rect x="60" y="10" width="8" height="8"/><rect x="0" y="20" width="8" height="8"/><rect x="30" y="20" width="8" height="8"/><rect x="60" y="20" width="8" height="8"/><rect x="0" y="30" width="8" height="8"/><rect x="30" y="30" width="8" height="8"/><rect x="60" y="30" width="8" height="8"/><rect x="0" y="40" width="8" height="8"/><rect x="30" y="40" width="8" height="8"/><rect x="60" y="40" width="8" height="8"/><rect x="10" y="30" width="8" height="8"/><rect x="20" y="20" width="8" height="8"/><rect x="40" y="30" width="8" height="8"/><rect x="50" y="20" width="8" height="8"/></svg>'},
    brick:  {name:"Кладка: с акцентным модулем", svg:'<svg viewBox="0 0 68 48" fill="currentColor"><rect x="0" y="0" width="8" height="8"/><rect x="30" y="0" width="8" height="8"/><rect x="60" y="0" width="8" height="8"/><rect x="0" y="10" width="8" height="8"/><rect x="30" y="10" width="8" height="8"/><rect x="60" y="10" width="8" height="8"/><rect x="0" y="20" width="8" height="8"/><rect x="30" y="20" width="8" height="8" fill="var(--accent)"/><rect x="60" y="20" width="8" height="8"/><rect x="0" y="30" width="8" height="8"/><rect x="30" y="30" width="8" height="8"/><rect x="60" y="30" width="8" height="8"/><rect x="0" y="40" width="8" height="8"/><rect x="30" y="40" width="8" height="8"/><rect x="60" y="40" width="8" height="8"/><rect x="10" y="30" width="8" height="8"/><rect x="20" y="20" width="8" height="8"/><rect x="40" y="30" width="8" height="8"/><rect x="50" y="20" width="8" height="8"/></svg>'},
    brick3: {name:"Кладка: на плашке", svg:'<svg viewBox="0 0 92 72"><rect width="92" height="72" rx="12" fill="currentColor"/><g transform="translate(12 12)"><rect x="0" y="0" width="8" height="8" fill="var(--bg,#fff)"/><rect x="30" y="0" width="8" height="8" fill="var(--bg,#fff)"/><rect x="60" y="0" width="8" height="8" fill="var(--bg,#fff)"/><rect x="0" y="10" width="8" height="8" fill="var(--bg,#fff)"/><rect x="30" y="10" width="8" height="8" fill="var(--bg,#fff)"/><rect x="60" y="10" width="8" height="8" fill="var(--bg,#fff)"/><rect x="0" y="20" width="8" height="8" fill="var(--bg,#fff)"/><rect x="30" y="20" width="8" height="8" fill="var(--accent)"/><rect x="60" y="20" width="8" height="8" fill="var(--bg,#fff)"/><rect x="0" y="30" width="8" height="8" fill="var(--bg,#fff)"/><rect x="30" y="30" width="8" height="8" fill="var(--bg,#fff)"/><rect x="60" y="30" width="8" height="8" fill="var(--bg,#fff)"/><rect x="0" y="40" width="8" height="8" fill="var(--bg,#fff)"/><rect x="30" y="40" width="8" height="8" fill="var(--bg,#fff)"/><rect x="60" y="40" width="8" height="8" fill="var(--bg,#fff)"/><rect x="10" y="30" width="8" height="8" fill="var(--bg,#fff)"/><rect x="20" y="20" width="8" height="8" fill="var(--bg,#fff)"/><rect x="40" y="30" width="8" height="8" fill="var(--bg,#fff)"/><rect x="50" y="20" width="8" height="8" fill="var(--bg,#fff)"/></g></svg>'},
    truss2: {name:"Ферма без поясов: лигатура с узлом", svg:'<svg viewBox="0 0 48 44" fill="none" stroke="currentColor" stroke-linejoin="round"><path d="M6 4v36M24 4v36M42 4v36" stroke-width="5.5"/><path d="M6 40L24 4M24 40L42 4" stroke-width="5.5"/><circle cx="24" cy="22" r="5" fill="var(--accent)" stroke="none"/><circle cx="24" cy="22" r="7.5" stroke="var(--bg,#fff)" stroke-width="2.4"/></svg>'},
    truss:  {name:"Ферма: две И как конструкция", svg:'<svg viewBox="0 0 48 44" fill="none" stroke="currentColor" stroke-linejoin="round"><path d="M4 6h40M4 38h40" stroke-width="2.2"/><path d="M6 4v36M24 4v36M42 4v36" stroke-width="5.5"/><path d="M6 40L24 4M24 40L42 4" stroke-width="5.5"/><circle cx="24" cy="22" r="4.2" fill="var(--accent)" stroke="none"/></svg>'},
    hook:   {name:"Сцепление: две одинаковые скобы", svg:'<svg viewBox="0 0 40 40" fill="none" stroke-linecap="square"><path d="M8 8h18v16H8" stroke="currentColor" stroke-width="5.5"/><path d="M32 16H14v16h18" stroke="var(--accent)" stroke-width="5.5"/><path d="M9 24h10" stroke="var(--bg,#fff)" stroke-width="10"/><path d="M9 24h10" stroke="currentColor" stroke-width="5.5"/></svg>'},
    core:   {name:"Слои с ядром", svg:'<svg viewBox="0 0 40 40" fill="currentColor"><rect x="4" y="7" width="32" height="5"/><rect x="4" y="17.5" width="32" height="5"/><rect x="4" y="28" width="32" height="5"/><rect x="17.5" y="3" width="5" height="34"/><rect x="17.5" y="17.5" width="5" height="5" fill="var(--accent)"/></svg>'},
    ii:     {name:"ИИ: лигатура", svg:'<svg viewBox="0 0 40 40"><rect x="4" y="6" width="5" height="28" fill="currentColor"/><rect x="17.5" y="6" width="5" height="28" fill="currentColor"/><rect x="31" y="6" width="5" height="28" fill="currentColor"/><path d="M9 34v-8l8.5-20v8z" fill="currentColor"/><path d="M22.5 34v-8L31 6v8z" fill="var(--accent)"/></svg>'},
    iiblock:{name:"ИИ: плашка", svg:'<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="7" fill="currentColor"/><g fill="var(--bg,#fff)"><rect x="8" y="10" width="3.6" height="20"/><rect x="18.2" y="10" width="3.6" height="20"/><rect x="28.4" y="10" width="3.6" height="20"/><path d="M11.6 30v-6l6.6-14v6z"/><path d="M21.8 30v-6l6.6-14v6z"/></g><rect x="28.4" y="10" width="3.6" height="20" fill="var(--accent)"/></svg>'},
    pulse:  {name:"ИИ: импульс", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"><path d="M4 32L13 8l7 24"/><path d="M20 32l9-24 7 24" stroke="var(--accent)"/></svg>'},
    circuit:{name:"ИИ: контур", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><rect x="4" y="4" width="32" height="32" rx="4"/><path d="M13 29V15M27 29V15M13 29l14-14"/><circle cx="27" cy="15" r="3.5" fill="var(--accent)" stroke="none"/></svg>'},
    grid:   {name:"ИИ: решётка", svg:'<svg viewBox="0 0 40 40" fill="currentColor"><rect x="4" y="4" width="9" height="9"/><rect x="15.5" y="4" width="9" height="9"/><rect x="27" y="4" width="9" height="9"/><rect x="4" y="15.5" width="9" height="9"/><rect x="27" y="15.5" width="9" height="9"/><rect x="4" y="27" width="9" height="9"/><rect x="15.5" y="27" width="9" height="9"/><rect x="27" y="27" width="9" height="9"/><rect x="15.5" y="15.5" width="9" height="9" fill="var(--accent)"/></svg>'},
    box:    {name:"Квадрат с буквами", svg:null},
    layers: {name:"Слои", svg:'<svg viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="5" fill="currentColor"/><rect x="4" y="17.5" width="23" height="5" fill="currentColor"/><rect x="4" y="28" width="14" height="5" fill="var(--accent)"/></svg>'},
    nodes:  {name:"Узлы", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 8 L33 30 L7 30 Z"/><circle cx="20" cy="8" r="3.6" fill="var(--accent)" stroke="none"/><circle cx="33" cy="30" r="3.6" fill="currentColor" stroke="none"/><circle cx="7" cy="30" r="3.6" fill="currentColor" stroke="none"/></svg>'},
    bracket:{name:"Скобка", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M26 5H6v30h20"/><circle cx="26" cy="20" r="4" fill="var(--accent)" stroke="none"/></svg>'},
    text:   {name:"Только словесный знак", svg:''}
  };

  var N = {
    ii: {name:"ИИ Системы", abbr:"ИИ", sub:"разработка · обучение · продвижение", ooo:"ИИ Системы"}
  };

  var T = { light:{name:"Светлая"}, dark:{name:"Тёмная"}, auto:{name:"Как в системе"} };
  var P = { show:{name:"Показывать"}, hide:{name:"Скрыть"} };
  var G = { on:{name:"Есть"}, off:{name:"Нет"} };
  var A = { every:{name:"При каждой прокрутке, заголовки вспыхивают"}, once:{name:"Один раз, без вспышки"} };
  var F = {
    unb:   {name:"Unbounded (широкий, напористый)",  css:'"Unbounded","Inter",sans-serif',        gf:"Unbounded:wght@800"},
    russo: {name:"Russo One (плакатный)",           css:'"Russo One","Inter",sans-serif',        gf:"Russo+One"},
    mont:  {name:"Montserrat Black",                css:'"Montserrat","Inter",sans-serif',       gf:"Montserrat:wght@900"},
    rubik: {name:"Rubik Black (скруглённый)",       css:'"Rubik","Inter",sans-serif',            gf:"Rubik:wght@900"},
    exo:   {name:"Exo 2 (техно)",                   css:'"Exo 2","Inter",sans-serif',            gf:"Exo+2:wght@900"},
    osw:   {name:"Oswald (узкий, высокий)",          css:'"Oswald","Inter",sans-serif',           gf:"Oswald:wght@700"},
    rcond: {name:"Roboto Condensed (узкий)",        css:'"Roboto Condensed","Inter",sans-serif', gf:"Roboto+Condensed:wght@800"},
    man:   {name:"Manrope (геометрический)",         css:'"Manrope","Inter",sans-serif',          gf:"Manrope:wght@800"},
    jost:  {name:"Jost (геометрический, Futura)",   css:'"Jost","Inter",sans-serif',             gf:"Jost:wght@800"},
    onest: {name:"Onest (русский, нейтральный)",    css:'"Onest","Inter",sans-serif',            gf:"Onest:wght@900"},
    golos: {name:"Golos (русский, газетный)",       css:'"Golos Text","Inter",sans-serif',       gf:"Golos+Text:wght@900"},
    fira:  {name:"Fira Sans Black",                 css:'"Fira Sans","Inter",sans-serif',        gf:"Fira+Sans:wght@900"},
    tight: {name:"Inter Tight (плотный)",           css:'"Inter Tight","Inter",sans-serif',      gf:"Inter+Tight:wght@800"},
    inter: {name:"Inter (как текст)",               css:'"Inter",sans-serif',                    gf:"Inter:wght@800"}
  };
  var loadedF={};
  function loadFont(fk){ var f=F[fk]; if(!f||loadedF[fk]) return; loadedF[fk]=1; var l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family='+f.gf+'&display=swap'; document.head.appendChild(l); }

  window.SITE_LOGOS = L; window.SITE_PALETTES = M; window.SITE_NAMES = N; window.SITE_THEMES = T; window.SITE_FONTS = F; window.SITE_ANIMS = A; window.SITE_PEOPLE = P; window.SITE_GRID = G;
  var css = '.pal-btn{position:fixed;right:14px;bottom:14px;z-index:60;width:34px;height:34px;border-radius:50%;border:1px solid rgba(0,0,0,.25);background:rgba(255,255,255,.6);backdrop-filter:blur(6px);cursor:pointer;opacity:.35;transition:opacity .2s;display:grid;place-items:center;padding:0}'+
    '.pal-btn:hover,.pal-btn.open{opacity:1}.pal-btn i{width:14px;height:14px;border-radius:50%;background:linear-gradient(90deg,#222 50%,#a8824f 50%);display:block}'+
    '.pal{position:fixed;right:14px;bottom:56px;z-index:60;background:#1a1a1a;color:#eee;font:13px/1.3 -apple-system,Inter,Arial,sans-serif;padding:8px;border-radius:8px;display:none;gap:4px;box-shadow:0 8px 30px rgba(0,0,0,.35);min-width:270px;max-height:80vh;overflow:auto}'+
    '.pal.open{display:grid;grid-template-columns:auto auto auto;gap:2px 10px;align-items:start;min-width:0}.pal h6{grid-column:1/-1}.pal button{white-space:nowrap}@media(max-width:800px){.pal.open{grid-template-columns:1fr}}.pal h6{margin:6px 10px 2px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#888;font-weight:600}'+
    '.pal button{font:inherit;background:transparent;color:#eee;border:1px solid transparent;padding:6px 10px;border-radius:5px;cursor:pointer;display:flex;align-items:center;gap:8px;text-align:left}'+
    '.pal button:hover{background:#2a2a2a}.pal button.on{border-color:#666;background:#2a2a2a}.pal i{display:inline-block;width:12px;height:12px;border-radius:2px;border:1px solid rgba(255,255,255,.3);flex:none}'+
    '.pal .lg{width:18px;height:18px;flex:none;color:#eee}.pal .lg svg{width:100%;height:100%}'+
    '.mark.svg{border:0!important;background:transparent!important;width:auto!important;height:40px!important;color:inherit!important;display:block!important}.mark.svg svg{height:100%;width:auto;display:block}'+
    'html.logo-text header .mark{display:none!important}';

  function applyName(nk){
    var n = N[nk]||N.ii;
    document.querySelectorAll('header .logo > span:last-child').forEach(function(e){
      if(!e.dataset.orig) e.dataset.orig = e.innerHTML;
      var sm = e.querySelector('small');
      e.innerHTML = n.name + (sm ? '<small>'+n.sub+'</small>' : '');
    });
    document.querySelectorAll('footer').forEach(function(f){
      if(!f.dataset.orig) f.dataset.orig = f.innerHTML;
      f.innerHTML = f.dataset.orig.split('Система Информационных Сервисов').join(n.ooo).split('ИИ Системы').join(n.ooo);
    });
    document.querySelectorAll('.co-name').forEach(function(e){ e.textContent = n.ooo; });
    document.querySelectorAll('header .mark:not(.svg)').forEach(function(m){ if(m.dataset.orig!==undefined) m.textContent = n.abbr; else { m.dataset.orig = m.innerHTML; m.textContent = n.abbr; } });
    if(window.TITLE_TAIL!==undefined) document.title = n.name + window.TITLE_TAIL;
  }
  function isDark(tk){ return tk==='dark' || (tk==='auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); }
  function apply(pk, lk, nk, tk, fk, ak, ppk, gk, altk){
    var p = M[pk]||M.classic, r = roles(p), st = document.documentElement.style, dark = isDark(tk);
    var map = window.PALMAP||{};
    if(dark){
      if(window.PALMAP_DARK) map = window.PALMAP_DARK;
      else { var m2={}; for(var k in map) m2[k] = SWAP[map[k]]||map[k]; map = m2; }
    }
    for (var v in map) st.setProperty(v, r[map[v]]);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    st.setProperty('color-scheme', dark ? 'dark' : 'light');
    document.documentElement.dataset.anim = A[ak] ? ak : 'every';
    document.documentElement.dataset.people = P[ppk] ? ppk : 'show';
    document.documentElement.dataset.grid = G[gk] ? gk : 'on';
    document.documentElement.dataset.alt = G[altk] ? altk : 'on';
    if(window.FONT_VAR){ var f = F[fk]||F.unb; loadFont(F[fk]?fk:'unb'); st.setProperty(window.FONT_VAR, f.css); }
    var l = L[lk]||L.box;
    document.querySelectorAll('header .mark').forEach(function(m){
      if(!m.dataset.orig) m.dataset.orig = m.innerHTML;
      if(l.svg){ m.classList.add('svg'); m.innerHTML = l.svg; }
      else { m.classList.remove('svg'); m.innerHTML = m.dataset.orig; }
    });
    applyName(nk);
    document.documentElement.classList.toggle('logo-text', lk==='text');
    document.querySelectorAll('.pal button').forEach(function(b){
      if(b.dataset.p) b.classList.toggle('on', b.dataset.p===pk);
      if(b.dataset.l) b.classList.toggle('on', b.dataset.l===lk);
      if(b.dataset.n) b.classList.toggle('on', b.dataset.n===nk);
      if(b.dataset.t) b.classList.toggle('on', b.dataset.t===tk);
      if(b.dataset.f) b.classList.toggle('on', b.dataset.f===fk);
      if(b.dataset.a) b.classList.toggle('on', b.dataset.a===ak);
      if(b.dataset.pp) b.classList.toggle('on', b.dataset.pp===ppk);
      if(b.dataset.g) b.classList.toggle('on', b.dataset.g===gk);
      if(b.dataset.alt) b.classList.toggle('on', b.dataset.alt===altk);
    });
    try{localStorage.setItem('pal2',pk);localStorage.setItem('logo2',lk);localStorage.setItem('nm2',nk);localStorage.setItem('thm2',tk);localStorage.setItem('fnt2',fk);localStorage.setItem('anim2',ak);localStorage.setItem('ppl2',ppk);localStorage.setItem('grid2',gk);localStorage.setItem('alt2',altk)}catch(e){}
    return [pk,lk,nk,tk,fk,ak,ppk,gk,altk];
  }

  document.addEventListener('DOMContentLoaded', function(){
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
    var cur = {p:'classic', l:'ii', n:'ii', t:'light', f:'unb', a:'every', pp:'show', g:'on', alt:'on'};
    var h = location.hash.slice(1).split(','); if(M[h[0]]) cur.p=h[0]; if(h[1]&&L[h[1]]) cur.l=h[1]; if(h[2]&&T[h[2]]) cur.t=h[2]; if(h[3]&&F[h[3]]) cur.f=h[3];
    if(!M[h[0]]){ try{ var sp=localStorage.getItem('pal2'), sl=localStorage.getItem('logo2'), sn=localStorage.getItem('nm2'), stt=localStorage.getItem('thm2'), sf=localStorage.getItem('fnt2'), sa=localStorage.getItem('anim2'), spp=localStorage.getItem('ppl2'), sg=localStorage.getItem('grid2'), salt=localStorage.getItem('alt2'); if(M[sp])cur.p=sp; if(L[sl])cur.l=sl; if(T[stt])cur.t=stt; if(F[sf])cur.f=sf; if(A[sa])cur.a=sa; if(P[spp])cur.pp=spp; if(G[sg])cur.g=sg; if(G[salt])cur.alt=salt; }catch(e){} }
    var btn=document.createElement('button'); btn.className='pal-btn'; btn.title='Гамма, тема и логотип (клавиша G)'; btn.innerHTML='<i></i>';
    var bar=document.createElement('div'); bar.className='pal';
    function sec(t){ var hh=document.createElement('h6'); hh.textContent=t; bar.appendChild(hh); }
    function go(){ apply(cur.p,cur.l,cur.n,cur.t,cur.f,cur.a,cur.pp,cur.g,cur.alt); }
    sec('Тема');
    for(var kt in T){ var bt=document.createElement('button'); bt.dataset.t=kt; bt.textContent=T[kt].name; bt.onclick=(function(k){return function(){cur.t=k;go()}})(kt); bar.appendChild(bt); }
    sec('Гамма');
    for(var k in M){ var r=roles(M[k]); var b=document.createElement('button'); b.dataset.p=k; b.innerHTML='<i style="background:'+r.lbg+'"></i><i style="background:'+r.acc+'"></i><i style="background:'+r.dbg+'"></i>'+M[k].name; b.onclick=(function(k){return function(){cur.p=k;go()}})(k); bar.appendChild(b); }
    sec('Логотип');
    for(var k2 in L){ var b2=document.createElement('button'); b2.dataset.l=k2; b2.innerHTML='<span class="lg">'+(L[k2].svg||'')+'</span>'+L[k2].name; b2.onclick=(function(k){return function(){cur.l=k;go()}})(k2); bar.appendChild(b2); }
    if(window.FONT_VAR){
      sec('Шрифт заголовков');
      for(var kf in F){ var bf=document.createElement('button'); bf.dataset.f=kf; bf.textContent=F[kf].name; bf.onclick=(function(k){return function(){cur.f=k;go()}})(kf); bar.appendChild(bf); }
    }
    if(window.FONT_VAR){
      sec('Кладка на первом экране');
      for(var kg in G){ var bg=document.createElement('button'); bg.dataset.g=kg; bg.textContent=G[kg].name; bg.onclick=(function(k){return function(){cur.g=k;go()}})(kg); bar.appendChild(bg); }
      sec('Чередование фона разделов');
      for(var kal in G){ var bal=document.createElement('button'); bal.dataset.alt=kal; bal.textContent=G[kal].name; bal.onclick=(function(k){return function(){cur.alt=k;go()}})(kal); bar.appendChild(bal); }
      sec('Блок руководителей');
      for(var kp in P){ var bp=document.createElement('button'); bp.dataset.pp=kp; bp.textContent=P[kp].name; bp.onclick=(function(k){return function(){cur.pp=k;go()}})(kp); bar.appendChild(bp); }
      sec('Появление блоков');
      for(var ka in A){ var ba=document.createElement('button'); ba.dataset.a=ka; ba.textContent=A[ka].name; ba.onclick=(function(k){return function(){cur.a=k;go()}})(ka); bar.appendChild(ba); }
    }
    function toggle(on){ if(on===undefined) on=!bar.classList.contains('open'); bar.classList.toggle('open',on); btn.classList.toggle('open',on); }
    btn.onclick=function(){toggle()};
    document.addEventListener('keydown',function(e){ if((e.key==='g'||e.key==='п')&&!/input|textarea/i.test(e.target.tagName)) toggle(); });
    document.addEventListener('click',function(e){ if(!bar.contains(e.target)&&!btn.contains(e.target)) toggle(false); });
    if(window.matchMedia){ try{ matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){ if(cur.t==='auto') go(); }); }catch(e){} }
    document.body.appendChild(bar); document.body.appendChild(btn);
    go();
  });
})();
