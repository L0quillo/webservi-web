# Alternativas Open Source en GitHub a Framer y Análisis de Skills WIP
Fecha: 25 de septiembre de 2026  
Proyecto: WebServi.Net  
Referencias previas consultadas: `G:\Mi unidad\WIP\WIP_WEB_Diseño_y_Recursos_IA\.agents\skills`

---

## 1. Contexto y Hallazgo Clave en los Skills Previos

Al inspeccionar los skills de **WIP Soluciones Integrales (`.agents/skills/wip-bolivia`)**, se confirma una sinergia directa y fundamental:
1. **Relación Operativa:** **WIP Soluciones Integrales** (Santa Cruz, Bolivia) tiene explícitamente documentado a **WebServi IoT** como su plataforma tecnológica aliada para telemetría industrial (calderas Arauterm a 10 bar, plantas de agua y filtros críticos).
2. **Modelo Web Exitoso en WIP:** En WIP Bolivia se adoptó la política de **HTML5/CSS/JS/PHP puro, modular y sin dependencias pesadas de Node/npm en producción**, desplegado directamente en hosting con `.cpanel.yml` o subida directa, lo que garantiza tiempos de carga de menos de 1 segundo y cero fallas de plugins.
3. **Estándares Visuales de Alta Gama (`high-end-visual-design` & `ui-ux-pro-max`):**
   - **Double-Bezel (Doble bisel concéntrico):** Contenedores con envolvente exterior (`p-2`, borde sutil) y núcleo interior con radio concéntrico `calc(radius - padding)` y relieve háptico.
   - **Asymmetrical Bento Grid:** Distribución de tarjetas asimétricas (8 columnas + 4 columnas) que rompen la monotonía de las plantillas tradicionales.
   - **Tipografía de Alto Impacto:** Combinación de fuentes geométricas de ingeniería (*Space Grotesk*, *Plus Jakarta Sans*) y eliminación total de tipografías genéricas desgastadas (Arial, Times).

---

## 2. Opciones en GitHub que Reemplazan a Framer (Open Source y Editables)

Framer destaca por dos cosas: **su canvas visual para diseñar** y **la facilidad de edición para el cliente (doble clic en el texto para editar)**, pero cobra entre $15 y $30 USD mensuales por sitio y genera dependencia de su servidor.

A continuación, las mejores herramientas en **GitHub** que ofrecen una experiencia similar, 100% de código abierto, autohospedables y sin pagos recurrentes:

---

### Opción 1: **Puck (`measuredco/puck`)** — ⭐ *La alternativa más cercana a Framer en React*
* **Repositorio:** [github.com/measuredco/puck](https://github.com/measuredco/puck)
* **¿Qué es?** Es un editor visual y constructor de páginas *drag-and-drop* de código abierto para React y Next.js.
* **Cómo funciona:** Tú creas tus componentes limpios (como las tarjetas de WebServi, el hero interactivo o el simulador IoT) y Puck genera una interfaz idéntica a Framer donde cualquier persona sin conocimientos técnicos puede arrastrar bloques, editar textos en vivo, cambiar fotos y reordenar secciones.
* **Ventajas:**
  - **100% gratuito y de código abierto (licencia MIT).**
  - Cero dependencias propietarias: los datos se guardan en un simple JSON o base de datos propia.
  - El código final es React / HTML puro: carga a máxima velocidad.
* **Ideal para:** Equipos que quieren la interfaz visual de Framer sin pagar suscripciones mensuales.

---

### Opción 2: **TinaCMS (`tinacms/tinacms`)** — ⭐ *Edición directa "en la página" (In-Context Editing)*
* **Repositorio:** [github.com/tinacms/tinacms](https://github.com/tinacms/tinacms)
* **¿Qué es?** Un CMS visual Git-backed donde el usuario edita directamente sobre la web real.
* **Cómo funciona:** El cliente navega por su propia web, presiona un botón de "Editar", hace clic sobre cualquier texto o imagen para modificarlo en tiempo real en la pantalla (WYSIWYG puro) y al pulsar "Guardar", TinaCMS guarda los cambios en archivos Markdown o en Git automáticamente.
* **Ventajas:**
  - Funciona de forma excelente con **Astro, Next.js, Hugo o HTML estático**.
  - No requiere base de datos MySQL en el servidor: la web sigue siendo estática y ultra rápida.
  - Extremadamente intuitivo para clientes no técnicos.
* **Ideal para:** Una web corporativa estática ultra rápida con la máxima facilidad de edición para el cliente.

---

### Opción 3: **Onlook (`onlook-dev/onlook`)** — *El "Cursor" visual para diseñadores*
* **Repositorio:** [github.com/onlook-dev/onlook](https://github.com/onlook-dev/onlook)
* **¿Qué es?** Una herramienta open source de nueva generación que permite inspeccionar y editar visualmente componentes web en el navegador, escribiendo los cambios directamente en el código de tu proyecto.
* **Ventajas:** Esencialmente convierte tu código fuente en un lienzo tipo Figma/Framer.

---

### Opción 4: **GrapesJS (`GrapesJS/grapesjs`)** — *Constructor visual puro para HTML/CSS/PHP*
* **Repositorio:** [github.com/GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs)
* **¿Qué es?** El constructor visual libre más maduro y completo de la web (alternativa directa a Webflow).
* **Cómo funciona:** Se puede integrar en cualquier panel web o ejecutarse localmente. Permite diseñar y editar bloques visuales arrastrando componentes, exportando directamente HTML5 y CSS3 limpios.
* **Ventajas:**
  - No requiere Node.js en el servidor de producción; se puede montar directamente sobre **SiteGround en PHP**.
  - Permite crear plantillas a medida que el cliente edita visualmente.

---

### Opción 5: **Plasmic (`plasmicapp/plasmic`)** — *Visual Studio para React y Sitios Web*
* **Repositorio:** [github.com/plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)
* **¿Qué es?** Un editor visual potente con versión open source que se integra con cualquier framework frontend.
* **Ventajas:** Diseñas en un lienzo similar a Figma/Framer y publica a tu propio servidor o genera código limpio sin atarte a su hosting.

---

### Opción 6: **Statamic CMS** — *La mejor alternativa a WordPress para SiteGround*
* **Web / GitHub:** [statamic.com](https://statamic.com) / [github.com/statamic/cms](https://github.com/statamic/cms)
* **¿Qué es?** Un CMS moderno de archivos planos (*Flat-file*) basado en PHP/Laravel.
* **Por qué es relevante:** **Funciona de forma nativa en el hosting de SiteGround** (ya que corre sobre PHP), pero **no usa base de datos MySQL** (todo se guarda en archivos Markdown/YAML).
* **Ventajas:**
  - Panel de control en español, visual y moderno con vista previa en vivo en pantalla dividida (*Live Preview*).
  - Carga en menos de 150 ms (hasta 5 veces más rápido que WordPress con Elementor).
  - Cero hackeos por inyección SQL, cero plugins conflictivos.
  - La versión para un sitio web es gratuita.

---

## 3. Matriz Comparativa: Alternativas Open Source vs. Framer vs. WordPress

| Solución | Costo | Dónde se Aloja | Facilidad de Edición para el Cliente | Velocidad de Carga | Complejidad de Configuración |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Framer** | $15–$30/mes | Servidores de Framer | ⭐⭐⭐⭐⭐ (Visual directo) | ⭐⭐⭐⭐⭐ (95+) | Muy baja |
| **Puck (`measuredco/puck`)** | **$0 (Open Source)** | Vercel, Node o Docker | ⭐⭐⭐⭐⭐ (Drag & drop visual) | ⭐⭐⭐⭐⭐ (95+) | Media |
| **TinaCMS** | **$0 (Open Source)** | SiteGround o Cloudflare + Git | ⭐⭐⭐⭐⭐ (Edición en la página) | ⭐⭐⭐⭐⭐ (98+) | Media |
| **Statamic CMS** | **$0 (Para 1 sitio)** | **SiteGround (PHP nativo)** | ⭐⭐⭐⭐ (Live Preview en panel) | ⭐⭐⭐⭐⭐ (92+) | Media-Baja |
| **WordPress Limpio (Bloques)** | **$0** | **SiteGround (PHP/MySQL)** | ⭐⭐⭐ (Gutenberg nativo) | ⭐⭐⭐⭐ (85+) | Baja |
| **WordPress + Elementor** | $0 a $50/año | SiteGround | ⭐⭐⭐ (Lento y pesado) | ⭐⭐ (40-60) | Muy baja (actual) |

---

## 4. Recomendación Estratégica Adaptada a WebServi.Net

Tomando en cuenta la experiencia exitosa en **WIP Bolivia** y los requerimientos de **WebServi.Net**:

1. **Ruta Óptima sin Costos Recurrentes (Recomendada):**
   - **Frontend:** Estructura modular en HTML5/CSS3 moderno con los tokens y componentes de alta gama (*Double-Bezel*, *Bento Grid*, simulador IoT) ya desarrollados en el prototipo.
   - **Capa de Edición para el Cliente:**
     - Si se aloja en **SiteGround**: Utilizar **TinaCMS** o **Statamic**. Permite que el equipo edite textos, fotos y especificaciones en un panel visual con previsualización en vivo, sin depender de los 5 plugins lentos de Elementor y con costo de $0 mensuales.
2. **Ruta con Constructor Visual Reactivo:**
   - Montar la web con **Astro / Next.js + Puck (`measuredco/puck`)**, permitiendo que el propietario arme y edite landing pages y fichas de soluciones arrastrando bloques como en Framer, pero en su propio código abierto.
3. **Ruta Inmediata de Menor Esfuerzo en SiteGround:**
   - Si se decide continuar en WordPress para no cambiar de plataforma de administración, aplicar la arquitectura de diseño de este prototipo reemplazando Elementor por **Bloques Limpios (Gutenberg / Spectra)**.
