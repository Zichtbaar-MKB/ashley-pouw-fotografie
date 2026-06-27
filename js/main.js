/* Ashley Pouw Fotografie — interacties */
document.addEventListener("DOMContentLoaded", function () {

  /* ---- header bij scrollen ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobiel menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  /* ---- hero-arc: na binnenkomst overschakelen op doorlopende zweef ---- */
  const arc = document.querySelector(".arc");
  if (arc) {
    setTimeout(() => arc.classList.add("loaded"), 1700);
  }

  /* ---- reveal bij scrollen ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add("in"));
  }

  /* ---- portfolio filter ---- */
  const filterbar = document.querySelector(".filterbar");
  if (filterbar) {
    const figs = document.querySelectorAll(".gallery figure");
    filterbar.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filterbar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      figs.forEach(fig => {
        const show = f === "all" || fig.dataset.cat === f;
        fig.classList.toggle("hide", !show);
      });
    });
  }

  /* ---- lightbox ---- */
  const lb = document.querySelector(".lightbox");
  if (lb) {
    const lbImg = lb.querySelector("img");
    const triggers = Array.from(document.querySelectorAll("[data-lightbox] img, .gallery figure img"));
    let idx = 0;
    const open = (i) => {
      idx = (i + triggers.length) % triggers.length;
      lbImg.src = triggers[idx].src;
      lbImg.alt = triggers[idx].alt || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    triggers.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => open(i));
    });
    lb.querySelector(".close").addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", () => open(idx - 1));
    lb.querySelector(".next").addEventListener("click", () => open(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") open(idx + 1);
      if (e.key === "ArrowLeft") open(idx - 1);
    });
  }

  /* ---- FAQ accordeon: maximaal één open ---- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) faqItems.forEach(o => { if (o !== item) o.open = false; });
    });
  });

  /* ---- contactformulier (demo, geen back-end) ---- */
  const form = document.querySelector("form[data-demo]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.querySelector(".form-success").classList.add("show");
      form.querySelectorAll("input, select, textarea").forEach(el => { if (el.type !== "submit") el.value = ""; });
    });
  }
});
