/**
 * WebServi.Net — Prototipo Interactivo de Rediseño B2B
 * Actualizado con diseño moderno, componentes interactivos y alta estética ejecutiva.
 */

const solutionData = {
  infraestructura: {
    category: 'redes',
    title: 'Infraestructura & Conectividad',
    shortTitle: 'Redes y Cableado',
    lead: 'Redes empresariales, fibra óptica y enlaces inalámbricos diseñados para operar sin interrupciones.',
    blurb: 'Cableado estructurado Cat 6A / Fibra, switches PoE, routers empresariales, Wi-Fi de alta densidad y telefonía IP.',
    need: 'Conectar estaciones de trabajo, cámaras y servidores con latencia mínima, orden físico y escalabilidad.',
    parts: [
      'Cableado estructurado en cobre (Cat 6A) y fibra óptica monomodo/multimodo',
      'Equipamiento activo: Routers, switches administrables PoE y puntos de acceso Wi-Fi 6',
      'Enlaces inalámbricos punto a punto y multipunto de largo alcance',
      'Telefonía IP empresarial y comunicaciones unificadas'
    ],
    audience: 'Empresas, edificios corporativos, almacenes y entidades educativas.',
    icon: '⚡',
    code: '01'
  },
  seguridad: {
    category: 'seguridad',
    title: 'Seguridad Electrónica & Control de Acceso',
    shortTitle: 'Seguridad y Accesos',
    lead: 'Visibilidad total, videovigilancia inteligente y control de áreas restringidas en una sola plataforma.',
    blurb: 'CCTV IP de alta definición, analítica de video, biometría, torniquetes y sistemas de alarma integrados.',
    need: 'Proteger activos, registrar eventos con precisión forense y autorizar accesos sin cuellos de botella.',
    parts: [
      'Cámaras de videovigilancia IP con analítica y visión nocturna avanzada',
      'Control de acceso peatonal y vehicular (biometría, tarjetas RFID, reconocimiento facial)',
      'Sistemas de intrusión, sensores de presencia y alarmas monitoreadas',
      'Integración con infraestructura de red y monitoreo centralizado'
    ],
    audience: 'Comercios, plantas industriales, condominios y centros de distribución.',
    icon: '🛡️',
    code: '02'
  },
  espacios: {
    category: 'espacios',
    title: 'Espacios & Iluminación Inteligente',
    shortTitle: 'Iluminación y Domótica',
    lead: 'Diseño lumínico avanzado y automatización de escenas para retail, oficinas y arquitectura.',
    blurb: 'Control de escenas DALI/0-10V, automatización de cortinas, sensores de ocupación y ahorro energético.',
    need: 'Crear experiencias visuales que potencien la exhibición comercial y optimicen el confort y consumo eléctrico.',
    parts: [
      'Sistemas de iluminación avanzada y acentuación para tiendas y vitrinas',
      'Control centralizado de escenas lumínicas, horarios y atenuación',
      'Domótica e inmótica para salas de reuniones, oficinas y espacios corporativos',
      'Sensores de presencia y aprovechamiento de luz natural para eficiencia energética'
    ],
    audience: 'Arquitectos, directores de retail, diseñadores de interiores y administradores de edificios.',
    icon: '💡',
    code: '03'
  },
  iot: {
    category: 'iot',
    title: 'IoT & Monitoreo Industrial',
    shortTitle: 'Telemetría Industrial',
    lead: 'Del sensor de campo a la pantalla de control: telemetría en tiempo real para variables críticas de proceso.',
    blurb: 'Medición de presión, temperatura, caudal, nivel, pH/ORP, conductividad con conectividad LoRaWAN y tableros Cloud.',
    need: 'Eliminar tomas de datos manuales y detectar anomalías tempranas en calderas, agua y energía antes de una falla.',
    parts: [
      'Instrumentación industrial para presión, temperatura, caudal, pH y conductividad',
      'Gateways y nodos LoRaWAN de largo alcance para entornos industriales agresivos',
      'Dashboards en la nube con tendencias históricas, KPIs y gráficos en tiempo real',
      'Alertas automáticas vía WhatsApp/Email para mantenimiento preventivo'
    ],
    audience: 'Jefes de planta, directores de operaciones, mantenimiento e ingeniería química/alimentos.',
    icon: '📊',
    code: '04'
  },
  servicios: {
    category: 'servicios',
    title: 'Ingeniería, Instalación & Soporte',
    shortTitle: 'Servicios Profesionales',
    lead: 'Acompañamiento especializado desde el levantamiento técnico hasta la certificación y mantenimiento.',
    blurb: 'Diagnóstico en sitio, diseño de planos, instalación certificada, capacitación y tercerización técnica.',
    need: 'Tener un socio de ingeniería confiable que resuelva la complejidad técnica de punta a punta.',
    parts: [
      'Levantamiento técnico de campo y memoria de cálculo',
      'Instalación ejecutada con normativas técnicas de cableado y seguridad',
      'Certificación de enlaces de red y puesta en marcha de sistemas',
      'Pólizas de mantenimiento preventivo y soporte post-instalación'
    ],
    audience: 'Departamentos de TI, contratistas generales y gerencias operativas.',
    icon: '⚙️',
    code: '05'
  }
};

const sectorsData = [
  {
    id: 'empresas',
    name: 'Empresas & Oficinas',
    icon: '🏢',
    summary: 'Infraestructura de comunicación robusta y accesos ágiles para el personal.',
    headline: 'Conectividad estable y espacios de trabajo seguros',
    description: 'Diseñamos redes corporativas con redundancia para evitar caídas de internet, telefonía IP integrada para atención a clientes y control de asistencia con biometría sin fricciones.',
    highlights: ['Wi-Fi 6 de alta densidad para salas de reuniones', 'Cableado Cat 6A certificado', 'Control de acceso para áreas restringidas'],
    relatedKeys: ['infraestructura', 'seguridad']
  },
  {
    id: 'retail',
    name: 'Comercio & Retail',
    icon: '🛍️',
    summary: 'Iluminación que vende y videovigilancia que protege la mercadería.',
    headline: 'Experiencia visual cautivadora y prevención de pérdidas',
    description: 'En el retail, la luz define el deseo de compra. Integramos iluminación de acento comercial con escenas programadas, junto a CCTV IP con conteo de personas y control perimetral.',
    highlights: ['Iluminación avanzada para vitrinas y áreas de exhibición', 'Cámaras con mapa de calor y conteo de clientes', 'Sonido ambiental y control de apertura de accesos'],
    relatedKeys: ['espacios', 'seguridad']
  },
  {
    id: 'arquitectura',
    name: 'Arquitectura & Edificios',
    icon: '📐',
    summary: 'Tecnología integrada desde el plano, sin canaletas visibles ni parches.',
    headline: 'Coordinación tecnológica desde la etapa de diseño de obra',
    description: 'Trabajamos mano a mano con arquitectos y constructoras para prever ductos, iluminación arquitectónica DALI, control de accesos vehiculares y salas de telecomunicaciones sin improvisaciones.',
    highlights: ['Automatización e inmótica centralizada', 'Diseño lumínico eficiente y estético', 'Previsión de racks y cableado estructurado'],
    relatedKeys: ['espacios', 'infraestructura']
  },
  {
    id: 'industria',
    name: 'Industria & Plantas',
    icon: '🏭',
    summary: 'Monitoreo de procesos térmicos, hidráulicos y consumo energético.',
    headline: 'Supervisión en tiempo real para evitar paradas no programadas',
    description: 'Integramos sensores de presión de vapor, caudal de agua y temperatura con comunicación LoRaWAN de gran alcance para supervisar plantas sin tender kilómetros de cables.',
    highlights: ['Telemetría de calderas, vapor y agua de proceso', 'Históricos y alertas de temperatura crítica', 'Protecciones de seguridad independientes y cableadas'],
    relatedKeys: ['iot', 'servicios']
  }
];

const page = document.body.dataset.page || 'home';

function renderLayout(contentHtml) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = [
    { label: 'Inicio', href: 'index.html' },
    { label: 'Soluciones', href: 'soluciones.html' },
    { label: 'Sectores', href: 'sectores.html' },
    { label: 'Proyectos', href: 'proyectos.html' },
    { label: 'Empresa', href: 'empresa.html' },
    { label: 'Contacto', href: 'contacto.html' }
  ];

  const navLinksHtml = navItems.map(item => {
    const isActive = currentPath === item.href || (item.href === 'index.html' && (currentPath === '' || currentPath === 'index.html'));
    return `<a class="nav-link ${isActive ? 'active' : ''}" href="${item.href}">${item.label}</a>`;
  }).join('');

  document.body.innerHTML = `
    <a class="sr-skip" href="#main-content">Saltar al contenido principal</a>
    
    <div class="top-notice">
      <div class="wrap">
        <div><strong>WebServi.Net:</strong> Infraestructura, Seguridad, Espacios Inteligentes & IoT Industrial</div>
        <div>
          <span>WhatsApp directo: <a href="https://wa.me/59175020555" target="_blank" rel="noopener">+591 750 20555</a></span>
          <span style="margin-left: 14px;">|</span>
          <span style="margin-left: 14px;"><a href="tienda.html">Tienda de Equipos ↗</a></span>
        </div>
      </div>
    </div>

    <header class="site-header">
      <div class="wrap site-nav">
        <a class="brand-link" href="index.html" aria-label="WebServi.Net - Inicio">
          <img class="brand-logo" src="assets/logos/LOGO GRANDE WEBSERVI.png" alt="WebServi.Net" onerror="this.src='assets/logos/v2-logo.png'">
        </a>

        <nav class="nav-links" id="primary-nav" aria-label="Navegación principal">
          ${navLinksHtml}
          <a class="nav-store-badge" href="tienda.html">
            <span>Tienda Equipos</span>
            <span>↗</span>
          </a>
          <a class="btn-nav-cta" href="contacto.html">Cotizar Proyecto</a>
        </nav>

        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="primary-nav">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>

    <main id="main-content">
      ${contentHtml}
    </main>

    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>WebServi.Net</h3>
            <p>Ingeniería e integración tecnológica para empresas, espacios comerciales e industria. Conectamos infraestructura física, automatización y telemetría en una sola solución.</p>
          </div>
          <div class="footer-col">
            <h4>Soluciones</h4>
            <ul class="footer-links">
              <li><a href="solucion.html?area=infraestructura">Redes y Conectividad</a></li>
              <li><a href="solucion.html?area=seguridad">Seguridad & CCTV</a></li>
              <li><a href="solucion.html?area=espacios">Iluminación Inteligente</a></li>
              <li><a href="solucion.html?area=iot">Monitoreo IoT Industrial</a></li>
              <li><a href="solucion.html?area=servicios">Ingeniería & Soporte</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Sectores</h4>
            <ul class="footer-links">
              <li><a href="sectores.html">Empresas & Oficinas</a></li>
              <li><a href="sectores.html">Comercio & Retail</a></li>
              <li><a href="sectores.html">Arquitectura & Edificios</a></li>
              <li><a href="sectores.html">Industria & Plantas</a></li>
              <li><a href="tienda.html">Tienda Externa ↗</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto Inmediato</h4>
            <ul class="footer-links">
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/59175020555" target="_blank">+591 750 20555</a></li>
              <li><strong>Email:</strong> <a href="mailto:info@webservi.net">info@webservi.net</a></li>
              <li><strong>Atención:</strong> Proyectos a medida en todo el país</li>
            </ul>
            <div style="margin-top: 20px;">
              <a class="btn btn-accent" style="padding: 8px 18px; font-size: 0.85rem;" href="contacto.html">Hablemos de su Proyecto</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2026 WebServi.Net — Prototipo interactivo de rediseño y alta conversión B2B.</div>
          <div>Igual protagonismo: Servicios de Integración & Catálogo de Equipos</div>
        </div>
      </div>
    </footer>
  `;

  // Mobile menu interaction
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('primary-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open');
    });
  }
}

// Interactive helper: Card generator
function renderSolutionCard(key) {
  const sol = solutionData[key];
  if (!sol) return '';
  return `
    <article class="solution-card" data-category="${sol.category}">
      <div class="card-icon-wrap" aria-hidden="true">${sol.icon}</div>
      <div class="eyebrow" style="margin-bottom: 6px;">Solución ${sol.code}</div>
      <h3>${sol.title}</h3>
      <p>${sol.blurb}</p>
      <ul class="solution-features">
        ${sol.parts.slice(0, 3).map(p => `<li>${p}</li>`).join('')}
      </ul>
      <a class="card-link" href="solucion.html?area=${key}">
        <span>Conocer alcance técnico</span>
        <span>→</span>
      </a>
    </article>
  `;
}

// -------------------------------------------------------------
// PAGE ROUTING & VIEWS
// -------------------------------------------------------------

if (page === 'home') {
  document.title = 'WebServi.Net — Soluciones Tecnológicas & Equipos B2B';

  const html = `
    <!-- HERO SECTION -->
    <section class="hero-executive">
      <div class="wrap hero-grid">
        <div class="hero-content">
          <div class="eyebrow eyebrow-pill">Ingeniería & Integración B2B</div>
          <h1>Tecnología que <span class="gradient-word">trabaja en conjunto</span> para su empresa.</h1>
          <p class="hero-lead">Diseñamos e integramos infraestructura de redes, seguridad electrónica, iluminación comercial y monitoreo IoT industrial para que su operación nunca se detenga.</p>
          <div class="btn-group">
            <a class="btn btn-primary" href="soluciones.html">Explorar Soluciones</a>
            <a class="btn btn-accent" href="tienda.html">Catálogo de Equipos ↗</a>
          </div>
        </div>

        <!-- HERO INTERACTIVE TELEMETRY & SYSTEM SHOWCASE -->
        <div class="hero-card-showcase">
          <div class="showcase-header">
            <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">Ecosistema WebServi en Operación</div>
            <div class="showcase-status">
              <span class="status-dot"></span>
              <span>Sistemas en Línea</span>
            </div>
          </div>
          
          <div class="telemetry-metrics">
            <div class="metric-box">
              <div class="label">Disponibilidad de Red</div>
              <div class="val">99.98%</div>
              <div class="sub">▲ Enlaces Gigabit Activos</div>
            </div>
            <div class="metric-box">
              <div class="label">Telemetría IoT (Calderas)</div>
              <div class="val" id="heroTempSim">8.2 bar</div>
              <div class="sub">▲ Presión Normalizada</div>
            </div>
            <div class="metric-box">
              <div class="label">CCTV & Control Acceso</div>
              <div class="val">24 / 7</div>
              <div class="sub">● 100% Zonas Seguras</div>
            </div>
            <div class="metric-box">
              <div class="label">Eficiencia Lumínica</div>
              <div class="val">-35%</div>
              <div class="sub">▼ Ahorro por Escenas DALI</div>
            </div>
          </div>

          <div class="showcase-badge-bar">
            <span class="badge-pill">Redes Cat 6A / Fibra</span>
            <span class="badge-pill">LoRaWAN Industrial</span>
            <span class="badge-pill">CCTV IP 4K</span>
            <span class="badge-pill">Control Lumínico</span>
          </div>
        </div>
      </div>
    </section>

    <!-- DUAL GATEWAY (EQUAL PROTAGONISM: SERVICES & STORE) -->
    <div class="wrap">
      <div class="dual-gateway">
        <div class="gateway-card solution">
          <div>
            <div class="gateway-tag">Ruta 01 · Proyectos Integrales</div>
            <h3>Necesito una Solución de Ingeniería</h3>
            <p>Para empresas, edificios o industrias que requieren asesoría, diseño técnico, instalación certificada y soporte continuo.</p>
          </div>
          <a class="gateway-action" href="soluciones.html">Ver áreas de solución integradas →</a>
        </div>

        <div class="gateway-card store">
          <div>
            <div class="gateway-tag">Ruta 02 · Equipamiento Directo</div>
            <h3>Busco Equipos & Dispositivos</h3>
            <p>Acceda a nuestro catálogo especializado de equipos de redes, cámaras, sensores y suministros tecnológicos.</p>
          </div>
          <a class="gateway-action" href="tienda.html">Explorar catálogo en la tienda externa ↗</a>
        </div>
      </div>
    </div>

    <!-- SOLUTIONS SECTION WITH INTERACTIVE FILTER TABS -->
    <section class="section section-soft" id="soluciones">
      <div class="wrap">
        <div class="section-head center-head">
          <div class="eyebrow eyebrow-blue">Áreas de Especialidad</div>
          <h2>Ingeniería integrada en 5 familias clave.</h2>
          <p>Superamos el enfoque de piezas aisladas: cada componente se diseña para comunicarse y respaldar la operación general.</p>
        </div>

        <div class="filter-bar" style="justify-content: center;" id="solutionFilterBar">
          <button class="filter-btn active" data-filter="todos">Todas las Soluciones</button>
          <button class="filter-btn" data-filter="redes">Redes & Fibra</button>
          <button class="filter-btn" data-filter="seguridad">Seguridad & CCTV</button>
          <button class="filter-btn" data-filter="espacios">Iluminación & Espacios</button>
          <button class="filter-btn" data-filter="iot">IoT Industrial</button>
          <button class="filter-btn" data-filter="servicios">Servicios Técnicos</button>
        </div>

        <div class="solutions-grid" id="solutionsContainer">
          ${renderSolutionCard('infraestructura')}
          ${renderSolutionCard('seguridad')}
          ${renderSolutionCard('espacios')}
          ${renderSolutionCard('iot')}
          ${renderSolutionCard('servicios')}
        </div>
      </div>
    </section>

    <!-- INTERACTIVE SECTORS SECTION -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div class="eyebrow eyebrow-pill">Adaptado al Entorno</div>
          <h2>Tecnología configurada según su sector específico.</h2>
          <p>Un gerente general, un arquitecto y un jefe de planta buscan resultados distintos. Seleccione su entorno para ver el enfoque.</p>
        </div>

        <div class="sector-interactive">
          <div class="sector-nav-tabs" id="sectorTabs">
            ${sectorsData.map((sec, idx) => `
              <div class="sector-tab ${idx === 0 ? 'active' : ''}" data-sector="${sec.id}">
                <h4>${sec.icon} ${sec.name}</h4>
                <p>${sec.summary}</p>
              </div>
            `).join('')}
          </div>

          <div class="sector-detail-panel" id="sectorPanel">
            <!-- Dynamically populated via JS -->
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE IOT INDUSTRIAL PIPELINE SIMULATOR -->
    <section class="section section-dark">
      <div class="wrap">
        <div class="section-head">
          <div class="eyebrow">Monitoreo Industrial & Telemetría</div>
          <h2>Del sensor al dato. Del dato a la decisión.</h2>
          <p>Hacemos visibles las variables que impactan el costo y la seguridad de su planta. Haga clic en cada fase para explorar el flujo.</p>
        </div>

        <div class="iot-pipeline" id="iotPipeline">
          <div class="iot-step-card active" data-step="1">
            <div class="step-num">FASE 01</div>
            <h4>Sensores de Campo</h4>
            <p>Presión de vapor, temperatura, caudalímetros, pH/ORP y conductividad en puntos clave.</p>
          </div>
          <div class="iot-step-card" data-step="2">
            <div class="step-num">FASE 02</div>
            <h4>Conectividad LoRaWAN</h4>
            <p>Transmisión inalámbrica de kilómetros, sin interferencias ni cableado costoso.</p>
          </div>
          <div class="iot-step-card" data-step="3">
            <div class="step-num">FASE 03</div>
            <h4>Dashboard en Tiempo Real</h4>
            <p>Gráficos de tendencias, comparación de consumos y registro histórico de variables.</p>
          </div>
          <div class="iot-step-card" data-step="4">
            <div class="step-num">FASE 04</div>
            <h4>Alertas Preventivas</h4>
            <p>Avisos automáticos a supervisores antes de que se produzca una parada imprevista.</p>
          </div>
        </div>

        <div class="iot-live-monitor" id="iotMonitorDisplay">
          <div>
            <div style="color: var(--orange-500); font-size: 0.8rem; font-weight: 800; text-transform: uppercase;">Estado de Simulación en Vivo</div>
            <h3 style="color: #fff; margin-top: 4px;" id="iotMonitorTitle">Fase 1: Adquisición de Señales Industriales</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 600px; margin-top: 6px;" id="iotMonitorDesc">
              Los sensores capturan lecturas analógicas continuas. Las protecciones críticas y enclavamientos se mantienen siempre cableados e independientes por seguridad de planta.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 20px;">
            <div>
              <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase;">Lectura Actual</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #fff; font-family: var(--font-heading);" id="iotMonitorValue">8.4 bar · 142°C</div>
            </div>
            <div class="monitor-graph-sim">
              <div class="graph-bar" style="height: 35px;"></div>
              <div class="graph-bar" style="height: 48px;"></div>
              <div class="graph-bar" style="height: 28px;"></div>
              <div class="graph-bar" style="height: 42px;"></div>
              <div class="graph-bar" style="height: 50px;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE PROJECT INQUIRY BUILDER -->
    <section class="section section-soft">
      <div class="wrap">
        <div class="section-head center-head">
          <div class="eyebrow eyebrow-pill">Configurador Rápido</div>
          <h2>¿Qué tecnologías necesita coordinar en su proyecto?</h2>
          <p>Seleccione las áreas de interés para calcular el alcance y contactar directamente a nuestros ingenieros con un resumen preparado.</p>
        </div>

        <div class="inquiry-builder-card">
          <h3 style="margin-bottom: 8px;">Seleccione las disciplinas requeridas:</h3>
          <p style="color: var(--slate-600); font-size: 0.95rem;">Marque las áreas para pre-armar su consulta técnica:</p>

          <div class="check-options-grid" id="inquiryOptions">
            <label class="check-option selected">
              <input type="checkbox" checked value="Cableado y Redes">
              <span>Redes & Cableado Cat 6A / Fibra</span>
            </label>
            <label class="check-option">
              <input type="checkbox" value="CCTV y Control de Acceso">
              <span>Videovigilancia & Control de Acceso</span>
            </label>
            <label class="check-option">
              <input type="checkbox" value="Iluminación Comercial y Escenas">
              <span>Iluminación Avanzada & Domótica</span>
            </label>
            <label class="check-option">
              <input type="checkbox" value="Monitoreo IoT Industrial">
              <span>Monitoreo & Telemetría IoT</span>
            </label>
            <label class="check-option">
              <input type="checkbox" value="Soporte y Mantenimiento">
              <span>Instalación Certificada & Soporte</span>
            </label>
            <label class="check-option">
              <input type="checkbox" value="Suministro de Equipos">
              <span>Cotización de Equipos / Tienda</span>
            </label>
          </div>

          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--blue-600); text-transform: uppercase;">Resumen de su requerimiento:</div>
              <div id="selectedSummary" style="font-weight: 600; color: var(--navy-900); font-size: 1rem; margin-top: 4px;">
                1 disciplina seleccionada
              </div>
            </div>
            <div class="btn-group">
              <a class="btn btn-primary" id="btnSendWhatsApp" href="#" target="_blank" rel="noopener">
                <span>Contactar por WhatsApp</span>
                <span>↗</span>
              </a>
              <a class="btn btn-outline-dark" id="btnSendEmail" href="#">
                <span>Enviar por Correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <div class="wrap">
      <div class="cta-banner">
        <div class="wrap">
          <div>
            <h2>¿Listo para integrar la tecnología de su espacio?</h2>
            <p>Conversemos sobre su plano, necesidad operativa o requerimiento de equipamiento.</p>
          </div>
          <div class="btn-group">
            <a class="btn btn-outline-white" href="contacto.html">Agendar Asesoría</a>
            <a class="btn btn-primary" href="tienda.html" style="background: #fff; color: var(--navy-900);">Visitar Tienda ↗</a>
          </div>
        </div>
      </div>
    </div>
  `;

  renderLayout(html);

  // Filter Solutions interactivity
  const filterBtns = document.querySelectorAll('#solutionFilterBar .filter-btn');
  const cards = document.querySelectorAll('.solution-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (cat === 'todos' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Sector Switcher interactivity
  const sectorTabs = document.querySelectorAll('#sectorTabs .sector-tab');
  const sectorPanel = document.getElementById('sectorPanel');

  function updateSectorPanel(secId) {
    const sec = sectorsData.find(s => s.id === secId) || sectorsData[0];
    sectorPanel.innerHTML = `
      <div>
        <div class="eyebrow eyebrow-blue">${sec.icon} Sector: ${sec.name}</div>
        <h3>${sec.headline}</h3>
        <p class="lead-p">${sec.description}</p>
        
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--navy-900); margin-bottom: 10px;">Capacidades clave para este entorno:</div>
        <ul style="list-style: none; margin-bottom: 24px;">
          ${sec.highlights.map(h => `<li style="margin-bottom: 8px; font-size: 0.92rem; display: flex; align-items: center; gap: 8px;"><span style="color: var(--orange-500); font-weight: 800;">✓</span> ${h}</li>`).join('')}
        </ul>
      </div>

      <div>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--slate-500); text-transform: uppercase; margin-bottom: 10px;">Soluciones vinculadas:</div>
        <div class="sector-solutions-chips">
          ${sec.relatedKeys.map(k => `<a class="solution-chip" href="solucion.html?area=${k}">${solutionData[k].shortTitle} →</a>`).join('')}
        </div>
        <a class="btn btn-primary" href="contacto.html" style="font-size: 0.9rem; padding: 10px 22px;">Consultar para ${sec.name}</a>
      </div>
    `;
  }

  sectorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sectorTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateSectorPanel(tab.getAttribute('data-sector'));
    });
  });
  updateSectorPanel('empresas');

  // IoT Pipeline Interactive Simulator
  const pipelineSteps = document.querySelectorAll('#iotPipeline .iot-step-card');
  const monitorTitle = document.getElementById('iotMonitorTitle');
  const monitorDesc = document.getElementById('iotMonitorDesc');
  const monitorVal = document.getElementById('iotMonitorValue');

  const stepDetails = {
    '1': {
      title: 'Fase 1: Adquisición de Señales Industriales',
      desc: 'Transmisores de presión 4-20mA, sondas PT100/termorestencias y caudalímetros electromagnéticos en líneas críticas.',
      val: '8.4 bar · 142°C'
    },
    '2': {
      title: 'Fase 2: Conectividad Robusta LoRaWAN',
      desc: 'Transmisión cifrada de largo alcance (hasta 10 km) con gateways grado IP67 resistentes a polvo y humedad.',
      val: 'RSSI: -82 dBm · SNR: +9dB'
    },
    '3': {
      title: 'Fase 3: Visualización & Dashboards Cloud',
      desc: 'Plataforma web con tableros interactivos de supervisión continua, curvas de tendencia histórica y cálculo de consumos.',
      val: '1,420 m³/h · 98.4% Disponibilidad'
    },
    '4': {
      title: 'Fase 4: Alertas Preventivas y Notificaciones',
      desc: 'Reglas automáticas de aviso ante desviación de umbrales críticos para evitar pérdidas de producción.',
      val: '0 Paradas no planificadas'
    }
  };

  pipelineSteps.forEach(card => {
    card.addEventListener('click', () => {
      pipelineSteps.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const step = card.getAttribute('data-step');
      const data = stepDetails[step];
      if (data) {
        monitorTitle.textContent = data.title;
        monitorDesc.textContent = data.desc;
        monitorVal.textContent = data.val;
      }
    });
  });

  // Inquiry Builder Logic
  const checkOptions = document.querySelectorAll('#inquiryOptions .check-option');
  const selectedSummary = document.getElementById('selectedSummary');
  const btnWhatsApp = document.getElementById('btnSendWhatsApp');
  const btnEmail = document.getElementById('btnSendEmail');

  function updateInquiry() {
    const selected = [];
    checkOptions.forEach(opt => {
      const input = opt.querySelector('input');
      if (input.checked) {
        opt.classList.add('selected');
        selected.push(input.value);
      } else {
        opt.classList.remove('selected');
      }
    });

    if (selected.length === 0) {
      selectedSummary.textContent = 'Ninguna disciplina seleccionada (seleccione al menos una)';
      btnWhatsApp.href = 'https://wa.me/59175020555?text=' + encodeURIComponent('Hola WebServi.Net, deseo solicitar información sobre sus servicios.');
      btnEmail.href = 'mailto:info@webservi.net?subject=Consulta general';
    } else {
      selectedSummary.textContent = `${selected.length} disciplina(s) seleccionada(s): ${selected.join(', ')}`;
      const message = `Hola WebServi.Net, me interesa solicitar asesoría/cotización para las siguientes soluciones: ${selected.join(', ')}. ¿Podrían indicarme los pasos a seguir?`;
      btnWhatsApp.href = `https://wa.me/59175020555?text=${encodeURIComponent(message)}`;
      btnEmail.href = `mailto:info@webservi.net?subject=${encodeURIComponent('Cotización de Proyecto: ' + selected.slice(0, 2).join(' + '))}&body=${encodeURIComponent(message)}`;
    }
  }

  checkOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const input = opt.querySelector('input');
        input.checked = !input.checked;
      }
      updateInquiry();
    });
  });
  updateInquiry();

  // Subtle live number fluctuation for the hero demo
  setInterval(() => {
    const tempSim = document.getElementById('heroTempSim');
    if (tempSim) {
      const val = (8.1 + Math.random() * 0.3).toFixed(1);
      tempSim.textContent = `${val} bar`;
    }
  }, 4000);
}

// -------------------------------------------------------------
// DETAIL PAGE (solucion.html?area=...)
// -------------------------------------------------------------
else if (page === 'detail') {
  const params = new URLSearchParams(window.location.search);
  const areaKey = params.get('area') || 'infraestructura';
  const sol = solutionData[areaKey] || solutionData.infraestructura;

  document.title = `${sol.title} — WebServi.Net`;

  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Solución Especializada / ${sol.code}</div>
        <h1>${sol.title}</h1>
        <p>${sol.lead}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: center;">
          <div>
            <div class="eyebrow eyebrow-blue">El Reto Operativo</div>
            <h2>Resolver el problema de fondo antes de instalar cualquier equipo.</h2>
            <p style="font-size: 1.1rem; color: var(--slate-600); margin: 18px 0 28px;">
              ${sol.need}
            </p>
            <div class="btn-group">
              <a class="btn btn-primary" href="https://wa.me/59175020555?text=${encodeURIComponent('Hola WebServi.Net, me interesa una cotización de ' + sol.title)}" target="_blank">
                <span>Solicitar Asesoría por WhatsApp</span>
                <span>↗</span>
              </a>
              <a class="btn btn-outline-dark" href="contacto.html">Formulario de Contacto</a>
            </div>
          </div>

          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-md);">
            <h4 style="margin-bottom: 14px;">Entornos de Aplicación:</h4>
            <p style="color: var(--slate-600); margin-bottom: 24px;">${sol.audience}</p>
            
            <div style="border-top: 1px solid var(--slate-200); padding-top: 18px;">
              <h4 style="margin-bottom: 8px;">Equipamiento Directo</h4>
              <p style="font-size: 0.9rem; color: var(--slate-500); margin-bottom: 14px;">
                ¿Busca adquirir hardware para esta categoría sin instalación?
              </p>
              <a class="btn btn-accent" style="padding: 8px 18px; font-size: 0.85rem;" href="tienda.html">Ver equipos en la Tienda ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="wrap">
        <div class="section-head center-head">
          <div class="eyebrow eyebrow-pill">Alcance de Integración</div>
          <h2>Qué incluye e integra esta solución.</h2>
          <p>Componentes y subsistemas coordinados bajo estándares técnicos de la industria.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          ${sol.parts.map((p, idx) => `
            <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--blue-600); margin-bottom: 8px;">COMPONENTE 0${idx+1}</div>
              <h4 style="font-size: 1.15rem; margin-bottom: 8px;">${p}</h4>
              <p style="font-size: 0.88rem; color: var(--slate-500);">Dimensionado según la infraestructura física y los requerimientos del cliente.</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div class="wrap" style="padding-bottom: 80px;">
      <div class="cta-banner">
        <div class="wrap">
          <div>
            <h2>¿Tiene un requerimiento en ${sol.shortTitle}?</h2>
            <p>Nuestros ingenieros analizan su necesidad y le presentan una propuesta técnica estructurada.</p>
          </div>
          <div class="btn-group">
            <a class="btn btn-outline-white" href="contacto.html">Contactar Ingeniero</a>
            <a class="btn btn-primary" href="soluciones.html" style="background: #fff; color: var(--navy-900);">Ver Otras Soluciones</a>
          </div>
        </div>
      </div>
    </div>
  `;

  renderLayout(html);
}

// -------------------------------------------------------------
// SOLUCIONES INDEX
// -------------------------------------------------------------
else if (page === 'solutions') {
  document.title = 'Soluciones de Integración — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Portafolio de Soluciones</div>
        <h1>Arquitectura integral, <span style="color: var(--orange-500);">no piezas sueltas.</span></h1>
        <p>Una oferta técnica estructurada para resolver conectividad, seguridad, espacios y monitoreo en un solo proyecto coordinado.</p>
      </div>
    </section>

    <section class="section section-soft">
      <div class="wrap">
        <div class="solutions-grid">
          ${Object.keys(solutionData).map(renderSolutionCard).join('')}
        </div>
      </div>
    </section>

    <div class="wrap" style="padding-bottom: 80px;">
      <div class="cta-banner">
        <div class="wrap">
          <div>
            <h2>¿No está seguro de qué disciplinas necesita?</h2>
            <p>Realizamos un levantamiento técnico preliminar para definir la mejor arquitectura.</p>
          </div>
          <a class="btn btn-outline-white" href="contacto.html">Solicitar Asesoría</a>
        </div>
      </div>
    </div>
  `;
  renderLayout(html);
}

// -------------------------------------------------------------
// SECTORES
// -------------------------------------------------------------
else if (page === 'sectors') {
  document.title = 'Sectores & Entornos — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Por Entorno de Negocio</div>
        <h1>Tecnología diseñada para el <span style="color: var(--orange-500);">espacio donde opera.</span></h1>
        <p>Cada industria tiene normas y prioridades diferentes. Conozca cómo resolvemos la infraestructura para cada caso.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
          ${sectorsData.map(sec => `
            <div class="solution-card">
              <div class="card-icon-wrap">${sec.icon}</div>
              <div class="eyebrow eyebrow-blue">${sec.name}</div>
              <h3>${sec.headline}</h3>
              <p>${sec.description}</p>
              
              <div style="margin: 16px 0; border-top: 1px solid var(--slate-100); padding-top: 14px;">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--slate-500); margin-bottom: 8px;">PUNTOS CLAVE:</div>
                <ul style="list-style: none;">
                  ${sec.highlights.map(h => `<li style="font-size: 0.88rem; margin-bottom: 6px;">✓ ${h}</li>`).join('')}
                </ul>
              </div>

              <div style="margin-top: auto; display: flex; gap: 8px; flex-wrap: wrap;">
                ${sec.relatedKeys.map(k => `<a class="solution-chip" href="solucion.html?area=${k}">${solutionData[k].shortTitle} →</a>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  renderLayout(html);
}

// -------------------------------------------------------------
// PROYECTOS / CASOS
// -------------------------------------------------------------
else if (page === 'projects') {
  document.title = 'Proyectos & Metodología — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Experiencia Comprobada</div>
        <h1>Cómo abordamos <span style="color: var(--orange-500);">cada proyecto.</span></h1>
        <p>Garantizamos orden, cumplimiento de normas internacionales de cableado y respaldo de post-venta.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div class="eyebrow eyebrow-pill">Metodología de 4 Etapas</div>
          <h2>Un proceso transparente de ingeniería.</h2>
          <p>Evitamos improvisaciones y costos ocultos a través de un cronograma técnico claro.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 30px; box-shadow: var(--shadow-sm);">
            <div style="color: var(--orange-500); font-weight: 800; font-size: 1.6rem; font-family: var(--font-heading);">01</div>
            <h3 style="margin: 12px 0 8px;">Levantamiento</h3>
            <p style="color: var(--slate-600); font-size: 0.95rem;">Inspección en sitio, análisis de planos arquitectónicos y requerimientos de carga y ancho de banda.</p>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 30px; box-shadow: var(--shadow-sm);">
            <div style="color: var(--blue-600); font-weight: 800; font-size: 1.6rem; font-family: var(--font-heading);">02</div>
            <h3 style="margin: 12px 0 8px;">Diseño & Memoria</h3>
            <p style="color: var(--slate-600); font-size: 0.95rem;">Definición de topología de red, ubicación de cámaras, cálculo lumínico y selección de equipamiento.</p>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 30px; box-shadow: var(--shadow-sm);">
            <div style="color: var(--orange-500); font-weight: 800; font-size: 1.6rem; font-family: var(--font-heading);">03</div>
            <h3 style="margin: 12px 0 8px;">Instalación & Certificación</h3>
            <p style="color: var(--slate-600); font-size: 0.95rem;">Tendido ordenado, rotulado de puntos, fusión de fibra, peinado de racks y pruebas con certificador.</p>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 30px; box-shadow: var(--shadow-sm);">
            <div style="color: var(--blue-600); font-weight: 800; font-size: 1.6rem; font-family: var(--font-heading);">04</div>
            <h3 style="margin: 12px 0 8px;">Capacitación & Entrega</h3>
            <p style="color: var(--slate-600); font-size: 0.95rem;">Entrega de planos "as-built", entrenamiento al personal administrativo y póliza de garantía técnica.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  renderLayout(html);
}

// -------------------------------------------------------------
// EMPRESA
// -------------------------------------------------------------
else if (page === 'company') {
  document.title = 'Quiénes Somos — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Sobre WebServi.Net</div>
        <h1>Integración tecnológica con <span style="color: var(--orange-500);">criterio de ingeniería.</span></h1>
        <p>Acompañamos a las empresas bolivianas en la modernización de sus redes, seguridad física, automatización y telemetría de procesos.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
          <div>
            <div class="eyebrow eyebrow-blue">Nuestra Filosofía</div>
            <h2>El valor no está en sumar cajas, sino en hacer que dialoguen.</h2>
            <p style="color: var(--slate-600); font-size: 1.05rem; margin-top: 16px;">
              En WebServi.Net entendemos que una cámara desconectada de la red, un sensor sin alertas o una luminaria sin control programado son inversiones desaprovechadas.
            </p>
            <p style="color: var(--slate-600); font-size: 1.05rem; margin-top: 14px;">
              Nuestro compromiso es diseñar sistemas abiertos, seguros y escalables, respaldados por personal técnico especializado y marcas líderes mundiales.
            </p>
          </div>

          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-xl); padding: 40px;">
            <h3 style="margin-bottom: 20px;">Pilares de Servicio:</h3>
            <div style="margin-bottom: 16px;">
              <strong style="color: var(--blue-600);">1. Criterio Técnico Real</strong>
              <p style="font-size: 0.92rem; color: var(--slate-600);">No recomendamos tecnología innecesaria; dimensionamos con base en la necesidad operativa real.</p>
            </div>
            <div style="margin-bottom: 16px;">
              <strong style="color: var(--orange-500);">2. Igualdad Solución / Producto</strong>
              <p style="font-size: 0.92rem; color: var(--slate-600);">Usted puede contratarnos para el proyecto llave en mano o adquirir suministros específicos en nuestra tienda.</p>
            </div>
            <div>
              <strong style="color: var(--navy-900);">3. Soporte Local Continuo</strong>
              <p style="font-size: 0.92rem; color: var(--slate-600);">Respuesta rápida para mantenimientos, contingencias y ampliaciones futuras.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  renderLayout(html);
}

// -------------------------------------------------------------
// CONTACTO
// -------------------------------------------------------------
else if (page === 'contact') {
  document.title = 'Contacto Directo — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Atención a Clientes</div>
        <h1>Hablemos de <span style="color: var(--orange-500);">su próximo proyecto.</span></h1>
        <p>Nuestro equipo de ingeniería está listo para evaluar su requerimiento y preparar una propuesta personalizada.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
          <div>
            <div class="eyebrow eyebrow-blue">Canales Directos</div>
            <h2>Respuesta ágil y asesoría sin costo inicial.</h2>
            <p style="color: var(--slate-600); font-size: 1.05rem; margin: 16px 0 30px;">
              Escríbanos directamente a nuestros canales de atención o complete el formulario para coordinar una reunión técnica.
            </p>

            <div style="display: flex; flex-direction: column; gap: 18px;">
              <a href="https://wa.me/59175020555" target="_blank" style="display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: var(--radius-md); background: #f0fdf4; border: 1px solid #bbf7d0; text-decoration: none;">
                <span style="font-size: 2rem;">💬</span>
                <div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: #166534; text-transform: uppercase;">Atención Inmediata WhatsApp</div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: #15803d;">+591 750 20555</div>
                </div>
              </a>

              <a href="mailto:info@webservi.net" style="display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: var(--radius-md); background: var(--blue-50); border: 1px solid var(--blue-100); text-decoration: none;">
                <span style="font-size: 2rem;">✉️</span>
                <div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--blue-600); text-transform: uppercase;">Correo Electrónico</div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--blue-600);">info@webservi.net</div>
                </div>
              </a>
            </div>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-lg);">
            <h3 style="margin-bottom: 20px;">Formulario de Requerimiento</h3>
            
            <form onsubmit="event.preventDefault(); alert('¡Gracias por su mensaje! En la web en producción este formulario se procesará directamente por correo seguro.');">
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Nombre y Apellido</label>
                <input type="text" required placeholder="Ej. Ing. Carlos Mendoza" style="width: 100%; padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: var(--radius-sm); font-family: inherit;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Empresa o Institución</label>
                <input type="text" placeholder="Ej. Constructora / Empresa S.A." style="width: 100%; padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: var(--radius-sm); font-family: inherit;">
              </div>

              <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Teléfono / WhatsApp de Contacto</label>
                <input type="tel" required placeholder="+591 ..." style="width: 100%; padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: var(--radius-sm); font-family: inherit;">
              </div>

              <div style="margin-bottom: 24px;">
                <label style="display: block; font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Detalle breve de su requerimiento</label>
                <textarea rows="4" placeholder="Indique si necesita cableado, seguridad, iluminación comercial, monitoreo IoT o compra de equipamiento..." style="width: 100%; padding: 12px 16px; border: 1px solid var(--slate-200); border-radius: var(--radius-sm); font-family: inherit; resize: vertical;"></textarea>
              </div>

              <button class="btn btn-primary" type="submit" style="width: 100%;">Enviar Consulta de Proyecto</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
  renderLayout(html);
}

// -------------------------------------------------------------
// TIENDA PUENTE EXTERNO
// -------------------------------------------------------------
else if (page === 'store') {
  document.title = 'Tienda de Equipos Especializados — WebServi.Net';
  const html = `
    <section class="page-hero">
      <div class="wrap">
        <div class="eyebrow" style="color: var(--orange-500);">Acceso al Catálogo de Equipos</div>
        <h1>Tienda Oficial & <span style="color: var(--orange-500);">Equipamiento Tecnológico.</span></h1>
        <p>Adquiera componentes de red, cámaras, iluminación inteligente y sensores industriales con el respaldo y garantía de WebServi.Net.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div style="background: var(--orange-50); border: 1px solid rgba(245,129,31,0.3); border-radius: var(--radius-xl); padding: 40px; margin-bottom: 50px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
            <div>
              <div class="eyebrow" style="color: var(--orange-600);">Ruta Separada y Segura</div>
              <h3>Nuestra tienda online opera en una plataforma dedicada.</h3>
              <p style="color: var(--slate-600); margin-top: 6px; max-width: 650px;">
                Para garantizar la mayor velocidad de compra, cálculo de envíos y catálogo actualizado en tiempo real, la tienda cuenta con su propio portal especializado.
              </p>
            </div>
            <a class="btn btn-accent" href="https://wa.me/59175020555?text=${encodeURIComponent('Hola WebServi.Net, deseo consultar disponibilidad y precios de equipos de catálogo.')}" target="_blank">
              <span>Consultar Stock Inmediato</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div class="section-head">
          <div class="eyebrow eyebrow-blue">Categorías de Catálogo</div>
          <h2>Equipos disponibles para cotización y compra directa.</h2>
          <p>Seleccione la categoría para consultar fichas técnicas y disponibilidad:</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2rem; margin-bottom: 12px;">🔌</div>
            <h4>Conectividad & Redes</h4>
            <p style="font-size: 0.9rem; color: var(--slate-500); margin: 8px 0 16px;">Routers, switches administrables, fibra óptica, puntos de acceso y telefonía IP.</p>
            <a class="card-link" href="contacto.html">Consultar equipos de red →</a>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2rem; margin-bottom: 12px;">📹</div>
            <h4>CCTV & Seguridad</h4>
            <p style="font-size: 0.9rem; color: var(--slate-500); margin: 8px 0 16px;">Cámaras IP, NVRs, biometría, cerraduras inteligentes y control de acceso.</p>
            <a class="card-link" href="contacto.html">Consultar equipos de seguridad →</a>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2rem; margin-bottom: 12px;">💡</div>
            <h4>Iluminación & Domótica</h4>
            <p style="font-size: 0.9rem; color: var(--slate-500); margin: 8px 0 16px;">Drivers DALI, paneles LED de alta reproducción cromática, cortinas inteligentes.</p>
            <a class="card-link" href="contacto.html">Consultar domótica →</a>
          </div>

          <div style="background: var(--white); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2rem; margin-bottom: 12px;">🌡️</div>
            <h4>Instrumentación & IoT</h4>
            <p style="font-size: 0.9rem; color: var(--slate-500); margin: 8px 0 16px;">Sensores de presión, transmisores de temperatura, gateways LoRaWAN.</p>
            <a class="card-link" href="contacto.html">Consultar instrumentación →</a>
          </div>
        </div>
      </div>
    </section>
  `;
  renderLayout(html);
}
