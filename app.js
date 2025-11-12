
const A=document.getElementById('aurora'),S=document.getElementById('stars'),T=document.getElementById('trail');
if(A&&S&&T){
  const ac=A.getContext('2d'),sc=S.getContext('2d'),tc=T.getContext('2d');let W,H;
  function size(){W=A.width=S.width=T.width=innerWidth;H=A.height=S.height=T.height=innerHeight} size(); addEventListener('resize',size);
  function isDark(){return document.body.classList.contains('dark');}
  const blobs=[...Array(6)].map(()=>({x:Math.random()*W,y:Math.random()*H,r:220+Math.random()*280,dx:(Math.random()-.5)*.25,dy:(Math.random()-.5)*.25,h:160+Math.random()*140}));
  (function aur(){ac.clearRect(0,0,W,H);blobs.forEach(b=>{const base=isDark()?210:160;
    const c1=`hsla(${(base+(b.h%60))%360},92%,${isDark()?52:64}%,${isDark()?.28:.22})`;
    const c2=`hsla(${(base+50+(b.h%60))%360},92%,${isDark()?46:58}%,${isDark()?.22:.16})`;
    const g=ac.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);g.addColorStop(0,c1);g.addColorStop(1,c2);
    ac.fillStyle=g;ac.beginPath();ac.arc(b.x,b.y,b.r,0,Math.PI*2);ac.fill();b.x+=b.dx;b.y+=b.dy;b.h+=.12;
    if(b.x<-120||b.x>W+120)b.dx*=-1;if(b.y<-120||b.y>H+120)b.dy*=-1;});requestAnimationFrame(aur);})();
  const stars=[...Array(180)].map(()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,a:Math.random()*1,s:.2+Math.random()*0.8}));
  (function draw(){sc.clearRect(0,0,W,H);stars.forEach(s=>{s.a+=0.02*s.s;const o=.35+.65*Math.sin(s.a);
    sc.fillStyle=`rgba(255,255,255,${isDark()?0.55*o:0.25*o})`;sc.beginPath();sc.arc(s.x,s.y,s.r,0,Math.PI*2);sc.fill();});requestAnimationFrame(draw);})();
  let parts=[];addEventListener('mousemove',e=>{for(let i=0;i<3;i++){parts.push({x:e.clientX,y:e.clientY,dx:(Math.random()-.5)*1.6,dy:(Math.random()-.5)*1.6,life:1,h:180+Math.random()*120});}});
  (function trail(){tc.clearRect(0,0,W,H);parts.forEach(p=>{p.x+=p.dx;p.y+=p.dy;p.life-=0.02;const a=isDark()?p.life*.55:p.life*.45;
    tc.fillStyle=`hsla(${p.h},90%,60%,${a})`;tc.beginPath();tc.arc(p.x,p.y,2+p.life*3,0,Math.PI*2);tc.fill();});parts=parts.filter(p=>p.life>0);requestAnimationFrame(trail);})();
}
function initDark(){const k=document.getElementById('dark');if(!k)return;if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');
  k.onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');const a=document.getElementById('aurora');if(a){a.style.display=document.body.classList.contains('dark')?'none':'block';}}}
function initLang(){const b=document.getElementById('lang');if(!b)return;b.onclick=()=>{const p=location.pathname;const page=location.pathname.split('/').pop()||'index.html';
 if(p.includes('/ar/'))location.href=p.replace('/ar/','/en/');else if(p.includes('/en/'))location.href=p.replace('/en/','/de/');else if(p.includes('/de/'))location.href=p.replace('/de/','/ar/');else location.href='ar/'+page;};}
function splitWords(el){const t=el.innerText.trim().split(' ');el.innerHTML=t.map(w=>`<span>${w}&nbsp;</span>`).join('');}
function initReveal(){const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
  if(e.target.classList.contains('words')){[...e.target.querySelectorAll('span')].forEach((s,i)=>setTimeout(()=>s.classList.add('in'),i*45));}}})},{threshold:.12});
  document.querySelectorAll('.reveal,.words').forEach(el=>{if(el.classList.contains('words'))splitWords(el);obs.observe(el)});}
function loadGuest(){
  const box=document.getElementById('guest-list'); if(!box) return;
  const data=JSON.parse(localStorage.getItem('alfarras-guests')||'[]').reverse();
  box.innerHTML = data.map(d=>`<div class="glass media-card"><div style="display:flex;justify-content:space-between;align-items:center"><b>${d.name}</b><div class="rating">${'★'.repeat(d.rate)}${'☆'.repeat(5-d.rate)}</div></div><p style="margin:6px 0 0">${d.msg}</p><div style="opacity:.6;margin-top:6px">${new Date(d.t).toLocaleString()}</div></div>`).join('') || '<div class="glass media-card">لا توجد آراء بعد — كن أول من يشارك رأيه!</div>';
}
function submitGuest(e){
  e.preventDefault();
  const name=e.target.name.value.trim(); const rate=parseInt(e.target.rate.value||'5'); const msg=e.target.msg.value.trim();
  if(!name||!msg) return alert('املأ الاسم والرسالة.');
  const arr=JSON.parse(localStorage.getItem('alfarras-guests')||'[]');
  arr.push({name,rate, msg, t:Date.now()}); localStorage.setItem('alfarras-guests', JSON.stringify(arr));
  e.target.reset(); loadGuest();
}
document.addEventListener('DOMContentLoaded',()=>{
  initDark();initLang();initReveal();loadGuest();
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  if('serviceWorker'in navigator){navigator.serviceWorker.register('../sw.js').catch(()=>{});}
});
