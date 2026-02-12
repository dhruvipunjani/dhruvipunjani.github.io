(function () {
  "use strict";

  // ----- Custom Cursor Logic
  const cursorBall = document.querySelector(".cursor-ball");
  const glow = document.querySelector(".cursor-glow");
  
  let mouseX = 0;
  let mouseY = 0;
  
  // Ambient Glow
  if (glow) {
    window.addEventListener("mousemove", (e) => {
      glow.style.setProperty("--cx", e.clientX + "px");
      glow.style.setProperty("--cy", e.clientY + "px");
    }, { passive: true });
  }

  // Ball Movement (Direct follow with slight lag via CSS transition)
  if (cursorBall) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorBall.style.left = mouseX + "px";
      cursorBall.style.top = mouseY + "px";
    }, { passive: true });
  }

  // ----- Nav & Scroll
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  let lastScroll = 0;
  function onScroll() {
    const y = window.scrollY;
    // Simple sticky nav effect
    if (y > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    lastScroll = y;
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.classList.toggle("active");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Reveal on scroll
  const reveals = document.querySelectorAll(".reveal, .reveal-item, .reveal-up, .reveal-fade, .reveal-scale, .reveal-blur, .reveal-left, .reveal-right");
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ----- Projects Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  function setActiveFilter(filter) {
    filterBtns.forEach(function (b) {
      const isActive = b.getAttribute("data-filter") === filter;
      b.classList.toggle("active", isActive);
    });
    projectCards.forEach(function (card) {
      const cat = card.getAttribute("data-category");
      const show = filter === "all" || cat === filter;
      card.classList.toggle("hidden", !show);
    });
  }
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      setActiveFilter(b.getAttribute("data-filter") || "all");
    });
  });

  // ----- Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ----- Project Parallax
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 4;
      const tiltY = (x - 0.5) * -4;
      card.style.transform = "translateY(-4px) perspective(800px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  // ----- Modal Logic
  const modal = document.getElementById("reportModal");
  const frame = modal ? modal.querySelector(".modal-frame") : null;
  const openNew = modal ? modal.querySelector("[data-modal-open-new]") : null;
  const dl = modal ? modal.querySelector("[data-modal-download]") : null;
  const toast = document.getElementById("toast");
  let toastTimer = 0;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  function openModal(src) {
    if (!modal || !frame) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    frame.src = src;
    if (openNew) openNew.href = src;
    if (dl) dl.href = src;
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal || !frame) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = "about:blank";
    document.documentElement.style.overflow = "";
  }

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }
})();