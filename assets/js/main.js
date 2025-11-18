
// dark mode
(function(){
  const btn = document.getElementById("dark-toggle");
  const body = document.body;
  const saved = localStorage.getItem("theme");
  if(saved === "dark"){ body.classList.add("dark"); }
  if(btn){
    btn.addEventListener("click", ()=>{
      body.classList.toggle("dark");
      localStorage.setItem("theme", body.classList.contains("dark") ? "dark":"light");
    });
  }
})();

// scroll to top
(function(){
  const topBtn = document.getElementById("top");
  if(!topBtn) return;
  window.addEventListener("scroll", ()=>{
    topBtn.style.display = window.scrollY > 260 ? "block":"none";
  });
  topBtn.addEventListener("click", ()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  });
})();

// reveal on scroll
(function(){
  const els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    els.forEach(el=>el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("visible"); }
    });
  },{threshold:0.18});
  els.forEach(el=>obs.observe(el));
})();

// simple mouse follower
(function(){
  const cursor = document.createElement("div");
  cursor.style.position="fixed";
  cursor.style.width="18px";
  cursor.style.height="18px";
  cursor.style.borderRadius="999px";
  cursor.style.border="1px solid rgba(56,189,248,.8)";
  cursor.style.boxShadow="0 0 18px rgba(34,211,238,.7)";
  cursor.style.pointerEvents="none";
  cursor.style.zIndex="30";
  cursor.style.transform="translate(-50%,-50%)";
  cursor.style.transition="transform .09s ease-out";
  document.body.appendChild(cursor);
  window.addEventListener("mousemove", e=>{
    cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  });
})();
