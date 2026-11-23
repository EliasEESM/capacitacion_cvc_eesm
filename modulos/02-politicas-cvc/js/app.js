/* ==========================================================================
   CVC de Occidente 2026 - Enrutador SPA y Punto de Entrada Principal (main)
   Integrado al Portal Maestro de Capacitación CVC
   ========================================================================== */

class CVCRouter {
  constructor() {
    this.routes = ["home", "exposicion", "dinamica"];
    this.currentRoute = "home";
  }

  init() {
    const mobileMenu = document.getElementById("polNavMenu");
    const mobileToggle = document.getElementById("polNavToggle");

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(open));
      });
    }

    // Escuchar clics en elementos con [data-route]
    document.querySelectorAll("[data-route]").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const target = el.getAttribute("data-route");
        this.navigate(target);
        if (mobileMenu && mobileToggle) {
          mobileMenu.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Soporte para hash routing (#home, #exposicion, #dinamica)
    window.addEventListener("hashchange", () => {
      const hashRoute = window.location.hash.replace("#", "");
      if (this.routes.includes(hashRoute)) {
        this.activateView(hashRoute, false);
      }
    });

    const initialHash = window.location.hash.replace("#", "");
    if (this.routes.includes(initialHash)) {
      this.activateView(initialHash, false);
    } else {
      this.activateView("home", false);
    }
  }

  navigate(route) {
    if (!this.routes.includes(route)) return;
    try {
      window.location.hash = route;
    } catch (_) {}
    this.activateView(route, true);
  }

  activateView(route, scrollTop = true) {
    this.currentRoute = route;

    if (window.CVC_UI && typeof window.CVC_UI.closeExpandedCard === "function") {
      window.CVC_UI.closeExpandedCard();
    }

    // Mostrar vista activa
    document.querySelectorAll(".spa-view").forEach(view => {
      view.classList.toggle("active", view.id === `view-${route}`);
    });

    // Actualizar estado activo del menú flotante y barra superior maestra
    document.querySelectorAll("[data-route]").forEach(btn => {
      if (
        btn.classList.contains("dock-btn") ||
        btn.classList.contains("nav-pill-btn") ||
        btn.classList.contains("nav-link")
      ) {
        btn.classList.toggle("active", btn.getAttribute("data-route") === route);
      }
    });

    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

/* Función principal de arranque de la aplicación */
function main() {
  const logoImg = document.getElementById("polLogo");
  const logoFallback = document.getElementById("polLogoFallback");
  if (logoImg) {
    logoImg.onerror = () => {
      logoImg.style.display = "none";
      if (logoFallback) logoFallback.style.display = "block";
    };
  }

  const gameManager = new window.CVCGameManager(
    window.CVC_DATA.scenarios,
    window.CVC_DATA.avatars
  );
  window.CVC_UI.init(gameManager);

  const router = new CVCRouter();
  router.init();
  window.CVC_ROUTER = router;
}

document.addEventListener("DOMContentLoaded", main);
