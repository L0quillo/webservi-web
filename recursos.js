/**
 * WebServi.Net - Hub de Recursos & Herramientas IT
 * Lógica de Calculadora de Subredes, GeoIP Scripting, Búsqueda en Vivo y Prompts de IA
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE DRAWER NAVIGATION
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('active');
      mobileNavDrawer.classList.toggle('active');
      mobileNavDrawer.setAttribute('aria-hidden', isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (mobileNavDrawer.classList.contains('active')) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.classList.remove('active');
          mobileNavDrawer.classList.remove('active');
          mobileNavDrawer.setAttribute('aria-hidden', 'true');
        }
      }
    });
  }

  // ==========================================
  // 2. LIVE SEARCH FILTER
  // ==========================================
  const searchInput = document.getElementById('resourceSearch');
  const searchCountBadge = document.getElementById('searchCountBadge');
  const brandCards = document.querySelectorAll('.brand-resource-card');
  const promptCards = document.querySelectorAll('.prompt-card');
  const quickToolCards = document.querySelectorAll('.quick-tool-card');

  function filterResources() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    // Filter Brands
    brandCards.forEach(card => {
      const text = (card.textContent + ' ' + (card.dataset.keywords || '')).toLowerCase();
      const match = !q || text.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    // Filter Prompts
    promptCards.forEach(card => {
      const text = (card.textContent + ' ' + (card.dataset.keywords || '')).toLowerCase();
      const match = !q || text.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    // Filter Tools
    quickToolCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = !q || text.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (searchCountBadge) {
      searchCountBadge.textContent = q ? `${visibleCount} coincidencias` : '18 utilidades';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterResources);
  }

  // ==========================================
  // 3. CALCULADORA DE SUBREDES IPV4 / VLSM
  // ==========================================
  const calcIpInput = document.getElementById('calcIp');
  const calcCidrSelect = document.getElementById('calcCidr');
  const btnQuickRecalc = document.getElementById('btnQuickRecalc');
  const btnCopyCalcSummary = document.getElementById('btnCopyCalcSummary');
  const btnCopyCalcText = document.getElementById('btnCopyCalcText');

  const resNetwork = document.getElementById('resNetwork');
  const resNetmask = document.getElementById('resNetmask');
  const resWildcard = document.getElementById('resWildcard');
  const resBroadcast = document.getElementById('resBroadcast');
  const resRange = document.getElementById('resRange');
  const resHosts = document.getElementById('resHosts');
  const resScope = document.getElementById('resScope');

  function parseIp(ipStr) {
    const parts = ipStr.trim().split('.');
    if (parts.length !== 4) return null;
    for (let i = 0; i < 4; i++) {
      const n = parseInt(parts[i], 10);
      if (isNaN(n) || n < 0 || n > 255) return null;
    }
    return (
      ((parseInt(parts[0], 10) << 24) >>> 0) |
      ((parseInt(parts[1], 10) << 16) >>> 0) |
      ((parseInt(parts[2], 10) << 8) >>> 0) |
      (parseInt(parts[3], 10) >>> 0)
    ) >>> 0;
  }

  function intToIp(num) {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  }

  function getIpScope(ipInt) {
    const firstOctet = (ipInt >>> 24) & 255;
    const secondOctet = (ipInt >>> 16) & 255;

    // RFC 1918 Private ranges
    if (firstOctet === 10) return 'Privada (RFC 1918) · Clase A (LAN / Datacenter)';
    if (firstOctet === 172 && (secondOctet >= 16 && secondOctet <= 31)) return 'Privada (RFC 1918) · Clase B';
    if (firstOctet === 192 && secondOctet === 168) return 'Privada (RFC 1918) · Clase C (LAN Corporativa)';
    if (firstOctet === 127) return 'Loopback / Localhost (RFC 1122)';
    if (firstOctet === 169 && secondOctet === 254) return 'APIPA / Link-Local (RFC 3927)';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Multicast (Clase D)';
    return 'Pública / Enrutable en Internet';
  }

  function updateSubnetCalculation() {
    const ipStr = calcIpInput ? calcIpInput.value : '192.168.1.1';
    const cidr = calcCidrSelect ? parseInt(calcCidrSelect.value, 10) : 24;

    const ipInt = parseIp(ipStr);
    if (ipInt === null) {
      if (resNetwork) resNetwork.textContent = 'IP inválida';
      if (resRange) resRange.textContent = 'Por favor ingrese un formato válido (ej: 192.168.1.1)';
      return;
    }

    const mask = cidr === 0 ? 0 : ((0xFFFFFFFF << (32 - cidr)) >>> 0);
    const wildcard = (~mask) >>> 0;
    const netInt = (ipInt & mask) >>> 0;
    const bcastInt = (ipInt | wildcard) >>> 0;

    let usableHosts = 0;
    let firstHost = '';
    let lastHost = '';

    if (cidr === 32) {
      usableHosts = 1;
      firstHost = intToIp(netInt);
      lastHost = intToIp(netInt);
    } else if (cidr === 31) {
      usableHosts = 2;
      firstHost = intToIp(netInt);
      lastHost = intToIp(bcastInt);
    } else {
      usableHosts = Math.max(0, wildcard - 1);
      firstHost = intToIp(netInt + 1);
      lastHost = intToIp(bcastInt - 1);
    }

    if (resNetwork) resNetwork.textContent = intToIp(netInt) + ' /' + cidr;
    if (resNetmask) resNetmask.textContent = intToIp(mask);
    if (resWildcard) resWildcard.textContent = intToIp(wildcard);
    if (resBroadcast) resBroadcast.textContent = intToIp(bcastInt);
    if (resRange) resRange.textContent = `${firstHost} — ${lastHost}`;
    if (resHosts) resHosts.textContent = `${usableHosts.toLocaleString()} hosts útiles`;
    if (resScope) resScope.textContent = getIpScope(ipInt);
  }

  if (calcIpInput) calcIpInput.addEventListener('input', updateSubnetCalculation);
  if (calcCidrSelect) calcCidrSelect.addEventListener('change', updateSubnetCalculation);
  if (btnQuickRecalc) btnQuickRecalc.addEventListener('click', updateSubnetCalculation);

  // Initialize Calculator on page load
  updateSubnetCalculation();

  if (btnCopyCalcSummary) {
    btnCopyCalcSummary.addEventListener('click', () => {
      const summaryText = `--- REPORTE DE SUBRED IPV4 (WEBSERVI.NET) ---
Red / CIDR: ${resNetwork ? resNetwork.textContent : ''}
Máscara: ${resNetmask ? resNetmask.textContent : ''}
Wildcard (ACL): ${resWildcard ? resWildcard.textContent : ''}
Broadcast: ${resBroadcast ? resBroadcast.textContent : ''}
Rango Asignable: ${resRange ? resRange.textContent : ''}
Capacidad: ${resHosts ? resHosts.textContent : ''}
Alcance: ${resScope ? resScope.textContent : ''}
Generado en: https://www.webservi.net/recursos.html`;

      navigator.clipboard.writeText(summaryText).then(() => {
        if (btnCopyCalcText) btnCopyCalcText.textContent = '¡Copiado!';
        setTimeout(() => {
          if (btnCopyCalcText) btnCopyCalcText.textContent = 'Copiar Resumen';
        }, 2200);
      });
    });
  }

  // ==========================================
  // 4. GENERADOR DE RANGOS IP POR PAÍSES (GEOIP)
  // ==========================================
  const countrySelect = document.getElementById('countrySelect');
  const scriptFormat = document.getElementById('scriptFormat');
  const btnDirectZoneLink = document.getElementById('btnDirectZoneLink');
  const geoScriptOutput = document.getElementById('geoScriptOutput');
  const codeFormatTitle = document.getElementById('codeFormatTitle');
  const btnCopyGeoScript = document.getElementById('btnCopyGeoScript');
  const btnCopyGeoText = document.getElementById('btnCopyGeoText');

  // Muestra representativa de los prefijos principales asignados por país
  const countrySampleBlocks = {
    bo: {
      name: "Bolivia",
      blocks: ["45.4.98.0/23", "45.5.13.0/24", "45.68.0.0/22", "45.71.164.0/22", "45.160.100.0/22", "45.163.64.0/22", "45.170.80.0/22", "45.176.4.0/22", "45.177.204.0/22", "45.181.168.0/22", "45.188.16.0/22", "45.191.240.0/22", "181.115.0.0/16", "186.2.0.0/17", "190.104.0.0/16", "190.129.0.0/16", "190.181.0.0/16", "190.186.0.0/16", "200.87.0.0/16", "200.105.128.0/17"]
    },
    br: {
      name: "Brasil",
      blocks: ["177.0.0.0/11", "179.96.0.0/11", "187.0.0.0/11", "189.0.0.0/11", "191.160.0.0/11", "200.128.0.0/11", "201.0.0.0/11"]
    },
    ar: {
      name: "Argentina",
      blocks: ["181.0.0.0/11", "186.0.0.0/11", "190.0.0.0/11", "200.0.0.0/11"]
    },
    cl: {
      name: "Chile",
      blocks: ["181.42.0.0/15", "186.104.0.0/13", "190.8.0.0/13", "200.27.0.0/16", "200.75.0.0/16"]
    },
    pe: {
      name: "Perú",
      blocks: ["181.64.0.0/14", "190.40.0.0/13", "200.37.0.0/16", "200.48.0.0/16"]
    },
    py: {
      name: "Paraguay",
      blocks: ["181.120.0.0/14", "186.16.0.0/15", "190.52.128.0/17", "200.85.96.0/19"]
    },
    co: {
      name: "Colombia",
      blocks: ["181.48.0.0/13", "186.80.0.0/13", "190.64.0.0/13", "200.21.0.0/16"]
    },
    us: {
      name: "Estados Unidos",
      blocks: ["3.0.0.0/9", "4.0.0.0/9", "8.0.0.0/9", "12.0.0.0/9", "15.0.0.0/9", "23.0.0.0/9", "34.0.0.0/9"]
    },
    cn: {
      name: "China",
      blocks: ["1.0.1.0/24", "1.0.2.0/23", "14.0.0.0/11", "27.0.0.0/11", "36.0.0.0/11", "39.0.0.0/11", "42.0.0.0/11"]
    },
    ru: {
      name: "Rusia",
      blocks: ["2.60.0.0/14", "5.16.0.0/12", "31.13.0.0/16", "31.148.0.0/14", "37.18.0.0/15", "46.0.0.0/12"]
    }
  };

  function updateGeoIpScript() {
    const code = countrySelect ? countrySelect.value : 'bo';
    const format = scriptFormat ? scriptFormat.value : 'mikrotik';

    if (code === 'all') {
      if (btnDirectZoneLink) btnDirectZoneLink.href = 'http://www.ipdeny.com/ipblocks/';
      if (codeFormatTitle) codeFormatTitle.textContent = 'IPDeny — Lista de Zonas Mundiales';
      if (geoScriptOutput) geoScriptOutput.textContent = '# Visite http://www.ipdeny.com/ipblocks/ para descargar los bloques CIDR de cualquier país del mundo.\n# Para importar automáticamente en MikroTik, use scripts Fetch periódicos.';
      return;
    }

    const countryData = countrySampleBlocks[code] || countrySampleBlocks.bo;
    if (btnDirectZoneLink) {
      btnDirectZoneLink.href = `http://www.ipdeny.com/ipblocks/data/countries/${code}.zone`;
    }

    let result = '';

    if (format === 'mikrotik') {
      if (codeFormatTitle) codeFormatTitle.textContent = `Script RouterOS — MikroTik Address-List (${countryData.name})`;
      result = `# ==========================================\n# Script MikroTik: Address-List para ${countryData.name} (${code.toUpperCase()})\n# Aplicación: Permitir tráfico local o bloquear en RAW\n# ==========================================\n/ip firewall address-list\n`;
      countryData.blocks.forEach(cidr => {
        result += `add list=PAIS_${code.toUpperCase()} address=${cidr} comment="IPDeny ${countryData.name}"\n`;
      });
      result += `# [Descargue el archivo .zone desde el botón superior para ver todos los prefijos del país]`;
    } else if (format === 'linux-ipset') {
      if (codeFormatTitle) codeFormatTitle.textContent = `Linux ipset / iptables (${countryData.name})`;
      result = `#!/bin/bash\n# Crear conjunto ipset de alta velocidad para ${countryData.name}\nipset create pais_${code} hash:net -exist\n`;
      countryData.blocks.forEach(cidr => {
        result += `ipset add pais_${code} ${cidr}\n`;
      });
      result += `# Regla iptables para vincular:\n# iptables -I INPUT -m set ! --match-set pais_${code} src -p tcp --dport 22 -j DROP\n`;
    } else {
      if (codeFormatTitle) codeFormatTitle.textContent = `Lista CIDR Plana — ${countryData.name} (.txt)`;
      result = countryData.blocks.join('\n');
    }

    if (geoScriptOutput) geoScriptOutput.textContent = result;
  }

  if (countrySelect) countrySelect.addEventListener('change', updateGeoIpScript);
  if (scriptFormat) scriptFormat.addEventListener('change', updateGeoIpScript);

  if (btnCopyGeoScript) {
    btnCopyGeoScript.addEventListener('click', () => {
      const codeText = geoScriptOutput ? geoScriptOutput.textContent : '';
      navigator.clipboard.writeText(codeText).then(() => {
        if (btnCopyGeoText) btnCopyGeoText.textContent = '¡Script Copiado!';
        setTimeout(() => {
          if (btnCopyGeoText) btnCopyGeoText.textContent = 'Copiar Script Generado';
        }, 2200);
      });
    });
  }

  // ==========================================
  // 5. PROMPT COPIERS FOR AI SKILLS
  // ==========================================
  const copyPromptButtons = document.querySelectorAll('.btn-copy-prompt');
  copyPromptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.prompt-card');
      const textElem = card ? card.querySelector('.prompt-text') : null;
      if (!textElem) return;

      navigator.clipboard.writeText(textElem.textContent.trim()).then(() => {
        const span = btn.querySelector('span');
        const orig = span ? span.textContent : 'Copiar Prompt para IA';
        if (span) span.textContent = '¡Prompt Copiado con Éxito!';
        btn.classList.add('copied');
        setTimeout(() => {
          if (span) span.textContent = orig;
          btn.classList.remove('copied');
        }, 2200);
      });
    });
  });

});
