const settingsToggle = document.querySelector("#settings-toggle");
const settingsMenu = document.querySelector("#settings-menu");
const themeOptions = document.querySelectorAll("[data-theme-choice]");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const navToggle = document.querySelector("#nav-toggle");
const navPanel = document.querySelector("#section-nav-panel");
const navQuery = window.matchMedia("(max-width: 760px)");

function applyTheme(theme) {
  const light = theme === "light";
  if (light) {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }
  themeOptions.forEach((button) => {
    const selected = button.dataset.themeChoice === (light ? "light" : "dark");
    button.setAttribute("aria-checked", selected ? "true" : "false");
    button.tabIndex = selected ? 0 : -1;
  });
  if (themeMeta) {
    themeMeta.setAttribute("content", light ? "#eef1f4" : "#1a1e23");
  }
  try {
    localStorage.setItem("whoisben-theme", light ? "light" : "dark");
  } catch {}
}

function setSettingsOpen(open) {
  if (!settingsToggle || !settingsMenu) return;
  settingsToggle.setAttribute("aria-expanded", open ? "true" : "false");
  settingsMenu.hidden = !open;
}

function setNavOpen(open) {
  if (!navToggle || !navPanel) return;
  const show = Boolean(open) && navQuery.matches;
  navToggle.setAttribute("aria-expanded", show ? "true" : "false");
  navToggle.setAttribute("aria-label", show ? "Close menu" : "Open menu");
  navPanel.classList.toggle("is-open", show);
}

if (settingsToggle && settingsMenu) {
  applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

  settingsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = settingsToggle.getAttribute("aria-expanded") !== "true";
    setSettingsOpen(open);
    if (open) setNavOpen(false);
  });

  themeOptions.forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
    });
  });

  document.querySelector(".theme-switch")?.addEventListener("keydown", (event) => {
    const options = [...themeOptions];
    if (!options.length) return;
    const current = Math.max(
      0,
      options.findIndex((button) => button.getAttribute("aria-checked") === "true")
    );
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (current + 1) % options.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (current - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = options.length - 1;
    }
    if (next === null) return;
    event.preventDefault();
    applyTheme(options[next].dataset.themeChoice);
    options[next].focus();
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!settingsMenu.hidden && !settingsMenu.contains(event.target) && !settingsToggle.contains(event.target)) {
      setSettingsOpen(false);
    }
    if (
      navPanel &&
      navPanel.classList.contains("is-open") &&
      !navPanel.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (navPanel && navPanel.classList.contains("is-open")) {
      setNavOpen(false);
      navToggle.focus();
      return;
    }
    if (settingsMenu.hidden) return;
    setSettingsOpen(false);
    settingsToggle.focus();
  });
}

if (navToggle && navPanel) {
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    setNavOpen(open);
    if (open) setSettingsOpen(false);
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setNavOpen(false);
    });
  });

  navQuery.addEventListener("change", () => {
    if (!navQuery.matches) setNavOpen(false);
  });
}

const sectionRules = document.querySelectorAll(
  ".skills h2, .experience h2, .internships h2, .education h2, .about-site h2"
);

function alignSectionRules() {
  const dpr = window.devicePixelRatio || 1;
  const size = 1 / dpr;
  sectionRules.forEach((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = range.getClientRects();
    const textBottom = rects.length ? rects[rects.length - 1].bottom : el.getBoundingClientRect().top;
    const frac = textBottom * dpr - Math.floor(textBottom * dpr);
    el.style.setProperty("--rule-size", `${size}px`);
    el.style.setProperty("--rule-shift", `${frac === 0 ? 0 : (1 - frac) / dpr}px`);
  });
}

let ruleFrame = 0;
function scheduleSectionRules() {
  if (ruleFrame) return;
  ruleFrame = requestAnimationFrame(() => {
    ruleFrame = 0;
    alignSectionRules();
  });
}

alignSectionRules();
window.addEventListener("resize", scheduleSectionRules);
window.addEventListener("scroll", scheduleSectionRules, { passive: true });
if (document.fonts) {
  document.fonts.ready.then(alignSectionRules);
}

const portrait = document.querySelector(".portrait img");
if (portrait) {
  const dropPortrait = () => portrait.remove();
  portrait.addEventListener("error", dropPortrait);
  if (portrait.complete && portrait.naturalWidth === 0) dropPortrait();
}
