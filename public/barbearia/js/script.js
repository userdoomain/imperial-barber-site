/* =========================================================
   Barbearia Imperial — Scripts
   ========================================================= */
(function () {
  "use strict";

  // ============ Inicializar ícones Lucide ============
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    } else {
      // Aguarda o CDN carregar
      setTimeout(initIcons, 100);
    }
  }
  initIcons();

  // ============ AOS: animações ao scroll ============
  if (window.AOS) {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 60 });
  }

  // ============ Navbar: efeito ao rolar ============
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ============ Menu mobile ============
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // ============ Ano dinâmico no footer ============
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ============ Antes & Depois slider ============
  const baWrap = document.querySelector(".ba-img-wrap");
  const baAfter = document.querySelector(".ba-after");
  const baHandle = document.getElementById("baHandle");
  if (baWrap && baAfter && baHandle) {
    let dragging = false;
    const move = (x) => {
      const rect = baWrap.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      if (pct < 5) pct = 5;
      if (pct > 95) pct = 95;
      baAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      baHandle.style.left = pct + "%";
    };
    baHandle.addEventListener("mousedown", (e) => { dragging = true; e.preventDefault(); });
    baHandle.addEventListener("touchstart", (e) => { dragging = true; e.preventDefault(); });
    document.addEventListener("mousemove", (e) => { if (dragging) move(e.clientX); });
    document.addEventListener("touchmove", (e) => { if (dragging) move(e.touches[0].clientX); }, { passive: true });
    document.addEventListener("mouseup", () => { dragging = false; });
    document.addEventListener("touchend", () => { dragging = false; });
  }

  // ============ Scroll suave para âncoras (fallback) ============
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
    });
  });
})();
