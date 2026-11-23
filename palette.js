/* Переключатель гаммы и логотипа для черновиков витрины.
   Подключается на каждой странице: <script src="../palette.js"></script>
   Страница задаёт window.PALMAP: какие её CSS-переменные на какие роли гаммы ложатся.
   Выбор запоминается в браузере; можно открыть сразу нужное: #green или #green,layers */
(function(){
  var M = {
    classic:  {name:"Классика: бежевый и латунь",   l:["#f4efe6","#ebe3d6","#fbf8f2","#2b1d16","#5a463b","#8a7768","#d9cdbb"], a:["#a8824f","#8b6a3c","#ffffff"], d:["#231811","#2f2119","#3a2a21","#efe7da","#cdbfae","#a3917f","#5d4a3e"]},
    green:    {name:"Бутылочно-зелёный и кремовый",  l:["#f5f2ea","#ebe7db","#fbfaf5","#1d3330","#475c58","#7e8f8b","#d5d3c4"], a:["#2e6b5e","#235247","#ffffff"], d:["#1d3330","#22403b","#28433f","#ecefe9","#b9c7c2","#8a9c97","#3b5a55"]},
    bordeaux: {name:"Бордо на кремовом",             l:["#f7f3ee","#efe8e0","#fcfaf7","#2a1f1e","#5b4a47","#8e7f7c","#ddd2ca"], a:["#7a1f2b","#611722","#ffffff"], d:["#2a1f1e","#332625","#3b2d2b","#f1e9e6","#c9bab5","#9c8b87","#564442"]},
    terra:    {name:"Тёплый серый и терракота",      l:["#f6f4f1","#ebe8e3","#fdfcfa","#26221f","#564f4a","#8c847d","#dcd7d0"], a:["#c25a2e","#a04824","#ffffff"], d:["#26221f","#2e2926","#36302c","#f1ede8","#c6bfb8","#9a918a","#524a45"]},
    graphite: {name:"Графит и красный",              l:["#ffffff","#f2f2f0","#fafaf8","#1c1c1c","#474747","#8a8a8a","#dcdcd8"], a:["#b5322a","#93251f","#ffffff"], d:["#1c1c1c","#242424","#2b2b2b","#f2f2f2","#bdbdbd","#8f8f8f","#444444"]},
    corp:     {name:"Светлый корпоративный синий",   l:["#f5f7fa","#e9edf3","#ffffff","#142540","#3e4e6a","#7a869c","#d5dce6"], a:["#1f4e8c","#173b6b","#ffffff"], d:["#142540","#1a2f52","#1e3252","#eef2f8","#b9c4d6","#8795ad","#34496e"]},
    navy:     {name:"Тёмно-синий и латунь",          l:["#0f1f3a","#15294b","#15294b","#eceff5","#b8c2d6","#7f8ca8","#2a3c5e"], a:["#c9a365","#dcb97a","#0f1f3a"], d:["#0a1628","#0f1f3a","#15294b","#eceff5","#b8c2d6","#7f8ca8","#2a3c5e"]},
    darkblue: {name:"Тёмный графит и голубой",       l:["#1f2225","#272b2f","#272b2f","#e8e9eb","#b3b8be","#7c838a","#3a4046"], a:["#4fa3d1","#6fb6dc","#101316"], d:["#15181b","#1a1e22","#272b2f","#e8e9eb","#b3b8be","#7c838a","#3a4046"]}
  };
  // роли: lbg lbg2 lpaper link link2 lmute lline | acc acc2 btnink | dbg dbg2 dpanel dink dink2 dmute dline
  function roles(p){var r={};["lbg","lbg2","lpaper","link","link2","lmute","lline"].forEach(function(k,i){r[k]=p.l[i]});
    ["acc","acc2","btnink"].forEach(function(k,i){r[k]=p.a[i]});["dbg","dbg2","dpanel","dink","dink2","dmute","dline"].forEach(function(k,i){r[k]=p.d[i]});return r}

  var L = {
    box:    {name:"Квадрат с буквами (как было)", svg:null},
    layers: {name:"Слои", svg:'<svg viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="5" fill="currentColor"/><rect x="4" y="17.5" width="23" height="5" fill="currentColor"/><rect x="4" y="28" width="14" height="5" fill="var(--accent)"/></svg>'},
    nodes:  {name:"Узлы", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 8 L33 30 L7 30 Z"/><circle cx="20" cy="8" r="3.6" fill="var(--accent)" stroke="none"/><circle cx="33" cy="30" r="3.6" fill="currentColor" stroke="none"/><circle cx="7" cy="30" r="3.6" fill="currentColor" stroke="none"/></svg>'},
    bracket:{name:"Скобка", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M26 5H6v30h20"/><circle cx="26" cy="20" r="4" fill="var(--accent)" stroke="none"/></svg>'},
    mono:   {name:"Монограмма С", svg:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M31 10.5A14 14 0 1 0 31 29.5"/><rect x="18" y="14" width="4" height="12" fill="var(--accent)" stroke="none"/></svg>'},
    diag:   {name:"Диагональ", svg:'<svg viewBox="0 0 40 40"><path d="M5 35V5h30Z" fill="currentColor"/><path d="M35 5v30H5Z" fill="none" stroke="var(--accent)" stroke-width="2.5"/></svg>'},
    text:   {name:"Только словесный знак", svg:''}
  };

  window.SITE_LOGOS = L; window.SITE_PALETTES = M;
  var css = '.pal-btn{position:fixed;right:14px;bottom:14px;z-index:60;width:34px;height:34px;border-radius:50%;border:1px solid rgba(0,0,0,.25);background:rgba(255,255,255,.6);backdrop-filter:blur(6px);cursor:pointer;opacity:.35;transition:opacity .2s;display:grid;place-items:center;padding:0}'+
    '.pal-btn:hover,.pal-btn.open{opacity:1}.pal-btn i{width:14px;height:14px;border-radius:50%;background:linear-gradient(90deg,#222 50%,#a8824f 50%);display:block}'+
    '.pal{position:fixed;right:14px;bottom:56px;z-index:60;background:#1a1a1a;color:#eee;font:13px/1.3 -apple-system,Inter,Arial,sans-serif;padding:8px;border-radius:8px;display:none;gap:4px;box-shadow:0 8px 30px rgba(0,0,0,.35);min-width:270px;max-height:80vh;overflow:auto}'+
    '.pal.open{display:flex;flex-direction:column}.pal h6{margin:6px 10px 2px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#888;font-weight:600}'+
    '.pal button{font:inherit;background:transparent;color:#eee;border:1px solid transparent;padding:6px 10px;border-radius:5px;cursor:pointer;display:flex;align-items:center;gap:8px;text-align:left}'+
    '.pal button:hover{background:#2a2a2a}.pal button.on{border-color:#666;background:#2a2a2a}.pal i{display:inline-block;width:12px;height:12px;border-radius:2px;border:1px solid rgba(255,255,255,.3);flex:none}'+
    '.pal .lg{width:18px;height:18px;flex:none;color:#eee}.pal .lg svg{width:100%;height:100%}'+
    '.mark.svg{border:0!important;background:transparent!important;width:auto!important;height:40px!important;color:inherit!important;display:block!important}.mark.svg svg{height:100%;width:auto;display:block}'+
    'html.logo-text header .mark{display:none!important}';

  function apply(pk, lk){
    var p = M[pk]||M.classic, r = roles(p), st = document.documentElement.style, map = window.PALMAP||{};
    for (var v in map) st.setProperty(v, r[map[v]]);
    var l = L[lk]||L.box;
    document.querySelectorAll('header .mark').forEach(function(m){
      if(!m.dataset.orig) m.dataset.orig = m.innerHTML;
      if(l.svg){ m.classList.add('svg'); m.innerHTML = l.svg; }
      else { m.classList.remove('svg'); m.innerHTML = m.dataset.orig; }
    });
    document.documentElement.classList.toggle('logo-text', lk==='text');
    document.querySelectorAll('.pal button').forEach(function(b){
      if(b.dataset.p) b.classList.toggle('on', b.dataset.p===pk);
      if(b.dataset.l) b.classList.toggle('on', b.dataset.l===lk);
    });
    try{localStorage.setItem('pal',pk);localStorage.setItem('logo',lk)}catch(e){}
    return [pk,lk];
  }

  document.addEventListener('DOMContentLoaded', function(){
    var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);
    var cur = {p:'classic', l:'layers'};
    var h = location.hash.slice(1).split(','); if(M[h[0]]) cur.p=h[0]; if(h[1]&&L[h[1]]) cur.l=h[1];
    if(!location.hash){ try{ var sp=localStorage.getItem('pal'), sl=localStorage.getItem('logo'); if(M[sp])cur.p=sp; if(L[sl])cur.l=sl; }catch(e){} }
    var btn=document.createElement('button'); btn.className='pal-btn'; btn.title='Гамма и логотип (клавиша G)'; btn.innerHTML='<i></i>';
    var bar=document.createElement('div'); bar.className='pal';
    var hp=document.createElement('h6'); hp.textContent='Гамма'; bar.appendChild(hp);
    for(var k in M){ var r=roles(M[k]); var b=document.createElement('button'); b.dataset.p=k; b.innerHTML='<i style="background:'+r.lbg+'"></i><i style="background:'+r.acc+'"></i>'+M[k].name; b.onclick=(function(k){return function(){cur.p=k;apply(cur.p,cur.l)}})(k); bar.appendChild(b); }
    var hl=document.createElement('h6'); hl.textContent='Логотип'; bar.appendChild(hl);
    for(var k2 in L){ var b2=document.createElement('button'); b2.dataset.l=k2; b2.innerHTML='<span class="lg">'+(L[k2].svg||'')+'</span>'+L[k2].name; b2.onclick=(function(k){return function(){cur.l=k;apply(cur.p,cur.l)}})(k2); bar.appendChild(b2); }
    function toggle(on){ if(on===undefined) on=!bar.classList.contains('open'); bar.classList.toggle('open',on); btn.classList.toggle('open',on); }
    btn.onclick=function(){toggle()};
    document.addEventListener('keydown',function(e){ if((e.key==='g'||e.key==='п')&&!/input|textarea/i.test(e.target.tagName)) toggle(); });
    document.addEventListener('click',function(e){ if(!bar.contains(e.target)&&!btn.contains(e.target)) toggle(false); });
    document.body.appendChild(bar); document.body.appendChild(btn);
    apply(cur.p,cur.l);
  });
})();
