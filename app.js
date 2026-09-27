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
    document.getElementById('ambientVid5')
  ];

  // Clusters
  const clusters = document.querySelectorAll('.line-cluster');

  // IntersectionObserver for Story-Scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.2
  };

  function updateSidebar(cluster) {
    const lineNum = cluster.dataset.line;
    const title = cluster.dataset.title;
    const eyebrow = cluster.dataset.eyebrow;
    const quote = cluster.dataset.quote;
    const specs = (cluster.dataset.specs || '').split(',');
    const ctaText = cluster.dataset.cta;
    const waMsg = encodeURIComponent(cluster.dataset.msg || 'Hola WebServi, deseo cotizar un proyecto');

    // Update Counter & Progress
    if (lineCounter) lineCounter.textContent = `LÍNEA 0${lineNum} DE 05`;
    if (progressBar) progressBar.style.width = `${lineNum * 20}%`;

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateSidebar(entry.target);
      }
    });
  }, observerOptions);

  clusters.forEach(c => observer.observe(c));

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
      type: "GESTIÓN WI-FI & SWITCHES",
      title: "Servidor UniFi Controller WebServi",
      desc: "Acceso al controlador centralizado de redes UniFi. Ingrese con el usuario y contraseña asignados por WebServi para administrar sus puntos de acceso, switches, redes de invitados y métricas de tráfico.",
      protocol: "HTTPS SSL / TLS 1.3 (Puerto Seguro)",
      url: "https://unifi.ui.com/"
    },
    uisp: {
      type: "TELECOMUNICACIONES & RADIOENLACES",
      title: "Plataforma UISP Antenas & Enlaces",
      desc: "Monitoreo en tiempo real de torres de comunicaciones, radioenlaces de 5, 25 y 60 GHz, antenas punto a punto y enlaces Starlink. Visualice latencia, alineación y capacidad de throughput en vivo.",
      protocol: "WSS / HTTPS Seguro 256-bit",
      url: "https://uisp.ui.com/"
    },
    domotica: {
      type: "CONTROL RESIDENCIAL & INMÓTICA",
      title: "Acceso a Domóticas Remotas (Paneles de Control)",
      desc: "Portal de enlace seguro a sus paneles de control domótico y Home Assistant. Monitoree iluminación, climatización Gree/Daikin, estado de baterías solares y apertura de accesos de su inmueble desde cualquier lugar.",
      protocol: "WireGuard VPN / HTTPS Cifrado",
      url: "https://wa.me/59175020555?text=Hola%20WebServi,%20deseo%20asistencia%20para%20acceder%20a%20mi%20panel%20de%20domótica"
    },
    thingsboard: {
      type: "TELEMETRÍA INDUSTRIAL & LORAWAN",
      title: "Dashboard IoT ThingsBoard WebServi",
      desc: "Plataforma de telemetría y supervisión de variables críticas. Visualice presión de vapor en calderas, caudalímetros, temperatura de procesos, niveles de granos en silos y niveles de agua en tiempo real.",
      protocol: "MQTT / REST API / HTTPS Dashboard",
      url: "https://thingsboard.cloud/"
    },
    monitoreo: {
      type: "INFRAESTRUCTURA CRÍTICA & SERVIDORES",
      title: "Centro de Monitoreos Remotos & Uptime",
      desc: "Supervisión 24/7 del estado de servidores Proxmox, VMware, enlaces de internet multi-WAN y alarmas de seguridad perimetral de sus instalaciones.",
      protocol: "SNMP v3 / Agentless Telemetry",
      url: "https://wa.me/59175020555?text=Hola%20WebServi,%20deseo%20consultar%20el%20estado%20de%20monitoreo%20de%20mis%20servicios"
    }
  };

  const portalModal = document.getElementById('portalModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPlatformType = document.getElementById('modalPlatformType');
  const modalPlatformTitle = document.getElementById('modalPlatformTitle');
  const modalPlatformDesc = document.getElementById('modalPlatformDesc');
  const modalPlatformProtocol = document.getElementById('modalPlatformProtocol');
  const modalLaunchBtn = document.getElementById('modalLaunchBtn');

  function openPortalModal(platformKey) {
    const data = platformsData[platformKey];
    if (!data || !portalModal) return;

    if (modalPlatformType) modalPlatformType.textContent = data.type;
    if (modalPlatformTitle) modalPlatformTitle.textContent = data.title;
    if (modalPlatformDesc) modalPlatformDesc.textContent = data.desc;
    if (modalPlatformProtocol) modalPlatformProtocol.textContent = data.protocol;
    if (modalLaunchBtn) modalLaunchBtn.href = data.url;

    portalModal.classList.add('active');
    portalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePortalModal() {
    if (!portalModal) return;
    portalModal.classList.remove('active');
    portalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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
        "img/portfolio/servers-nas-bjobs.webp",
        "img/portfolio/racks-y-datacenters.webp",
        "img/portfolio/rack-redes.webp",
        "img/portfolio/racks-oficinas-y-redes.webp",
        "img/portfolio/voip-servers.webp"
      ]
    },
    "linea-3-card-4": {
      title: "Backup Estricto 3-2-1 & Nube Híbrida",
      images: [
        "img/portfolio/redes-cctv-nas-rack.webp",
        "img/portfolio/rack-datos-red-cctv-servers-nas-cableado-routers.webp",
        "img/portfolio/monitoreo-redes-nube.webp",
        "img/portfolio/rack-y-datos.webp"
      ]
    },
    "linea-4-card-1": {
      title: "CCTV con IA & Almacenamiento Masivo",
      images: [
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

  // Global Keydown for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (photoLightbox && photoLightbox.classList.contains('active')) closeLightbox();
      if (portalModal && portalModal.classList.contains('active')) closePortalModal();
    }
    if (photoLightbox && photoLightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') showNextLightboxPhoto();
      if (e.key === 'ArrowLeft') showPrevLightboxPhoto();
    }
  });
});
