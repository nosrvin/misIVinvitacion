# Mis XV Años — Nicole Marissa

Invitación web interactiva, mobile-first, sin frameworks (HTML + CSS +
JavaScript puro). Lista para alojarse en GitHub Pages.

## Estructura del proyecto

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── audio/
│   │   └── music.mp3        ← coloca aquí la pista final (ver más abajo)
│   └── fonts/                (sin uso actualmente; las tipografías se
│                               cargan desde Google Fonts)
└── README.md
```

## Cómo ver la invitación localmente

No necesita instalación ni backend. Basta con abrir `index.html` en
cualquier navegador, o servirlo con un servidor estático simple:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Personalización

Toda la información editable está centralizada en dos lugares:

### 1. Textos y datos generales — `index.html`
Nombre, fecha, hora, lugar, dirección, nombres de padres y padrinos y
código de vestimenta aparecen como texto normal dentro de las secciones
marcadas con comentarios (`<!-- PANTALLA n ... -->`).

### 2. Configuración técnica — `js/script.js`
Al inicio del archivo encontrarás el objeto `CONFIG`:

```js
const CONFIG = {
  eventDateISO: "2026-09-19T16:00:00-04:00",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=...",
  audioSrc: "assets/audio/music.mp3",
};
```

- **`eventDateISO`**: fecha y hora exacta usadas por la cuenta
  regresiva. El `-04:00` corresponde a la zona horaria de Bolivia.
- **`googleMapsUrl`**: enlace que abren los botones "Ver ubicación" e
  "Ir al evento". Actualmente apunta a una búsqueda por nombre y
  dirección del salón. **Reemplázalo por el enlace exacto** una vez
  que lo tengas (en Google Maps: abre el lugar → "Compartir" →
  "Copiar enlace") y pégalo como valor de `googleMapsUrl`.
- **`audioSrc`**: ruta del archivo de música.

### 3. Música — `assets/audio/music.mp3`
El proyecto no incluye ninguna pista con derechos de autor. Agrega tu
propio archivo `music.mp3` en `assets/audio/` (piano + cuerdas,
tono romántico y elegante). El botón flotante inferior derecho
reproduce, pausa y controla el sonido; la música solo comienza después
de que la usuaria toque la invitación, para cumplir con las políticas
de autoplay de los navegadores.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todo el contenido de
   esta carpeta (manteniendo la estructura de carpetas).
2. En el repositorio, ve a **Settings → Pages**.
3. En "Branch", selecciona la rama principal (`main`) y la carpeta
   raíz (`/root`).
4. Guarda. GitHub te dará una URL pública, por ejemplo:
   `https://tu-usuario.github.io/tu-repositorio/`
5. Comparte ese enlace como la invitación digital.

## Notas de diseño

- Paleta: celeste pastel como color protagonista, blanco cálido y
  crema como base, dorado champagne como acento puntual.
- Tipografías: `Cormorant Garamond` (serif, títulos y nombres) y
  `Jost` (sans-serif, texto y botones), cargadas desde Google Fonts.
- Sin fotografías, sin carrusel, sin confirmación de asistencia — por
  diseño, según el concepto solicitado.
- Respeta `prefers-reduced-motion` reduciendo animaciones cuando el
  sistema del usuario lo solicita.
