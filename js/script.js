/* ==========================================================================
   MIS XV AÑOS — NICOLE MARISSA
   Toda la información editable vive en el objeto CONFIG de abajo.
   ========================================================================== */

const CONFIG = {
  // Fecha y hora exacta del evento (formato ISO con zona horaria de Bolivia -04:00)
  eventDateISO: "2026-09-19T16:00:00-04:00",

  // -----------------------------------------------------------------------
  // ENLACE DE GOOGLE MAPS
  // Reemplaza este valor por el enlace EXACTO del lugar cuando lo tengas
  // (por ejemplo, uno generado desde "Compartir > Copiar enlace" en Google Maps).
  // Mientras tanto se usa un enlace de búsqueda por nombre y dirección.
  // -----------------------------------------------------------------------
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      'Salón de Eventos Valparaíso, Zona Villa Bolívar F, calle 136, El Alto, Bolivia'
    ),

  // Ruta del archivo de música. Reemplaza este archivo por la pista final.
  audioSrc: "assets/audio/music.mp3",
};

/* ==========================================================================
   Utilidades
   ========================================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ==========================================================================
   Enlaces de ubicación (Google Maps)
   ========================================================================== */
function wireLocationButtons() {
  const viewBtn = $("#btn-view-location");
  const goBtn = $("#btn-go-event");
  if (viewBtn) viewBtn.href = CONFIG.googleMapsUrl;
  if (goBtn) goBtn.href = CONFIG.googleMapsUrl;
}

/* ==========================================================================
   Cuenta regresiva
   ========================================================================== */
function startCountdown() {
  const target = new Date(CONFIG.eventDateISO).getTime();

  const els = {
    days: $("#cd-days"),
    hours: $("#cd-hours"),
    minutes: $("#cd-minutes"),
    seconds: $("#cd-seconds"),
  };
  const countdownEl = $("#countdown");
  const arrivedEl = $("#countdown-arrived");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      if (countdownEl) countdownEl.hidden = true;
      if (arrivedEl) arrivedEl.hidden = false;
      clearInterval(timerId);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (els.days) els.days.textContent = pad(days);
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.minutes) els.minutes.textContent = pad(minutes);
    if (els.seconds) els.seconds.textContent = pad(seconds);
  }

  tick();
  const timerId = setInterval(tick, 1000);
}

/* ==========================================================================
   Revelado progresivo al hacer scroll
   ========================================================================== */
function setupScrollReveal() {
  const sections = $$("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((el) => el.classList.add("is-shown"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Música ambiental
   ========================================================================== */
function setupAudio() {
  const audio = new Audio(CONFIG.audioSrc);
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0.55;

  const toggle = $("#music-toggle");
  let isPlaying = false;

  function play() {
    audio.play().then(() => {
      isPlaying = true;
      toggle.setAttribute("aria-pressed", "true");
      toggle.setAttribute("aria-label", "Pausar música");
    }).catch(() => {
      // El navegador bloqueó la reproducción o el archivo aún no existe;
      // no se interrumpe la experiencia por esto.
      isPlaying = false;
      toggle.setAttribute("aria-pressed", "false");
    });
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Activar música");
  }

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  });

  return { play, pause };
}

/* ==========================================================================
   Apertura de la invitación (pantalla inicial)
   ========================================================================== */
function setupOpening(audioControls) {
  const opening = $("#opening");
  const card = $("#card");
  const content = $("#content");

  let hasOpened = false;

  function openInvitation() {
    if (hasOpened) return;
    hasOpened = true;

    // 1. Música (requiere gesto del usuario; ya lo tenemos aquí)
    audioControls.play();

    // 2. Animación de apertura de la tarjeta
    card.classList.add("is-opening");

    // 3. Revelar el contenido principal progresivamente
    const revealDelay = prefersReducedMotion ? 150 : 900;

    window.setTimeout(() => {
      content.setAttribute("aria-hidden", "false");
      content.classList.add("is-visible");
      document.body.style.overflow = "";
    }, revealDelay);

    // 4. Desvanecer la pantalla de apertura
    const dismissDelay = prefersReducedMotion ? 250 : 1500;
    window.setTimeout(() => {
      opening.classList.add("is-leaving");
      opening.setAttribute("aria-hidden", "true");
    }, dismissDelay);

    card.removeEventListener("click", openInvitation);
  }

  // Bloquear el scroll de fondo mientras se muestra la invitación cerrada
  document.body.style.overflow = "hidden";

  card.addEventListener("click", openInvitation, { once: true });
}

/* ==========================================================================
   Inicialización
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  wireLocationButtons();
  startCountdown();
  setupScrollReveal();
  const audioControls = setupAudio();
  setupOpening(audioControls);
});
