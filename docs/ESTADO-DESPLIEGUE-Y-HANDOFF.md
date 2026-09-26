# Estado del Despliegue en Producción y Handoff Multiagente
Fecha: 25 de septiembre de 2026  
Agente actual: Antigravity  
Destinatarios: Propietario de WebServi.Net y futuros agentes colaboradores (Codex, Claude, Gemini, ChatGPT)

---

## 1. Resumen de la Situación Actual

El proyecto ha completado con éxito la fase de **diseño, modernización y puesta en producción**:
* **Web corporativa en vivo:** [https://www.webservi.net/](https://www.webservi.net/) (HTML5/CSS3/JS ultrarrápido, carga en <200ms, respuesta HTTP 200).
* **WordPress anterior preservado:** [https://www.webservi.net/tienda/](https://www.webservi.net/tienda/) (WooCommerce, base de datos, catálogo y plugins activos intactos).
* **Repositorio oficial de control de versiones:** [https://github.com/L0quillo/webservi-web.git](https://github.com/L0quillo/webservi-web.git) (rama `main`).
* **Favicon oficial activo:** Generado desde el logo cuadrado oficial (`favicon.ico` y `favicon.png` respondiendo HTTP 200).

---

## 2. Mapa de Infraestructura en Servidor (SiteGround)

La conexión SSH al servidor está plenamente comprobada:
* **Host:** `ssh.webservi.net`
* **Puerto:** `18765`
* **Usuario:** `u840-wdbn7jp9ggcb`
* **Autenticación:** Requiere clave privada ed25519 (SiteGround rechaza contraseñas directas; solo admite `publickey`).
* **Ruta raíz en servidor:** `/home/customer/www/webservi.net/public_html/`

### Organización de Carpetas en `public_html/`:
```text
/home/customer/www/webservi.net/public_html/
│
├── index.html                    <-- Portada principal de la nueva web
├── soluciones.html               <-- Catálogo de soluciones
├── solucion.html                 <-- Ficha detallada dinámica (?area=...)
├── sectores.html                 <-- Empresas, Retail, Arquitectura, Industria
├── proyectos.html                <-- Metodología y casos de ingeniería
├── empresa.html                  <-- Presentación institucional
├── contacto.html                 <-- Canales directos y formulario
├── tienda.html                   <-- Pasarela y puente a la tienda externa
├── styles.css                    <-- Sistema de diseño (Double-Bezel, Bento, Tokens)
├── app.js                        <-- Lógica interactiva (Simulador IoT, Cotizador, Filtros)
├── favicon.png / favicon.ico     <-- Iconos de pestaña oficiales de WebServi
│
├── assets/
│   └── logos/                    <-- Logos oficiales de la marca
│
├── data/
│   └── content.json              <-- Base de datos JSON de textos y soluciones
│
├── admin/                        <-- Panel administrativo actual
│   ├── index.php
│   ├── api.php
│   ├── auth.json                 <-- Hash de acceso (protegido por .htaccess)
│   └── .htaccess
│
└── tienda/                       <-- WORDPRESS ANTERIOR PRESERVADO INTACTO
    ├── wp-admin/
    ├── wp-content/               <-- Plugins, WooCommerce, Elementor
    ├── wp-includes/
    ├── wp-config.php
    └── index.php                 <-- Configurado vía WP-CLI con base /tienda/
```

---

## 3. Repositorio en GitHub y Flujo de Actualizaciones

* **Repositorio:** `https://github.com/L0quillo/webservi-web.git`
* **Rama de producción:** `main`

### Cómo publicar cambios futuros:
1. **En local:** Editar los archivos en `sitio-web-produccion/` y hacer commit:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push origin main
   ```
2. **En SiteGround (Vía SSH):** Sincronizar los cambios desde GitHub:
   ```bash
   cd /home/customer/www/webservi.net/public_html
   git pull origin main
   ```

---

## 4. Estándares de Diseño y Skills Aplicadas

El nuevo diseño fue construido siguiendo los skills de alta gama de `WIP_WEB_Diseño_y_Recursos_IA\.agents\skills`:
1. **`ui-ux-pro-max`:**
   - Tipografía: *Space Grotesk* (encabezados de ingeniería) + *Plus Jakarta Sans* (cuerpo de alta legibilidad).
   - Paleta de color: Deep Navy (`#061325`), WebServi Blue (`#0751A0`), Vibrant Orange (`#F5811F`).
   - Accesibilidad: Touch targets > 48px, `aria-expanded` en menú móvil, modo de movimiento reducido respetado.
2. **`high-end-visual-design`:**
   - **Double-Bezel:** Tarjetas con contenedor exterior y núcleo interior con radios concéntricos matemáticos `calc(radius - padding)` y relieve háptico interior.
   - **Asymmetrical Bento Grid:** Distribución asimétrica de tarjetas para jerarquía visual.
3. **`wip-bolivia`:**
   - Sinergia comprobada: WebServi IoT es el partner tecnológico de telemetría industrial de WIP Soluciones Integrales (calderas Arauterm a 10 bar, agua y filtros críticos).

---

## 5. Directiva Expresa del Propietario para la Siguiente Tarea

> **IMPORTANTE PARA EL SIGUIENTE AGENTE:**  
> El propietario ha evaluado el panel de administración actual y **no le gustó el sistema de CMS tipo formulario/campos**.  
> **Requerimiento específico:** Desarrollar un método para **editar directamente en la página web en vivo**:
> - **Opción preferida A:** *In-Page Inline Editing* (hacer clic sobre cualquier texto, título o foto de la misma web y editarlo directamente en pantalla, con un botón flotante para guardar).
> - **Opción alternativa B:** Un constructor visual de arrastrar y soltar componentes sobre un lienzo (*Visual Canvas Drag-and-Drop* como GrapesJS o Puck).

---

## 6. Reglas de Seguridad y No Destrucción

* **NO eliminar ni sobrescribir `/public_html/tienda/`:** Es el respaldo vivo del WordPress anterior.
* **NO incluir contraseñas, claves privadas ni secretos en archivos compartidos, commits ni documentación.**
* **Conservar siempre la integridad de las rutas relativas en producción.**
