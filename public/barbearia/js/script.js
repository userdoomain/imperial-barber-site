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

  // ============ ReactBits-style: Scramble text no H1 do hero ============
  const scrambleChars = "!<>-_\\/[]{}—=+*^?#________";
  const scrambleEl = document.querySelector(".hero h1");
  if (scrambleEl) {
    const originalHtml = scrambleEl.innerHTML;
    const collectText = (node) => {
      let t = "";
      node.childNodes.forEach((n) => {
        if (n.nodeType === 3) t += n.textContent;
        else t += collectText(n);
      });
      return t;
    };
    const totalLen = collectText(scrambleEl).replace(/\s+/g, " ").length;
    let frame = 0;
    const applyScramble = () => {
      const done = Math.floor((frame / 45) * totalLen);
      let count = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const raw = n.textContent;
            let out = "";
            for (let i = 0; i < raw.length; i++) {
              if (raw[i] === "\n" || raw[i] === "\r" || raw[i] === " " || raw[i] === "\t") {
                out += raw[i];
                continue;
              }
              out += count < done ? raw[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              count++;
            }
            n.textContent = out;
          } else if (n.nodeType === 1) walk(n);
        });
      };
      walk(scrambleEl);
      frame++;
      if (frame <= 45) requestAnimationFrame(applyScramble);
      else {
        scrambleEl.innerHTML = originalHtml;
        initIcons();
      }
    };
    requestAnimationFrame(applyScramble);
  }

  // ============ ReactBits-style: Botões magnéticos no hero ============
  document.querySelectorAll(".hero-cta .btn").forEach((btn) => {
    const strength = 18;
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

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
