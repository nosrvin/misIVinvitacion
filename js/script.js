/* =========================================================
   NICOLE MARISSA — MIS XV AÑOS
   Lógica de la invitación interactiva
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURACIÓN — editar aquí todos los datos del evento
   --------------------------------------------------------- */
const invitationData = {
  name: "Nicole Marissa",
  eventDate: "2026-09-19T16:00:00", // fecha/hora objetivo del contador
  targetDay: 19,                    // día a marcar en el calendario
  targetMonthIndex: 8,              // septiembre = 8 (0 = enero)
  targetYear: 2026,
  venue: 'Salón de Eventos "Valparaíso"',
  address: 'Zona Villa Bolívar "F", calle 136 esq. 25 de Julio, carretera a Viacha',

  // Enlace de Google Maps
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+de+Eventos+Valparaiso+Viacha+Bolivia",

  music: "assets/audio/music.mp3",

  photos: [
    "assets/images/photo1.jpeg",
    "assets/images/photo2.jpeg",
    "assets/images/photo3.jpeg"
  ]
};


/* ---------------------------------------------------------
   INICIO
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  /*
   * Bloquear el scroll mientras está la pantalla
   * de apertura.
   */
  document.body.style.overflow = "hidden";

  /*
   * Ocultar el fondo global mientras se muestra
   * la pantalla de apertura.
   */
  document.body.classList.add("gate-active");

  applyConfig();
  buildSparkles();
  buildCalendar();
  setupCountdown();
  setupGateOpening();
  setupScrollReveal();
  setupMusic();
  setupPhotoViewer();

});


/* ---------------------------------------------------------
   2. APLICAR CONFIGURACIÓN A LA UI
   --------------------------------------------------------- */
function applyConfig(){

  const viewBtn = document.getElementById("btnViewLocation");
  const goBtn = document.getElementById("btnGoLocation");

  if (viewBtn) {
    viewBtn.href = invitationData.mapsUrl;
  }

  if (goBtn) {
    goBtn.href = invitationData.mapsUrl;
  }


  const audioSource = document.querySelector("#bgMusic source");

  if (audioSource) {
    audioSource.src = invitationData.music;
  }


  document.querySelectorAll(".photo img").forEach((img, i) => {

    if (invitationData.photos[i]) {
      img.src = invitationData.photos[i];
    }

  });

}


/* ---------------------------------------------------------
   3. PARTÍCULAS / DESTELLOS SUTILES DE FONDO
   --------------------------------------------------------- */
function buildSparkles(){

  const container = document.getElementById("sparkles");

  if (!container) return;

  const count = window.innerWidth < 640 ? 14 : 26;

  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++){

    const s = document.createElement("span");

    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;

    s.style.animationDelay = `${Math.random() * 5}s`;
    s.style.animationDuration = `${4 + Math.random() * 4}s`;

    frag.appendChild(s);

  }

  container.appendChild(frag);

}


/* ---------------------------------------------------------
   4. APERTURA DE LA INVITACIÓN (3D)
   --------------------------------------------------------- */
function setupGateOpening(){

  const openBtn = document.getElementById("openBtn");
  const invitation = document.getElementById("invitation");
  const gate = document.getElementById("gate");
  const world = document.getElementById("world");

  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");


  /*
   * Verificar que los elementos existan.
   */
  if (!openBtn || !invitation || !gate || !world) {
    return;
  }


  let opened = false;


  openBtn.addEventListener("click", () => {

    /*
     * Evitar que se pueda ejecutar la animación
     * varias veces.
     */
    if (opened) {
      return;
    }

    opened = true;


    /* -----------------------------------------
       1. DESAPARECER BOTÓN
       ----------------------------------------- */
    openBtn.classList.add("is-fading");


    /* -----------------------------------------
       2. ABRIR LAS DOS PUERTAS
       ----------------------------------------- */
    invitation.classList.add("is-open");


    /* -----------------------------------------
       3. REPRODUCIR MÚSICA
       ----------------------------------------- */
    if (music){

      music.play()
        .then(() => {

          if (musicToggle){
            musicToggle.setAttribute(
              "aria-pressed",
              "true"
            );
          }

        })
        .catch(() => {

          /*
           * El navegador puede bloquear la
           * reproducción. No detenemos la apertura.
           */

        });

    }


    /* -----------------------------------------
       4. ESPERAR A QUE LAS PUERTAS SE ABRAN
       ----------------------------------------- */

    window.setTimeout(() => {

      /*
       * Comenzar a desaparecer la pantalla
       * completa de apertura.
       */
      gate.classList.add("gate--hidden");


      /*
       * Esperar a que termine completamente
       * el fade del gate.
       */
      window.setTimeout(() => {

        /*
         * IMPORTANTE:
         *
         * Quitamos el gate completamente.
         * Ya no puede quedar ninguna capa
         * transparente u oscura encima.
         */
        gate.style.display = "none";


        /*
         * Restaurar el fondo global.
         */
        document.body.classList.remove("gate-active");


        /*
         * Mostrar el contenido principal.
         */
        world.hidden = false;


        /*
         * Habilitar nuevamente el scroll.
         */
        document.body.style.overflow = "";


        /*
         * Activar los elementos que utilizan
         * IntersectionObserver.
         */
        window.dispatchEvent(
          new Event("scroll")
        );


      }, 850);

    }, 1350);

  });

}


/* ---------------------------------------------------------
   5. SCROLL REVEAL (IntersectionObserver)
   --------------------------------------------------------- */
function setupScrollReveal(){

  const targets = document.querySelectorAll(".reveal");

  if (
    !("IntersectionObserver" in window) ||
    !targets.length
  ){

    targets.forEach(el => {
      el.classList.add("is-visible");
    });

    return;
  }


  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting){

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px"
    }
  );


  targets.forEach(el => {
    observer.observe(el);
  });

}


/* ---------------------------------------------------------
   6. CONTADOR REGRESIVO
   --------------------------------------------------------- */
function setupCountdown(){

  const target =
    new Date(invitationData.eventDate).getTime();

  const daysEl =
    document.getElementById("cd-days");

  const hoursEl =
    document.getElementById("cd-hours");

  const minutesEl =
    document.getElementById("cd-minutes");

  const secondsEl =
    document.getElementById("cd-seconds");

  const countdownEl =
    document.getElementById("countdown");

  const todayEl =
    document.getElementById("cd-today");


  if (!daysEl) return;


  function pad(n){
    return String(n).padStart(2, "0");
  }


  function tick(){

    const now = Date.now();

    const diff = target - now;


    if (diff <= 0){

      countdownEl.hidden = true;
      todayEl.hidden = false;

      clearInterval(timer);

      return;
    }


    const days =
      Math.floor(
        diff / (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (diff / (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (diff / 1000) % 60
      );


    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

  }


  tick();

  const timer = setInterval(
    tick,
    1000
  );

}


/* ---------------------------------------------------------
   7. CALENDARIO VISUAL
   --------------------------------------------------------- */
function buildCalendar(){

  const grid =
    document.getElementById("calendarGrid");

  if (!grid) return;


  const {
    targetYear,
    targetMonthIndex,
    targetDay
  } = invitationData;


  const dowLabels =
    ["D", "L", "M", "M", "J", "V", "S"];


  const frag =
    document.createDocumentFragment();


  dowLabels.forEach(label => {

    const el =
      document.createElement("div");

    el.className =
      "calendar__dow";

    el.textContent =
      label;

    frag.appendChild(el);

  });


  const firstDay =
    new Date(
      targetYear,
      targetMonthIndex,
      1
    ).getDay();


  const daysInMonth =
    new Date(
      targetYear,
      targetMonthIndex + 1,
      0
    ).getDate();


  for (
    let i = 0;
    i < firstDay;
    i++
  ){

    const empty =
      document.createElement("div");

    empty.className =
      "calendar__day calendar__day--empty";

    frag.appendChild(empty);

  }


  for (
    let d = 1;
    d <= daysInMonth;
    d++
  ){

    const cell =
      document.createElement("div");

    cell.className =
      "calendar__day";


    if (d === targetDay){

      cell.classList.add(
        "calendar__day--target"
      );


      cell.innerHTML = `
        <svg
          class="heart-mark"
          viewBox="0 0 40 36"
          aria-hidden="true"
        >
          <use href="#icon-heart"/>
        </svg>

        <span>${d}</span>
      `;


      cell.setAttribute(
        "aria-label",
        `${d} de septiembre — día de los XV años`
      );

    } else {

      cell.textContent =
        String(d);

    }


    frag.appendChild(cell);

  }


  grid.appendChild(frag);

}


/* ---------------------------------------------------------
   8. MÚSICA AMBIENTAL
   --------------------------------------------------------- */
function setupMusic(){

  const toggle =
    document.getElementById("musicToggle");

  const music =
    document.getElementById("bgMusic");


  if (!toggle || !music) return;


  toggle.addEventListener("click", () => {

    if (music.paused){

      music.play()
        .then(() => {

          toggle.setAttribute(
            "aria-pressed",
            "true"
          );

        })
        .catch(() => {});

    } else {

      music.pause();

      toggle.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  });

}


/* ---------------------------------------------------------
   9. VISOR DE FOTOGRAFÍAS
   --------------------------------------------------------- */
function setupPhotoViewer(){

  const viewer =
    document.getElementById("photoViewer");

  const viewerImg =
    document.getElementById("photoViewerImg");

  const closeBtn =
    document.getElementById("photoViewerClose");

  const photos =
    document.querySelectorAll(".photo");


  if (!viewer) return;
  
  viewer.hidden = true;

  photos.forEach(btn => {

    btn.addEventListener("click", () => {

      const img =
        btn.querySelector("img");

      viewerImg.src =
        img.src;

      viewerImg.alt =
        img.alt;

      viewer.hidden = false;

      document.body.style.overflow =
        "hidden";

    });

  });


  function close(){

    viewer.hidden = true;

    document.body.style.overflow = "";

  }


  if (closeBtn){
    closeBtn.addEventListener(
      "click",
      close
    );
  }


  viewer.addEventListener(
    "click",
    (e) => {

      if (e.target === viewer){
        close();
      }

    }
  );


  document.addEventListener(
    "keydown",
    (e) => {

      if (
        e.key === "Escape" &&
        !viewer.hidden
      ){
        close();
      }

    }
  );

}