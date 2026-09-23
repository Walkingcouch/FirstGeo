/* ==========================================================================
   FIRST GEOSPATIAL — main.js
   Small, dependency-free behaviours. Everything degrades gracefully with JS off.
   ========================================================================== */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  /* ---- Header: transparent over the hero, solid once you scroll ---------- */
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ------------------------------------------------------- */
  const setMenu = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => e.matches && setMenu(false));
  }

  /* ---- Nav highlight follows the section in view ------------------------- */
  const links = [...document.querySelectorAll(".nav__list a[data-spy]")];
  const byId = new Map(links.map((a) => [a.dataset.spy, a]));
  const targets = [...byId.keys()]
    .map((id) => (id === "top" ? document.querySelector(".hero") : document.getElementById(id)))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((a) => a.removeAttribute("aria-current"));
    const a = byId.get(id);
    if (a) a.setAttribute("aria-current", "true");
  };

  if ("IntersectionObserver" in window && targets.length) {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const id = en.target.classList.contains("hero") ? "top" : en.target.id;
          en.isIntersecting ? visible.set(id, en.intersectionRatio) : visible.delete(id);
        });
        if (!visible.size) return;
        // The most visible section wins.
        const [best] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(best);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, .25, .5, .75, 1] }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---- Watch video dialog ------------------------------------------------ */
  const dialog = document.getElementById("video-dialog");
  const openBtn = document.querySelector("[data-video-open]");
  if (dialog && typeof dialog.showModal === "function" && openBtn) {
    const video = dialog.querySelector("video");
    const fallback = dialog.querySelector(".video-dialog__fallback");
    const source = video && video.querySelector("source");

    // No file at assets/video/intro.mp4? Show a friendly message instead of a broken player.
    const showFallback = () => { if (video) video.hidden = true; if (fallback) fallback.hidden = false; };
    if (source) source.addEventListener("error", showFallback);

    openBtn.addEventListener("click", () => {
      dialog.showModal();
      if (video && !video.hidden) { video.load(); const p = video.play(); if (p && p.catch) p.catch(() => {}); }
    });
    const close = () => { if (video) video.pause(); dialog.close(); };
    dialog.querySelector("[data-video-close]").addEventListener("click", close);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); }); // click backdrop
    dialog.addEventListener("close", () => video && video.pause());
  }
})();
