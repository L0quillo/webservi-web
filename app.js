/**
 * WebServi.Net — Script de Interacción Moderna
 * Manejo del Story-Scroll Split-Screen, Transición de Fondos y Matriz de Integración
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const sidebar = document.getElementById('storySidebar');
  const lineCounter = document.getElementById('activeLineCounter');
  const progressBar = document.getElementById('lineProgressBar');
  const sidebarEyebrow = document.getElementById('sidebarEyebrow');
  const sidebarTitle = document.getElementById('sidebarTitle');
  const sidebarQuote = document.getElementById('sidebarQuote');
  const sidebarSpecs = document.getElementById('sidebarSpecs');
  const sidebarCta = document.getElementById('sidebarCta');
  const sidebarCtaText = document.getElementById('sidebarCtaText');
  const navItems = document.querySelectorAll('.site-nav .nav-item');
  const meshes = [
    document.getElementById('mesh1'),
    document.getElementById('mesh2'),
    document.getElementById('mesh3'),
    document.getElementById('mesh4'),
    document.getElementById('mesh5')
  ];
  const ambientVideos = [
    document.getElementById('ambientVid1'),
    document.getElementById('ambientVid2'),
    document.getElementById('ambientVid3'),
    document.getElementById('ambientVid4'),
    document.getElementById('ambientVid5'),
    document.getElementById('ambientVid6')
  ];

  // Clusters
  const clusters = document.querySelectorAll('.line-cluster');

  let currentActiveLine = null;

  function updateSidebar(cluster) {
    if (!cluster) return;
    const lineNum = cluster.dataset.line;
    if (currentActiveLine === lineNum) return;
    currentActiveLine = lineNum;

    const title = cluster.dataset.title;
    const eyebrow = cluster.dataset.eyebrow;
    const quote = cluster.dataset.quote;
    const specs = (cluster.dataset.specs || '').split(',');
    const ctaText = cluster.dataset.cta;
    const waMsg = encodeURIComponent(cluster.dataset.msg || 'Hola WebServi, deseo cotizar un proyecto');

    // Update Counter & Progress
    if (lineCounter) lineCounter.textContent = `LÍNEA 0${lineNum} DE 06`;
    if (progressBar) progressBar.style.width = `${(lineNum / 6) * 100}%`;

    // Update Text Content with subtle fade effect
    if (sidebarEyebrow) sidebarEyebrow.textContent = eyebrow;
    if (sidebarTitle) sidebarTitle.textContent = title;
    if (sidebarQuote) sidebarQuote.textContent = quote;

    // Update Specs
    if (sidebarSpecs) {
      sidebarSpecs.innerHTML = specs.map(s => `<div class="spec-tag">${s.trim()}</div>`).join('');
    }

    // Update WhatsApp CTA
    if (sidebarCta && sidebarCtaText) {
      sidebarCtaText.textContent = ctaText;
      sidebarCta.href = `https://wa.me/59175020555?text=${waMsg}`;
    }

    // Update Ambient Mesh
    const targetIdx = parseInt(lineNum, 10) - 1;
    meshes.forEach((mesh, index) => {
      if (mesh) {
        if (index === targetIdx) {
          mesh.classList.add('active');
        } else {
          mesh.classList.remove('active');
        }
      }
    });

    // Update Ambient Background Video Loops
    ambientVideos.forEach((vid, index) => {
      if (vid) {
        if (index === targetIdx) {
          vid.classList.add('active');
          if (vid.paused) {
            vid.play().catch(() => {});
          }
        } else {
          vid.classList.remove('active');
          if (!vid.paused) {
            vid.pause();
          }
        }
      }
    });

    // Update Top Nav & Mobile Nav Active States
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#linea-${lineNum}`) {
        item.classList.add('active');
      } else if (href && href.startsWith('#linea-')) {
        item.classList.remove('active');
      }
    });
    mobileNavLinks.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#linea-${lineNum}`) {
        item.classList.add('active');
      } else if (href && href.startsWith('#linea-')) {
        item.classList.remove('active');
      }
    });
  }

  // High-Precision Geometry Scroll Tracker (Works 100% reliably regardless of viewport height)
  function calculateActiveCluster() {
    if (!clusters || clusters.length === 0) return;
    const triggerY = window.innerHeight * 0.38;
    let bestCluster = null;

    for (let i = 0; i < clusters.length; i++) {
      const rect = clusters[i].getBoundingClientRect();
      if (rect.top <= triggerY && rect.bottom >= triggerY) {
        bestCluster = clusters[i];
        break;
      }
    }

    if (!bestCluster) {
      const firstRect = clusters[0].getBoundingClientRect();
      if (firstRect.top > triggerY) {
        bestCluster = clusters[0];
      } else {
        const lastRect = clusters[clusters.length - 1].getBoundingClientRect();
        if (lastRect.bottom < triggerY) {
          bestCluster = clusters[clusters.length - 1];
        }
      }
    }

    if (bestCluster) {
      updateSidebar(bestCluster);
    }
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        calculateActiveCluster();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    calculateActiveCluster();
  }, { passive: true });

  // Initial trigger
  calculateActiveCluster();

  // Initialize video autoplay and initial ambient video state
  const brandLogoVid = document.querySelector('.brand-logo-video');
  if (brandLogoVid) {
    brandLogoVid.play().catch(() => {});
  }
  if (ambientVideos[0]) {
    ambientVideos[0].classList.add('active');
    ambientVideos[0].play().catch(() => {});
  }

  // ==========================================
  // MOBILE NAVIGATION DRAWER (TOGGLE & EVENTS)
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileItems = document.querySelectorAll('.mobile-nav-item');

  if (mobileMenuBtn && mobileNavDrawer) {
    function toggleMobileMenu(forceState) {
      const isOpen = (forceState !== undefined) ? forceState : !mobileNavDrawer.classList.contains('active');
      mobileNavDrawer.classList.toggle('active', isOpen);
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNavDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileItems.forEach(item => {
      item.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close when clicking outside of the drawer
    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('active') && 
          !mobileNavDrawer.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });
  }

  // ==========================================
  // MATRIZ DE INTEGRACIÓN TOTAL (DATA & LOGIC)
  // ==========================================
  const scenariosData = [
    {
      btnLabel: "⚡ 1. Falla de Red Eléctrica",
      tradTitle: "El rack se apaga a los 10 minutos",
      tradDesc: "El UPS pequeño se agota rápidamente, los servidores se apagan de golpe, se corrompen las bases de datos contables y las cámaras de seguridad quedan ciegas.",
      webTitle: "Conmutación solar en <10 ms con litio ferrofosfato",
      webDesc: "El inversor solar y el banco de litio ferrofosfato (LiFePO4) asumen la carga instantáneamente sin microcortes. Autonomía de 10h, 24h o respaldo ilimitado. El personal sigue facturando y los servidores no se apagan.",
      metric: "Respaldo continuo de 10h a ilimitado con litio ferrofosfato"
    },
    {
      btnLabel: "🌐 2. Corte de Cable de Internet",
      tradTitle: "Sucursales aisladas y alarmas mudas",
      tradDesc: "Si cortan la fibra o el cable en la calle, el personal se queda sin facturar, las sucursales pierden conexión a los servidores y las alarmas no pueden enviar avisos.",
      webTitle: "Failover automático con LTE, Starlink o LoRaWAN",
      webDesc: "El router MikroTik/Fortinet conmuta automáticamente en 1 segundo al segundo proveedor o al enlace satelital Starlink. Si sabotean toda la red, los sensores de alarma transmiten vía LoRaWAN a batería.",
      metric: "Cero minutos de desconexión comercial"
    },
    {
      btnLabel: "🚪 3. Puertas Abiertas en Comercio",
      tradTitle: "Derroche masivo de energía y equipos forzados",
      tradDesc: "El aire acondicionado sigue enfriando al máximo mientras las puertas permanecen abiertas o las oficinas quedan vacías, disparando la factura eléctrica a fin de mes.",
      webTitle: "Home Assistant modula y coordina el clima en tiempo real",
      webDesc: "Los sensores de apertura y presencia integrados en Home Assistant ajustan automáticamente la temperatura de los aires Gree/Daikin o los apagan si el recinto se desocupa, prolongando la vida del compresor.",
      metric: "Hasta 35% de ahorro en consumo de climatización"
    },
    {
      btnLabel: "☀️ 4. Exceso de Radiación Solar",
      tradTitle: "Energía limpia desperdiciada sin aprovechamiento",
      tradDesc: "En horas pico de mediodía, si el banco de baterías ya está lleno y no hay inyección a red, la energía solar disponible simplemente se pierde.",
      webTitle: "Enfriamiento preventivo inteligente de ambientes",
      webDesc: "El sistema detecta sobregeneración solar y activa automáticamente la climatización para sobreenfriar oficinas, depósitos o áreas comerciales aprovechando energía 100% gratuita.",
      metric: "Aprovechamiento del 100% de la curva solar"
    },
    {
      btnLabel: "🔥 5. Sobrecarga en Tablero de Planta",
      tradTitle: "Esperar a que salte el térmico o se queme el motor",
      tradDesc: "Nadie se entera de un recalentamiento hasta que el térmico dispara la línea de golpe, parando la producción de la fábrica o quemando costosos motores.",
      webTitle: "Térmicos inteligentes con telemetría de amperaje",
      webDesc: "Los térmicos con medición en tiempo real detectan que un circuito está operando fuera de su rango normal y envían una alerta inmediata al jefe de mantenimiento por WhatsApp antes de que ocurra la falla.",
      metric: "Mantenimiento predictivo antes de la parada de planta"
    }
  ];

  const scenarioTabs = document.getElementById('scenarioTabs');
  const compTradTitle = document.getElementById('compTradTitle');
  const compTradDesc = document.getElementById('compTradDesc');
  const compWebserviTitle = document.getElementById('compWebserviTitle');
  const compWebserviDesc = document.getElementById('compWebserviDesc');
  const compMetricTag = document.getElementById('compMetricTag');

  if (scenarioTabs) {
    const buttons = scenarioTabs.querySelectorAll('.scenario-btn');
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const data = scenariosData[idx];
        if (data) {
          if (compTradTitle) compTradTitle.textContent = data.tradTitle;
          if (compTradDesc) compTradDesc.textContent = data.tradDesc;
          if (compWebserviTitle) compWebserviTitle.textContent = data.webTitle;
          if (compWebserviDesc) compWebserviDesc.textContent = data.webDesc;
          if (compMetricTag) compMetricTag.textContent = data.metric;
        }
      });
    });
  }

  // ==========================================
  // CLIENT PLATFORMS & PORTAL MODAL INTERACTION
  // ==========================================
  const platformsData = {
    unifi: {
      type: "GESTIÓN DE REDES & WI-FI",
      title: "Consola de Gestión UniFi (Wi-Fi & Switches)",
      desc: "Acceso centralizado para administración de switches, puntos de acceso y control de tráfico. Ingrese a su servidor asignado o utilice su cuenta Ubnt asociada:",
      status: "● Servidores Operativos 24/7",
      protocol: "HTTPS SSL (Puerto 8443 / Cloud SSO)",
      cards: [
        {
          title: "Servidor UniFi 7 (Principal)",
          badge: { text: "RECOMENDADO / ACTUAL", type: "recommended" },
          desc: "Servidor privado último para la mayoría de clientes actuales. Acceso mediante email propio asignado o cuenta Ubnt.",
          buttons: [
            { text: "Ingresar a UniFi 7", url: "https://unifi7.webservi.net:8443/", primary: true }
          ]
        },
        {
          title: "Servidores UniFi Legacy",
          badge: { text: "EQUIPOS ANTERIORES", type: "legacy" },
          desc: "Servidor antiguo de equipos anteriores todavía activo para clientes legacy:",
          buttons: [
            { text: "UniFi 6 (Puerto 8443)", url: "https://unifi6.webservi.net:8443/", primary: false },
            { text: "UniFi 5 (Puerto 8443)", url: "https://unifi5.webservi.net:8443/", primary: false }
          ]
        },
        {
          title: "Portal Ubnt Cloud Oficial",
          badge: { text: "CUENTA UBNT SSO", type: "ubnt" },
          desc: "Para usuarios administradores con cuenta Ubnt global en la nube oficial de Ubiquiti:",
          buttons: [
            { text: "Entrar con Cuenta Ubnt (account.ui.com)", url: "https://account.ui.com/", primary: false }
          ]
        }
      ],
      supportText: "¿Dudas o problemas con sus accesos a UniFi?",
      supportUrl: "https://wa.me/59175020555?text=Hola%20WebServi,%20tengo%20una%20consulta%20o%20problema%20con%20el%20acceso%20a%20UniFi"
    },
    uisp: {
      type: "TELECOMUNICACIONES & RADIOENLACES",
      title: "Plataforma UISP (Antenas & Enlaces)",
      desc: "Monitoreo en tiempo real de torres de comunicaciones, radioenlaces de 5/25/60 GHz y enlaces Starlink. Seleccione su plataforma de acceso:",
      status: "● Servidor Operativo 24/7",
      protocol: "HTTPS / WSS Seguro (Cifrado 256-bit)",
      cards: [
        {
          title: "Servidor Privado UISP WebServi",
          badge: { text: "SERVIDOR PRIVADO", type: "recommended" },
          desc: "Monitoreo privado de enlaces de campo, latencias, alineación y throughput.",
          buttons: [
            { text: "Ingresar a UISP WebServi", url: "https://uisp.webservi.net/", primary: true }
          ]
        },
        {
          title: "Portal Ubnt Cloud Oficial",
          badge: { text: "CUENTA UBNT SSO", type: "ubnt" },
          desc: "Para clientes con acceso asignado mediante cuenta Ubnt en la nube oficial:",
          buttons: [
            { text: "Entrar con Cuenta Ubnt (account.ui.com)", url: "https://account.ui.com/", primary: false }
          ]
        }
      ],
      supportText: "¿Dudas o problemas con sus radioenlaces UISP?",
      supportUrl: "https://wa.me/59175020555?text=Hola%20WebServi,%20tengo%20una%20consulta%20o%20problema%20con%20el%20acceso%20a%20UISP"
    },
    domotica: {
      type: "CONTROL RESIDENCIAL & INMÓTICA",
      title: "Acceso a Domóticas Remotas (Paneles de Control)",
      desc: "Portal de enlace seguro a sus controladores Home Assistant, iluminación, climatización Gree/Daikin y baterías solares. Por ciberseguridad, la conexión remota se realiza mediante túnel privado VPN (WireGuard) o dirección local segura.",
      status: "● Conexión Cifrada / Túnel VPN",
      protocol: "WireGuard VPN / HTTPS Cifrado",
      cards: [
        {
          title: "Conexión Segura & Soporte Inmótico",
          badge: { text: "TÚNEL PRIVADO", type: "ubnt" },
          desc: "Para acceder a su panel de control o solicitar la apertura de su túnel seguro:",
          buttons: [
            { text: "Solicitar Acceso Seguro a su Inmueble (WhatsApp)", url: "https://wa.me/59175020555?text=Hola%20WebServi,%20solicito%20asistencia%20para%20conectar%20a%20mi%20panel%20de%20domótica", primary: true }
          ]
        }
      ],
      supportText: "¿Requiere configurar un nuevo dispositivo o usuario?",
      supportUrl: "https://wa.me/59175020555?text=Hola%20WebServi,%20requiero%20asistencia%20con%20el%20sistema%20de%20domótica"
    },
    thingsboard: {
      type: "TELEMETRÍA INDUSTRIAL & LORAWAN",
      title: "Dashboard IoT ThingsBoard WebServi",
      desc: "Supervisión de variables críticas: presión de vapor en calderas, caudalímetros, temperatura de procesos, silos y niveles de agua en tiempo real.",
      status: "● Dashboard Activo 24/7",
      protocol: "MQTT / REST API / HTTPS Dashboard",
      cards: [
        {
          title: "Dashboard ThingsBoard Cloud",
          badge: { text: "TELEMETRÍA EN VIVO", type: "recommended" },
          desc: "Consola de visualización de sensores industriales y telemetría de campo:",
          buttons: [
            { text: "Ingresar a ThingsBoard Cloud", url: "https://thingsboard.cloud/", primary: true }
          ]
        }
      ],
      supportText: "¿Desea solicitar o restablecer credenciales de telemetría?",
      supportUrl: "https://wa.me/59175020555?text=Hola%20WebServi,%20solicito%20credenciales%20para%20ThingsBoard%20IoT"
    },
    monitoreo: {
      type: "INFRAESTRUCTURA CRÍTICA & SERVIDORES",
      title: "Centro de Monitoreos Remotos (NOC 24/7)",
      desc: "Supervisión continua del estado de servidores Proxmox, VMware, enlaces de internet multi-WAN y alarmas perimetrales de sus instalaciones.",
      status: "● Centro NOC Activo 24/7",
      protocol: "SNMP v3 / Agentless Telemetry",
      cards: [
        {
          title: "Atención Técnica & Reportes NOC",
          badge: { text: "SOPORTE CRÍTICO", type: "recommended" },
          desc: "Consulte el estado de su infraestructura o solicite un informe técnico de disponibilidad:",
          buttons: [
            { text: "Solicitar Reporte de Monitoreo por WhatsApp", url: "https://wa.me/59175020555?text=Hola%20WebServi,%20deseo%20consultar%20el%20estado%20de%20monitoreo%20de%20mis%20servicios", primary: true }
          ]
        }
      ],
      supportText: "¿Reporte de emergencia fuera de horario de oficina?",
      supportUrl: "https://wa.me/59175020555?text=Hola%20WebServi,%20emergencia%20en%20servidor%20o%20red%20de%20datos"
    }
  };

  const portalModal = document.getElementById('portalModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPlatformType = document.getElementById('modalPlatformType');
  const modalPlatformTitle = document.getElementById('modalPlatformTitle');
  const modalPlatformDesc = document.getElementById('modalPlatformDesc');
  const modalPlatformStatus = document.getElementById('modalPlatformStatus');
  const modalPlatformProtocol = document.getElementById('modalPlatformProtocol');
  const modalServerList = document.getElementById('modalServerList');

  let lastActiveFocusedElement = null;

  function openPortalModal(platformKey) {
    const data = platformsData[platformKey];
    if (!data || !portalModal) return;

    lastActiveFocusedElement = document.activeElement;

    if (modalPlatformType) modalPlatformType.textContent = data.type;
    if (modalPlatformTitle) modalPlatformTitle.textContent = data.title;
    if (modalPlatformDesc) modalPlatformDesc.textContent = data.desc;
    if (modalPlatformStatus) modalPlatformStatus.textContent = data.status || '● Servidor Operativo 24/7';
    if (modalPlatformProtocol) modalPlatformProtocol.textContent = data.protocol;

    if (modalServerList) {
      let html = '';
      if (data.cards && data.cards.length > 0) {
        data.cards.forEach((card, cIdx) => {
          const isPrimary = cIdx === 0 && card.buttons.some(b => b.primary);
          html += `
            <div class="modal-server-card${isPrimary ? ' primary' : ''}">
              <div class="modal-server-header">
                <span class="modal-server-title">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                  ${card.title}
                </span>
                ${card.badge ? `<span class="modal-server-badge ${card.badge.type}">${card.badge.text}</span>` : ''}
              </div>
              <p class="modal-server-desc">${card.desc}</p>
              <div class="modal-server-actions">
                ${card.buttons.map(btn => `
                  <a href="${btn.url}" target="_blank" rel="noopener" class="${btn.primary ? 'modal-btn-enter' : 'modal-btn-subtle'}">
                    <span>${btn.text}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </a>
                `).join('')}
              </div>
            </div>
          `;
        });
      }

      if (data.supportText && data.supportUrl) {
        html += `
          <div class="modal-support-box">
            <span class="modal-support-text">${data.supportText}</span>
            <a href="${data.supportUrl}" target="_blank" rel="noopener" class="modal-support-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>WhatsApp Soporte</span>
            </a>
          </div>
        `;
      }

      modalServerList.innerHTML = html;
    }

    portalModal.classList.add('active');
    portalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 50);
  }

  function closePortalModal() {
    if (!portalModal) return;
    portalModal.classList.remove('active');
    portalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveFocusedElement) {
      lastActiveFocusedElement.focus();
      lastActiveFocusedElement = null;
    }
  }

  const portalButtons = document.querySelectorAll('.portal-btn');
  portalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const platformKey = btn.dataset.portal;
      if (platformKey) openPortalModal(platformKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePortalModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePortalModal);

  // ==========================================
  // CAROUSEL DE FOTOS REALES EN TARJETAS
  // ==========================================
  const cardsPortfolioData = {
    "linea-1-card-1": {
      title: "Diseño de Redes Wi-Fi & Datos",
      images: [
        "img/portfolio/diseno-wifi.webp",
        "img/portfolio/planificacion-diseno-senales-y-redes.webp",
        "img/portfolio/diseno-covertura-cctv.webp",
        "img/portfolio/wifi-unifi-pared.webp"
      ]
    },
    "linea-1-card-2": {
      title: "Ductaje Preventivo con Capacidad Futura",
      images: [
        "img/portfolio/obra-cableado-ductaje-diseno-2016.webp",
        "img/portfolio/escalerillas-rieles-y-redes-industriales.webp",
        "img/portfolio/ductaje-redes-fibra-industrial.webp",
        "img/portfolio/eslerillas.webp",
        "img/portfolio/panel-eductivo.webp"
      ]
    },
    "linea-1-card-3": {
      title: "Diseño de Autonomía Solar & Climatización",
      images: [
        "img/portfolio/disno-energia-solar-y-monitoreo.webp",
        "img/portfolio/sistemas-solares.webp",
        "img/portfolio/datacenter-y-energia-solar.webp",
        "img/portfolio/ups-ionlitio-solar.webp"
      ]
    },
    "linea-1-card-4": {
      title: "Diseño Certificado para Domótica e Inmótica",
      images: [
        "img/portfolio/paneles-de-control-domotica-y-oficinas.webp",
        "img/portfolio/tableros-electricos-y-domotica.webp",
        "img/portfolio/ejemplo-lineas-luces.webp",
        "img/portfolio/iluminacion-seguridad-joyeria.webp"
      ]
    },
    "linea-2-card-1": {
      title: "Cableado Estructurado (Garantía 3 a 10 Años)",
      images: [
        "img/portfolio/obra-cableado-estructurado-2016.webp",
        "img/portfolio/cableado-esttructurado.webp",
        "img/portfolio/cableado-redes-y-racks.webp",
        "img/portfolio/cableado-estructurado-redes-y-fibra.webp",
        "img/portfolio/cableado-estructurado-redes-cctv-wifi.webp",
        "img/portfolio/cableado-redes-domiciliario.webp"
      ]
    },
    "linea-2-card-2": {
      title: "Interconexión por Fibra Óptica (1G a 40G)",
      images: [
        "img/portfolio/fibra-optica.webp",
        "img/portfolio/swich-core-fibras-opticas.webp",
        "img/portfolio/fibra-optica-privadas.webp",
        "img/portfolio/fibra-optica-redes-y-routers.webp",
        "img/portfolio/redes-y-fibra-optica.webp"
      ]
    },
    "linea-2-card-3": {
      title: "Tableros Eléctricos con Monitoreo de Consumo",
      images: [
        "img/portfolio/tableros-electricos-y-medicion-de-energia.webp",
        "img/portfolio/tableros-electricos-y-medicion-de-energia1.webp",
        "img/portfolio/medicion-energia.webp",
        "img/portfolio/monitoreo-energia.webp",
        "img/portfolio/tableros-electricos.webp"
      ]
    },
    "linea-2-card-4": {
      title: "Racks Organizados & Conexiones en Mobiliario y Piso",
      images: [
        "img/portfolio/obra-racks-cableado-estructurado-2015.webp",
        "img/portfolio/obra-mini-rack-redes-pyme-2015.webp",
        "img/portfolio/cableado-de-muebles.webp",
        "img/portfolio/sala-de-reuniones.webp",
        "img/portfolio/sala-de-reuniones1.webp",
        "img/portfolio/racks-y-redes-oficinas-y-domicilios.webp",
        "img/portfolio/redes-video-audio-rack.webp"
      ]
    },
    "linea-3-card-1": {
      title: "MikroTik, UniFi & Fortinet Administrados",
      images: [
        "img/portfolio/obra-redes-gabinetes-2016.webp",
        "img/portfolio/obra-routers-redes-2015.webp",
        "img/portfolio/obra-routers-enrutamiento-2015.webp",
        "img/portfolio/obra-redes-comunicaciones-2015.webp",
        "img/portfolio/wifi-unifi.webp",
        "img/portfolio/routers-oficinas.webp",
        "img/portfolio/monitoreo-redes-nube.webp",
        "img/portfolio/wifi-oficinas-techo.webp",
        "img/portfolio/wifi-unifi-detras-de-televisor-sala-reuniones.webp"
      ]
    },
    "linea-3-card-2": {
      title: "Torres de 60m, Enlaces 60 GHz & Starlink",
      images: [
        "img/portfolio/obra-antena-enlace-2017.webp",
        "img/portfolio/obra-enlaces-inalambricos-antenas-2016.webp",
        "img/portfolio/obra-antena-satelital-2016.webp",
        "img/portfolio/torres-y-enlaces-5ghz-60ghz.webp",
        "img/portfolio/starlink-instalaciones.webp",
        "img/portfolio/starlink.webp",
        "img/portfolio/torres-enlaces.webp",
        "img/portfolio/torre-enlaces.webp",
        "img/portfolio/velocidad-enlaces.webp"
      ]
    },
    "linea-3-card-3": {
      title: "Servidores Físicos (Dell / HP / Supermicro)",
      images: [
        "img/portfolio/obra-servers-ensamblados-hardware-2015.webp",
        "img/portfolio/obra-rack-servers-redes-2013.webp",
        "img/portfolio/servers-nas-bjobs.webp",
        "img/portfolio/racks-y-datacenters.webp",
        "img/portfolio/rack-redes.webp",
        "img/portfolio/racks-oficinas-y-redes.webp",
        "img/portfolio/voip-servers.webp"
      ]
    },
    "linea-3-card-4": {
      title: "Backup Estricto 3-2-1, PBX & Nube Híbrida",
      images: [
        "img/portfolio/obra-telefonia-ip-central-2013.webp",
        "img/portfolio/redes-cctv-nas-rack.webp",
        "img/portfolio/rack-datos-red-cctv-servers-nas-cableado-routers.webp",
        "img/portfolio/monitoreo-redes-nube.webp",
        "img/portfolio/rack-y-datos.webp",
        "img/portfolio/voip-pbx.webp"
      ]
    },
    "linea-4-card-1": {
      title: "CCTV con IA & Almacenamiento Masivo",
      images: [
        "img/portfolio/obra-video-walls-estructuras-2016.webp",
        "img/portfolio/obra-redes-cctv-2016.webp",
        "img/portfolio/sistemas-camaras-seguridad.webp",
        "img/portfolio/cctv-camaras.webp",
        "img/portfolio/cctv-exteriores.webp",
        "img/portfolio/cctv-exteriores-camaras.webp",
        "img/portfolio/cctv-interiores.webp",
        "img/portfolio/cctv-seguridad-fabricas.webp"
      ]
    },
    "linea-4-card-2": {
      title: "Molinetes, Torniquetes & Biometría",
      images: [
        "img/portfolio/molinetes-control-de-acceso.webp",
        "img/portfolio/control-de-acceso-y-video-porteros.webp",
        "img/portfolio/biometrico-alarma-incendio-alarma-seguridad.webp",
        "img/portfolio/alarma-y-control-de-acceso.webp"
      ]
    },
    "linea-4-card-3": {
      title: "Alarmas de Seguridad Certificadas",
      images: [
        "img/portfolio/sistemas-de-alarma-contra-incendio.webp",
        "img/portfolio/alarma-y-control-de-acceso.webp",
        "img/portfolio/iluminacion-seguridad-joyeria.webp"
      ]
    },
    "linea-4-card-4": {
      title: "Redundancia por LoRaWAN, LTE & Starlink",
      images: [
        "img/portfolio/electronica-a-medida-lte-lorawan.webp",
        "img/portfolio/redes-torres-y-tableros-campo.webp",
        "img/portfolio/starlink-instalaciones.webp",
        "img/portfolio/antenas-enlace.webp"
      ]
    },
    "linea-5-card-1": {
      title: "Domótica e IoT (Home Assistant & ThingsBoard)",
      images: [
        "img/portfolio/paneles-de-control-domotica-y-oficinas.webp",
        "img/portfolio/automatismo-y-redes.webp",
        "img/portfolio/tableros-electricos-y-domotica.webp",
        "img/portfolio/panel-eductivo.webp"
      ]
    },
    "linea-5-card-2": {
      title: "UPS < 10 ms con Litio Ferrofosfato",
      images: [
        "img/portfolio/ups-ionlitio-solar.webp",
        "img/portfolio/datacenter-y-energia-solar.webp",
        "img/portfolio/racks-y-energia-ups.webp",
        "img/portfolio/sistemas-solares.webp"
      ]
    },
    "linea-5-card-3": {
      title: "Climatización Inteligente (Gree, LG, Daikin)",
      images: [
        "img/portfolio/oficinas-cableado-y-sistemas.webp",
        "img/portfolio/sala-de-reuniones.webp",
        "img/portfolio/disno-energia-solar-y-monitoreo.webp",
        "img/portfolio/iluminacion-comercial.webp"
      ]
    },
    "linea-5-card-4": {
      title: "Telemetría e IoT Industrial sin Límites",
      images: [
        "img/portfolio/electronica-a-medida-lte-lorawan.webp",
        "img/portfolio/monitoreo-energia.webp",
        "img/portfolio/medicion-energia.webp",
        "img/portfolio/redes-torres-y-tableros-campo.webp"
      ]
    },
    "linea-6-card-1": {
      title: "Outsourcing de TI & Soporte Mensualizado",
      images: [
        "img/portfolio/outsourcing-ti-soporte-empresarial.webp",
        "img/portfolio/monitoreo-redes-nube.webp",
        "img/portfolio/oficinas-cableado-y-sistemas.webp",
        "img/portfolio/routers-oficinas.webp"
      ]
    },
    "linea-6-card-2": {
      title: "Capacitaciones Técnicas Profesionales",
      images: [
        "img/portfolio/capacitaciones-tecnicas-redes-ia.webp",
        "img/portfolio/panel-eductivo.webp",
        "img/portfolio/wifi-unifi.webp",
        "img/portfolio/planificacion-diseno-senales-y-redes.webp"
      ]
    },
    "linea-6-card-3": {
      title: "Automatización, Agentes IA & Chatbots (Telegram / WA)",
      images: [
        "img/portfolio/agentes-ia-chatbots-automatizacion.webp",
        "img/portfolio/redes-video-audio-rack.webp",
        "img/portfolio/servers-nas-bjobs.webp",
        "img/portfolio/monitoreo-redes-nube.webp"
      ]
    },
    "linea-6-card-4": {
      title: "Servidores Locales de IA & Privacidad de Datos",
      images: [
        "img/portfolio/servidores-locales-ia-privacidad.webp",
        "img/portfolio/servers-nas-bjobs.webp",
        "img/portfolio/rack-datos-red-cctv-servers-nas-cableado-routers.webp",
        "img/portfolio/racks-y-datacenters.webp"
      ]
    }
  };

  // Lightbox elements
  const photoLightbox = document.getElementById('photoLightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let currentActiveCardId = null;
  let currentActivePhotoIdx = 0;

  function openLightbox(cardId, photoIdx = 0) {
    const cardData = cardsPortfolioData[cardId];
    if (!cardData || !photoLightbox) return;
    currentActiveCardId = cardId;
    currentActivePhotoIdx = photoIdx % cardData.images.length;
    updateLightboxUI();
    photoLightbox.classList.add('active');
    photoLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxUI() {
    const cardData = cardsPortfolioData[currentActiveCardId];
    if (!cardData) return;
    const total = cardData.images.length;
    const src = cardData.images[currentActivePhotoIdx];
    if (lightboxImg) {
      lightboxImg.style.opacity = '0.3';
      lightboxImg.src = src;
      lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
    }
    if (lightboxTitle) lightboxTitle.textContent = cardData.title;
    if (lightboxCounter) lightboxCounter.textContent = `FOTO ${currentActivePhotoIdx + 1} / ${total}`;
  }

  function closeLightbox() {
    if (!photoLightbox) return;
    photoLightbox.classList.remove('active');
    photoLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextLightboxPhoto() {
    const cardData = cardsPortfolioData[currentActiveCardId];
    if (!cardData) return;
    currentActivePhotoIdx = (currentActivePhotoIdx + 1) % cardData.images.length;
    updateLightboxUI();
  }

  function showPrevLightboxPhoto() {
    const cardData = cardsPortfolioData[currentActiveCardId];
    if (!cardData) return;
    currentActivePhotoIdx = (currentActivePhotoIdx - 1 + cardData.images.length) % cardData.images.length;
    updateLightboxUI();
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextLightboxPhoto);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevLightboxPhoto);

  // Initialize carousels inside each card
  document.querySelectorAll('.line-cluster').forEach(cluster => {
    const lineNum = cluster.dataset.line;
    const cards = cluster.querySelectorAll('.tech-card');
    
    cards.forEach((card, idx) => {
      const cardId = `linea-${lineNum}-card-${idx + 1}`;
      card.setAttribute('data-card-id', cardId);
      const data = cardsPortfolioData[cardId];
      if (!data || !data.images || data.images.length === 0) return;

      // 1. Create Background Carousel Container
      const carousel = document.createElement('div');
      carousel.className = 'card-bg-carousel';

      const imgElements = data.images.map((src, imgIdx) => {
        const img = document.createElement('img');
        img.className = `slide-img${imgIdx === 0 ? ' active' : ''}`;
        img.src = src;
        img.alt = `${data.title} - Foto real de obra WebServi`;
        img.loading = 'lazy';
        carousel.appendChild(img);
        return img;
      });

      // 2. Create Vignette Overlay
      const overlay = document.createElement('div');
      overlay.className = 'card-bg-overlay';

      // Insert at the very beginning of the card so it stays in background
      card.insertBefore(overlay, card.firstChild);
      card.insertBefore(carousel, overlay);

      // 3. Create Photo Badge Indicator
      const badge = document.createElement('div');
      badge.className = 'card-photo-badge';
      badge.title = 'Clic para ampliar las fotos reales de esta obra';
      badge.innerHTML = `
        <div class="badge-label-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span>Obras Reales (${data.images.length})</span>
        </div>
        <div class="photo-dots">
          ${data.images.map((_, dotIdx) => `<span class="photo-dot${dotIdx === 0 ? ' active' : ''}"></span>`).join('')}
        </div>
      `;

      card.appendChild(badge);

      // 4. Staggered Auto-Rotation
      let currentIdx = 0;
      let intervalId = null;
      const dots = badge.querySelectorAll('.photo-dot');

      dots.forEach((dot, dotIdx) => {
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          switchSlide(dotIdx);
        });
      });

      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(cardId, currentIdx);
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.card-photo-badge')) return;
        openLightbox(cardId, currentIdx);
      });

      function switchSlide(nextIdx) {
        imgElements[currentIdx].classList.remove('active');
        dots[currentIdx].classList.remove('active');
        currentIdx = (nextIdx !== undefined) ? nextIdx : (currentIdx + 1) % data.images.length;
        imgElements[currentIdx].classList.add('active');
        dots[currentIdx].classList.add('active');
      }

      function startCarousel() {
        if (intervalId || data.images.length <= 1) return;
        // Rotación más dinámica: entre 3.2s y 4.1s desfasada por tarjeta
        const cardDelay = 3200 + ((parseInt(lineNum, 10) * 4 + idx) % 4) * 300;
        intervalId = setInterval(() => {
          switchSlide();
        }, cardDelay);
      }

      function stopCarousel() {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }

      setTimeout(() => {
        startCarousel();
      }, (idx + parseInt(lineNum, 10)) * 200);

      card.addEventListener('mouseenter', stopCarousel);
      card.addEventListener('mouseleave', startCarousel);
    });
  });

  // =========================================================================
  // COMPARATIVE MATRIX ACCORDION & SCENARIO BUTTONS
  // =========================================================================
  const matrixAccordionTrigger = document.getElementById('matrixAccordionTrigger');
  const matrixAccordionContent = document.getElementById('matrixAccordionContent');

  if (matrixAccordionTrigger && matrixAccordionContent) {
    matrixAccordionTrigger.addEventListener('click', () => {
      const isExpanded = matrixAccordionTrigger.getAttribute('aria-expanded') === 'true';
      matrixAccordionTrigger.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        matrixAccordionContent.hidden = true;
      } else {
        matrixAccordionContent.hidden = false;
      }
    });

    matrixAccordionTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        matrixAccordionTrigger.click();
      }
    });
  }

  // =========================================================================
  // INTERACTIVE AI ENGINEERING DIAGNOSTIC CONSOLE
  // =========================================================================
  const aiQuickOptions = document.getElementById('aiQuickOptions');
  const diagDisciplineTag = document.getElementById('diagDisciplineTag');
  const diagBody = document.getElementById('diagBody');
  const diagSpecs = document.getElementById('diagSpecs');
  const aiUserInput = document.getElementById('aiUserInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiTelegramBtn = document.getElementById('aiTelegramBtn');
  const aiWhatsAppBtn = document.getElementById('aiWhatsAppBtn');

  const diagnosisKnowledge = {
    planos: {
      tag: 'LÍNEA 01 · INGENIERÍA EN PLANOS BIM & PRE-OBRA',
      body: 'Para edificaciones y obras nuevas, la intervención pre-obra evita el 90% de sobrecostos futuros. Diseñamos ductaje conduit mínimo de 1" con curvaturas suaves, segregación estricta de rutas de fuerza (separación mínima 30 cm para eliminar inducción EMI) y planos as-built digitalizados en AutoCAD y Revit.',
      specs: [
        '📐 Ductos con 40% de holgura para expansión futura',
        '⚡ Segregación electromagnética según ANSI/TIA-569-E',
        '📁 Dossier as-built georreferenciado con rutas y cajas de paso'
      ],
      defaultQuery: 'Requiero ingeniería pre-obra, ductos holgados y planos de canalización para obra nueva.'
    },
    cableado: {
      tag: 'LÍNEA 02 · CABLEADO ESTRUCTURADO CAT6A/CAT7 & FIBRA ÓPTICA',
      body: 'Despliegue de cableado 100% Cobre Puro de un solo hilo (libre de aleaciones CCA quebradizas). Certificación punto a punto con escáner de nivel de laboratorio Fluke Networks y enlaces troncales en Fibra Óptica Monomodo/Multimodo con fusiones de precisión (< 0.05 dB de pérdida). Ofrecemos garantía de 3 a 10 años.',
      specs: [
        '🔌 Cable 100% Cobre sólido Cat6A / Cat7 para 10 Gbps PoE++',
        '🔬 Certificación Fluke Networks (NEXT, Return Loss, Wiremap)',
        '✨ Fusión de Fibra Óptica por arco voltaico y ODF de distribución'
      ],
      defaultQuery: 'Necesito cableado estructurado certificado Cat6A/Fibra con garantía extendida.'
    },
    redes: {
      tag: 'LÍNEA 03 · REDES MIKROTIK, UNIFI, SERVIDORES & BACKUP 3-2-1',
      body: 'Arquitectura de conectividad empresarial con balanceo Multi-WAN en routers MikroTik RouterOS (conmutación en 300 ms ante caídas de ISP), segmentación de VLANs, Wi-Fi 6/7 empresarial UniFi de alta densidad y servidores virtualizados Proxmox VE con copias inmutables bajo la regla 3-2-1.',
      specs: [
        '🌐 MikroTik BGP / OSPF / Multi-WAN Failover en 300 ms',
        '📶 Wi-Fi 6/7 empresarial con roaming asistido 802.11k/v/r',
        '🛡️ Backup 3-2-1 en NAS local + Réplica Offsite cifrada'
      ],
      defaultQuery: 'Necesito optimizar la red empresarial con MikroTik, Wi-Fi estable y respaldo 3-2-1.'
    },
    cctv: {
      tag: 'LÍNEA 04 · CCTV CON IA, CONTROL DE ACCESO & REDUNDANCIA',
      body: 'Sistema perimetral de videoseguridad con analítica inteligente de video (detección humana y vehicular sin falsas alarmas), torniquetes biométricos, esclusas y redundancia de alertas ante corte de enlace vía LoRaWAN, enlaces satelitales Starlink o LTE privado.',
      specs: [
        '📹 Cámaras 4K AcuSense/SMD con almacenamiento local redundante',
        '🚪 Molinetes y control de acceso biométrico facial/MIFARE',
        '📡 Telemetría y enlace de respaldo por Starlink / LoRaWAN'
      ],
      defaultQuery: 'Requiero CCTV con analítica IA, control de accesos biométrico y redundancia de alertas.'
    },
    domotica: {
      tag: 'LÍNEA 05 · DOMÓTICA LOCAL, UPS LITIO & IOT INDUSTRIAL',
      body: 'Automatización inteligente con procesamiento 100% local (sin depender de nubes chinas ni suscripciones de terceros). Integración de climatización VRF/Inverter, iluminación DALI/Zigbee y respaldo ininterrumpido con UPS de Litio Ferrofosfato (LiFePO4) de transferencia < 10 ms.',
      specs: [
        '🏠 Servidor local Home Assistant / ThingsBoard industrial',
        '🔋 Banco de baterías LiFePO4 de 4000+ ciclos de vida útil',
        '⚡ Monitoreo de fases eléctricas y telemetría de corte en tiempo real'
      ],
      defaultQuery: 'Busco domótica local sin nubes externas y sistema de UPS con litio ferrofosfato.'
    },
    outsourcing: {
      tag: 'LÍNEA 06 · OUTSOURCING TI, CAPACITACIONES & SOLUCIONES IA',
      body: 'Servicio mensualizado de TI empresarial actuando como su departamento técnico interno: soporte preventivo, correctivo y mesa de ayuda con SLA garantizado. Capacitaciones in-company prácticas en MikroTik, UniFi, redes y domótica. Implementación de agentes IA, chatbots conectados a Telegram/WhatsApp y servidores locales de IA para proteger su confidencialidad.',
      specs: [
        '💻 Outsourcing mensualizado y mesa de ayuda técnica 24/7',
        '🎓 Capacitaciones técnicas profesionales in-company a medida',
        '🤖 Agentes IA, chatbots y servidores locales privados (100% privacidad)'
      ],
      defaultQuery: 'Interesa outsourcing mensual de TI, capacitaciones para mi equipo y agentes de IA.'
    },
    integral: {
      tag: 'PROYECTO INTEGRAL MULTIDISCIPLINARIO LLAVE EN MANO',
      body: 'Solución integral coordinada de punta a punta: desde el diseño de ductos en obra gruesa y cableado Cat6A/Fibra, hasta el equipamiento de telecomunicaciones MikroTik/UniFi, videovigilancia con IA, control de accesos, domótica con respaldo de litio y soporte mensualizado con agentes IA.',
      specs: [
        '⚡ 6 disciplinas de ingeniería en un solo contrato y proveedor',
        '📋 Un solo interlocutor técnico y garantía total unificada',
        '🛡️ Cero conflictos entre electricistas, albañiles y técnicos de TI'
      ],
      defaultQuery: 'Requiero una solución integral llave en mano con las 6 disciplinas de WebServi.'
    }
  };

  let activeDiscipline = 'planos';

  function updateDiagnosticUI(disciplineKey, customQuery = '') {
    const data = diagnosisKnowledge[disciplineKey] || diagnosisKnowledge.planos;
    activeDiscipline = disciplineKey;

    if (diagDisciplineTag) diagDisciplineTag.textContent = data.tag;
    if (diagBody) {
      if (customQuery.trim()) {
        diagBody.innerHTML = `<strong>Consulta específica:</strong> "${customQuery.trim()}"<br><br>${data.body}`;
      } else {
        diagBody.textContent = data.body;
      }
    }

    if (diagSpecs) {
      diagSpecs.innerHTML = data.specs.map(s => `<span class="spec-chip">${s}</span>`).join('');
    }

    // Update dispatch links to Lucas (+591 75020555)
    const queryText = customQuery.trim() || data.defaultQuery;
    const projectSummary = `Hola Lucas, coticé en la web el diagnóstico para [${data.tag}]. Requerimiento: "${queryText}". Quisiera coordinar una propuesta técnica.`;

    if (aiTelegramBtn) {
      aiTelegramBtn.href = `https://t.me/WebServiBolivia?text=${encodeURIComponent(projectSummary)}`;
    }
    if (aiWhatsAppBtn) {
      aiWhatsAppBtn.href = `https://wa.me/59175020555?text=${encodeURIComponent(projectSummary)}`;
    }
  }

  if (aiQuickOptions) {
    aiQuickOptions.querySelectorAll('.ai-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        aiQuickOptions.querySelectorAll('.ai-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const discipline = btn.dataset.discipline;
        const currentInput = aiUserInput ? aiUserInput.value : '';
        updateDiagnosticUI(discipline, currentInput);
      });
    });
  }

  if (aiSendBtn && aiUserInput) {
    const handleSendDiagnosis = () => {
      const query = aiUserInput.value.trim();
      updateDiagnosticUI(activeDiscipline, query);
      if (diagBody) {
        diagBody.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };
    aiSendBtn.addEventListener('click', handleSendDiagnosis);
    aiUserInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendDiagnosis();
      }
    });
  }

  // Initial populate of AI Diagnosis
  updateDiagnosticUI('planos');

  // =========================================================================
  // FLOATING 24/7 AI ASSISTANT WIDGET & CHATBOT
  // =========================================================================
  const floatingAiTrigger = document.getElementById('floatingAiTrigger');
  const floatingAiModal = document.getElementById('floatingAiModal');
  const floatingAiClose = document.getElementById('floatingAiClose');
  const floatingAiMessages = document.getElementById('floatingAiMessages');
  const floatingAiInput = document.getElementById('floatingAiInput');
  const floatingAiSend = document.getElementById('floatingAiSend');
  const aiModalChips = document.getElementById('aiModalChips');
  const floatingTelegramBridge = document.getElementById('floatingTelegramBridge');
  const floatingWhatsAppBridge = document.getElementById('floatingWhatsAppBridge');

  const botResponses = {
    cableado: 'En WebServi instalamos cableado 100% Cobre Sólido Cat6A / Cat7 y Fibra Óptica con certificación Fluke Networks punto a punto. Ofrecemos garantía de 3 a 10 años. ¿Deseas coordinar un relevamiento en tu obra?',
    redes: 'Diseñamos redes empresariales con MikroTik RouterOS (conmutación multi-WAN en 300 ms), Wi-Fi 6/7 UniFi de alta cobertura y servidores Proxmox VE con política de backup inmutable 3-2-1.',
    cctv: 'Nuestros sistemas de CCTV integran Inteligencia Artificial para detección perimetral de humanos y vehículos, molinetes biométricos y redundancia de alertas vía Starlink o LoRaWAN ante cortes de internet.',
    domotica: 'Implementamos domótica 100% local con Home Assistant y ThingsBoard industrial, climatización inteligente y respaldo de energía mediante UPS con baterías de Litio Ferrofosfato (LiFePO4).',
    outsourcing: 'Brindamos outsourcing mensualizado de TI actuando como su departamento técnico interno, soporte preventivo/correctivo, capacitaciones profesionales in-company (MikroTik/UniFi/IA) y desarrollo de agentes IA y chatbots seguros.',
    recursos: 'En nuestra sección de Recursos IT dispones de Calculadora de Subredes IP, visor de espectro Wi-Fi (2.4, 5 y 6 GHz), pruebas de velocidad referenciales y directorios DNS con filtros de seguridad.',
    default: '¡Gracias por su consulta! Como asistente de ingeniería de WebServi, puedo orientarle sobre nuestras 6 líneas de especialidad: Planos BIM, Cableado Cat6A, Redes MikroTik/UniFi, CCTV con IA, Domótica con Litio y Outsourcing/IA. Para un presupuesto exacto, puedo transferir esta conversación a Lucas por Telegram (+591 75020555).'
  };

  function openFloatingAi() {
    if (!floatingAiModal) return;
    floatingAiModal.classList.add('active');
    floatingAiModal.setAttribute('aria-hidden', 'false');
    if (floatingAiTrigger) floatingAiTrigger.setAttribute('aria-expanded', 'true');
    if (floatingAiInput) floatingAiInput.focus();
  }

  function closeFloatingAi() {
    if (!floatingAiModal) return;
    floatingAiModal.classList.remove('active');
    floatingAiModal.setAttribute('aria-hidden', 'true');
    if (floatingAiTrigger) floatingAiTrigger.setAttribute('aria-expanded', 'false');
  }

  function appendAiMessage(text, isUser = false) {
    if (!floatingAiMessages) return;
    const bubble = document.createElement('div');
    bubble.className = `ai-bubble ${isUser ? 'ai-bubble-user' : 'ai-bubble-bot'}`;
    bubble.textContent = text;
    floatingAiMessages.appendChild(bubble);
    floatingAiMessages.scrollTop = floatingAiMessages.scrollHeight;

    // Update floating bridge links with user's last question
    if (isUser) {
      const encodedMsg = encodeURIComponent(`Hola Lucas, tengo una consulta desde el chat web de WebServi: "${text}"`);
      if (floatingTelegramBridge) floatingTelegramBridge.href = `https://t.me/WebServiBolivia?text=${encodedMsg}`;
      if (floatingWhatsAppBridge) floatingWhatsAppBridge.href = `https://wa.me/59175020555?text=${encodedMsg}`;
    }
  }

  // Configuración del Cloudflare Worker (Opción 2 — EN VIVO)
  const CLOUDFLARE_WORKER_URL = 'https://webservi-ai-bot.lucas-carandino.workers.dev/';
  const chatHistory = [];

  async function handleAiBotReply(userText) {
    chatHistory.push({ isUser: true, text: userText });

    if (CLOUDFLARE_WORKER_URL && CLOUDFLARE_WORKER_URL.trim() !== '') {
      const typingBubble = document.createElement('div');
      typingBubble.className = 'ai-bubble ai-bubble-bot ai-typing';
      typingBubble.textContent = 'Analizando con IA de WebServi...';
      if (floatingAiMessages) {
        floatingAiMessages.appendChild(typingBubble);
        floatingAiMessages.scrollTop = floatingAiMessages.scrollHeight;
      }

      try {
        const response = await fetch(CLOUDFLARE_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            history: chatHistory.slice(-6)
          })
        });

        if (typingBubble.parentNode) typingBubble.parentNode.removeChild(typingBubble);

        if (response.ok) {
          const data = await response.json();
          const reply = data.reply || botResponses.default;
          appendAiMessage(reply, false);
          chatHistory.push({ isUser: false, text: reply });

          if (data.leadDispatched) {
            appendAiMessage('✅ Notificación enviada con éxito al Telegram privado de Lucas (+591 75020555). Te contactará a la brevedad.', false);
          }
          return;
        }
      } catch (err) {
        if (typingBubble.parentNode) typingBubble.parentNode.removeChild(typingBubble);
      }
    }

    // Modo Simulación Local Inteligente (Grounded Fallback)
    const textLower = userText.toLowerCase();
    let reply = botResponses.default;

    if (textLower.includes('cable') || textLower.includes('fluke') || textLower.includes('fibra')) {
      reply = botResponses.cableado;
    } else if (textLower.includes('red') || textLower.includes('wifi') || textLower.includes('wi-fi') || textLower.includes('mikrotik') || textLower.includes('unifi') || textLower.includes('servidor')) {
      reply = botResponses.redes;
    } else if (textLower.includes('camara') || textLower.includes('cámara') || textLower.includes('cctv') || textLower.includes('acceso') || textLower.includes('biometrico')) {
      reply = botResponses.cctv;
    } else if (textLower.includes('domotica') || textLower.includes('domótica') || textLower.includes('ups') || textLower.includes('litio') || textLower.includes('aire')) {
      reply = botResponses.domotica;
    } else if (textLower.includes('outsourcing') || textLower.includes('soporte') || textLower.includes('mantenimiento') || textLower.includes('capacita') || textLower.includes('ia') || textLower.includes('bot')) {
      reply = botResponses.outsourcing;
    } else if (textLower.includes('ip') || textLower.includes('calculadora') || textLower.includes('recurso') || textLower.includes('espectro') || textLower.includes('dns')) {
      reply = botResponses.recursos;
    }

    setTimeout(() => {
      appendAiMessage(reply, false);
      chatHistory.push({ isUser: false, text: reply });
    }, 400);
  }

  if (floatingAiTrigger) {
    floatingAiTrigger.addEventListener('click', () => {
      const isOpen = floatingAiModal && floatingAiModal.classList.contains('active');
      if (isOpen) closeFloatingAi();
      else openFloatingAi();
    });
  }

  if (floatingAiClose) floatingAiClose.addEventListener('click', closeFloatingAi);

  if (floatingAiSend && floatingAiInput) {
    const submitFloatingQuery = () => {
      const val = floatingAiInput.value.trim();
      if (!val) return;
      appendAiMessage(val, true);
      floatingAiInput.value = '';
      handleAiBotReply(val);
    };

    floatingAiSend.addEventListener('click', submitFloatingQuery);
    floatingAiInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitFloatingQuery();
      }
    });
  }

  if (aiModalChips) {
    aiModalChips.querySelectorAll('.mini-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const askKey = chip.dataset.ask;
        const questionText = chip.textContent;
        appendAiMessage(questionText, true);
        const reply = botResponses[askKey] || botResponses.default;
        setTimeout(() => {
          appendAiMessage(reply, false);
        }, 350);
      });
    });
  }

  // Global Keydown for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (photoLightbox && photoLightbox.classList.contains('active')) closeLightbox();
      if (portalModal && portalModal.classList.contains('active')) closePortalModal();
      if (floatingAiModal && floatingAiModal.classList.contains('active')) closeFloatingAi();
    }
    if (photoLightbox && photoLightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') showNextLightboxPhoto();
      if (e.key === 'ArrowLeft') showPrevLightboxPhoto();
    }
  });
});
