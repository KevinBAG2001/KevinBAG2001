(function () {
  const STORAGE_LANG = "kevin-portfolio-lang";
  const STORAGE_THEME = "kevin-portfolio-theme";

  const html = document.documentElement;

  function setLang(lang) {
    const isEn = lang === "en";
    html.lang = isEn ? "en" : "es";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = isEn ? el.dataset.en : el.dataset.es;
      if (text != null) {
        if (el.tagName === "META" && el.getAttribute("name") === "description") {
          el.setAttribute("content", text);
        } else {
          el.textContent = text;
        }
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const htmlContent = isEn ? el.dataset.en : el.dataset.es;
      if (htmlContent != null) el.innerHTML = htmlContent;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const label = isEn ? el.dataset.enAria : el.dataset.esAria;
      if (label) el.setAttribute("aria-label", label);
    });
    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.textContent = isEn ? "ES" : "EN";
      btn.setAttribute(
        "aria-label",
        isEn ? "Switch to Spanish" : "Cambiar a inglés"
      );
    }
    localStorage.setItem(STORAGE_LANG, lang);
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀" : "☾";
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Light mode" : "Modo oscuro"
      );
    }
    localStorage.setItem(STORAGE_THEME, theme);
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }

  function initLang() {
    const stored = localStorage.getItem(STORAGE_LANG);
    setLang(stored === "en" ? "en" : "es");
  }

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    setLang(html.lang === "en" ? "es" : "en");
  });

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  const menuToggle = document.getElementById("menu-toggle");
  const navMobile = document.getElementById("nav-mobile");
  menuToggle?.addEventListener("click", () => {
    const open = navMobile.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  initTheme();
  initLang();
})();
