/**
 * WebServi.Net — Telemetría en Vivo & IoT Industrial
 * Lógica interactiva del Dashboard: obtención de datos crudos (JSON),
 * conversión matemática a Mbps, cálculo de frescura, rotación de brújula,
 * histórico en Canvas y refresco programado cada 30 segundos.
 */

(function () {
  'use strict';

  // Configuración de endpoints
  const ENDPOINT_DIRECT = 'https://hacasalucas.webservihosting.com/demodata';
  const ENDPOINT_CORS_PROXY = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(ENDPOINT_DIRECT);
  const ENDPOINT_WORKER = 'https://webservi-ai-bot.lucas-carandino.workers.dev/demodata';

  // Variables de control de refresco
  const REFRESH_INTERVAL_SECONDS = 30;
  let remainingSeconds = REFRESH_INTERVAL_SECONDS;
  let refreshTimerInterval = null;
  let isFetching = false;
  let currentRawData = null;

  // Histórico para el Canvas de tráfico (máximo 20 puntos)
  const trafficHistory = {
    rx: [18.5, 22.1, 26.4, 21.4, 24.8, 28.2, 23.5, 26.8, 30.1, 24.2],
    tx: [4.2, 5.1, 6.2, 5.8, 6.5, 7.1, 5.9, 6.3, 7.8, 6.4]
  };

  // Referencias DOM
  const dom = {
    refreshCircle: document.getElementById('refreshCircle'),
    refreshTimerText: document.getElementById('refreshTimerText'),
    btnRefreshManual: document.getElementById('btnRefreshManual'),
    btnToggleJson: document.getElementById('btnToggleJson'),
    jsonInspectorWrap: document.getElementById('jsonInspectorWrap'),
    jsonRawOutput: document.getElementById('jsonRawOutput'),
    btnCopyJson: document.getElementById('btnCopyJson'),
    statusBadge: document.getElementById('statusBadge'),
    lblTimestamp: document.getElementById('lblTimestamp'),
    lblFreshness: document.getElementById('lblFreshness'),

    // Ancho de banda
    valRxMbps: document.getElementById('valRxMbps'),
    valRxRaw: document.getElementById('valRxRaw'),
    meterRx: document.getElementById('meterRx'),
    valTxMbps: document.getElementById('valTxMbps'),
    valTxRaw: document.getElementById('valTxRaw'),
    meterTx: document.getElementById('meterTx'),
    trafficCanvas: document.getElementById('trafficCanvas'),

    // Meteorología
    valTemp: document.getElementById('valTemp'),
    chipTemp: document.getElementById('chipTemp'),
    valHum: document.getElementById('valHum'),
    chipHum: document.getElementById('chipHum'),
    valLux: document.getElementById('valLux'),
    chipLux: document.getElementById('chipLux'),
    compassNeedle: document.getElementById('compassNeedle'),
    valWind: document.getElementById('valWind'),
    valWindDeg: document.getElementById('valWindDeg'),
    valWindCard: document.getElementById('valWindCard'),

    // Operadores
    badgeEntel: document.getElementById('badgeEntel'),
    badgeTigo: document.getElementById('badgeTigo'),

    // CCTV HUD Time
    hudCctvTime: document.getElementById('hudCctvTime')
  };

  /**
   * Convierte grados azimut (0 - 360°) a dirección cardinal textual
   */
  function degreesToCardinal(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round((deg % 360) / 22.5) % 16;
    return directions[idx];
  }

  /**
   * Convierte kB/s a Mbps
   * Fórmula: 1 kB/s = 8 kbit/s = 0.008 Mbit/s
   */
  function kbToMbps(kbps) {
    if (!kbps || isNaN(kbps)) return '0.00';
    return ((kbps * 8) / 1000).toFixed(2);
  }

  /**
   * Obtiene datos con fallback multinivel
   */
  async function fetchTelemetryData() {
    if (isFetching) return;
    isFetching = true;

    if (dom.btnRefreshManual) {
      dom.btnRefreshManual.classList.add('spin');
    }

    let payload = null;

    // Intento 1: Fetch directo (si CORS lo permite)
    try {
      const c1 = new AbortController();
      const t1 = setTimeout(() => c1.abort(), 2800);
      const res1 = await fetch(ENDPOINT_DIRECT, { signal: c1.signal });
      clearTimeout(t1);
      if (res1.ok) {
        payload = await res1.json();
      }
    } catch (e) {
      // Ignorar e intentar proxy
    }

    // Intento 2: Proxy CORS público AllOrigins (ultra-fiable para browser en local)
    if (!payload) {
      try {
        const c2 = new AbortController();
        const t2 = setTimeout(() => c2.abort(), 3500);
        const res2 = await fetch(ENDPOINT_CORS_PROXY, { signal: c2.signal });
        clearTimeout(t2);
        if (res2.ok) {
          const rawText = await res2.text();
          payload = JSON.parse(rawText);
        }
      } catch (e) {
        // Ignorar e intentar Worker
      }
    }

    // Intento 3: Worker WebServi en Cloudflare
    if (!payload) {
      try {
        const c3 = new AbortController();
        const t3 = setTimeout(() => c3.abort(), 3000);
        const res3 = await fetch(ENDPOINT_WORKER, { signal: c3.signal });
        clearTimeout(t3);
        if (res3.ok) {
          payload = await res3.json();
        }
      } catch (e) {
        // Fallback local
      }
    }

    // Fallback garantizado en caso de offline
    if (!payload) {
      payload = generateRealisticFallback();
    }

    isFetching = false;
    if (dom.btnRefreshManual) {
      dom.btnRefreshManual.classList.remove('spin');
    }

    currentRawData = payload;
    renderDashboard(payload);
    resetCountdown();
  }

  /**
   * Genera datos realistas en caso de pérdida total de internet
   */
  function generateRealisticFallback() {
    const rx = 2400 + Math.random() * 800;
    const tx = 600 + Math.random() * 300;
    return {
      version: 1,
      consultado_en: new Date().toISOString(),
      meteorologia: {
        temperatura_c: +(28.5 + Math.random() * 1.5).toFixed(1),
        humedad_pct: Math.round(70 + Math.random() * 6),
        viento_kmh: +(3.2 + Math.random() * 1.8).toFixed(2),
        direccion_viento_grados: Math.round(310 + Math.random() * 25),
        luminosidad_lx: 0.0
      },
      red: {
        mikrotik_ether1: {
          rx_kB_s: +rx.toFixed(3),
          tx_kB_s: +tx.toFixed(3)
        },
        monitores: {
          entel: "responde",
          tigo: "responde"
        }
      },
      calidad: {
        temperatura_c: { disponible: true, edad_reporte_segundos: 14, reporte_reciente: true },
        rx_kB_s: { disponible: true, edad_reporte_segundos: 8, reporte_reciente: true }
      },
      nota: "Datos locales simulados con estructura idéntica al nodo físico."
    };
  }

  /**
   * Renderiza todos los datos en la interfaz
   */
  function renderDashboard(data) {
    if (!data) return;

    // 1. Timestamp y Estado
    if (dom.lblTimestamp && data.consultado_en) {
      const dt = new Date(data.consultado_en);
      dom.lblTimestamp.textContent = dt.toUTCString().replace('GMT', 'UTC');
    }

    // Actualizar HUD de CCTV
    if (dom.hudCctvTime) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-BO', { hour12: false });
      dom.hudCctvTime.textContent = `REC: 4K UHD · ${timeStr} BOT`;
    }

    // 2. Ancho de Banda (MikroTik Ether1)
    if (data.red && data.red.mikrotik_ether1) {
      const rxRaw = data.red.mikrotik_ether1.rx_kB_s || 0;
      const txRaw = data.red.mikrotik_ether1.tx_kB_s || 0;

      const rxMbps = parseFloat(kbToMbps(rxRaw));
      const txMbps = parseFloat(kbToMbps(txRaw));

      if (dom.valRxMbps) dom.valRxMbps.textContent = rxMbps.toFixed(2);
      if (dom.valRxRaw) dom.valRxRaw.textContent = rxRaw.toLocaleString('es-BO', { maximumFractionDigits: 1 });
      if (dom.meterRx) {
        // Escala normalizada contra 50 Mbps de capacidad
        const pctRx = Math.min(Math.round((rxMbps / 50) * 100), 100);
        dom.meterRx.style.width = Math.max(pctRx, 6) + '%';
      }

      if (dom.valTxMbps) dom.valTxMbps.textContent = txMbps.toFixed(2);
      if (dom.valTxRaw) dom.valTxRaw.textContent = txRaw.toLocaleString('es-BO', { maximumFractionDigits: 1 });
      if (dom.meterTx) {
        // Escala normalizada contra 20 Mbps de subida
        const pctTx = Math.min(Math.round((txMbps / 20) * 100), 100);
        dom.meterTx.style.width = Math.max(pctTx, 6) + '%';
      }

      // Añadir al histórico de canvas
      trafficHistory.rx.push(rxMbps);
      if (trafficHistory.rx.length > 24) trafficHistory.rx.shift();

      trafficHistory.tx.push(txMbps);
      if (trafficHistory.tx.length > 24) trafficHistory.tx.shift();

      drawTrafficCanvas();
    }

    // 3. Meteorología & Clima
    if (data.meteorologia) {
      const m = data.meteorologia;

      // Temperatura
      if (dom.valTemp && m.temperatura_c !== undefined) {
        dom.valTemp.textContent = Number(m.temperatura_c).toFixed(1);
        if (dom.chipTemp) {
          if (m.temperatura_c > 32) {
            dom.chipTemp.className = 'w-state-chip warm';
            dom.chipTemp.textContent = 'Alerta Térmica: Temperatura Elevada';
          } else if (m.temperatura_c >= 25) {
            dom.chipTemp.className = 'w-state-chip warm';
            dom.chipTemp.textContent = 'Rango Operativo Cálido Normal';
          } else {
            dom.chipTemp.className = 'w-state-chip safe';
            dom.chipTemp.textContent = 'Climatización Óptima';
          }
        }
      }

      // Humedad
      if (dom.valHum && m.humedad_pct !== undefined) {
        dom.valHum.textContent = Number(m.humedad_pct).toFixed(0);
        if (dom.chipHum) {
          if (m.humedad_pct > 80) {
            dom.chipHum.textContent = 'Humedad Alta · Supervisión de Condensación';
          } else {
            dom.chipHum.textContent = `${m.humedad_pct}% RH · Nivel Estable`;
          }
        }
      }

      // Luminosidad
      if (dom.valLux && m.luminosidad_lx !== undefined) {
        dom.valLux.textContent = Number(m.luminosidad_lx).toFixed(1);
        if (dom.chipLux) {
          if (m.luminosidad_lx === 0) {
            dom.chipLux.className = 'w-state-chip safe';
            dom.chipLux.textContent = 'Modo Nocturno (0.0 lx · Iluminación Perimetral On)';
          } else {
            dom.chipLux.className = 'w-state-chip safe';
            dom.chipLux.textContent = `${m.luminosidad_lx} Lux · Radiación Diurna`;
          }
        }
      }

      // Viento y Brújula
      if (dom.valWind && m.viento_kmh !== undefined) {
        dom.valWind.textContent = Number(m.viento_kmh).toFixed(2);
      }
      if (dom.valWindDeg && m.direccion_viento_grados !== undefined) {
        const deg = Math.round(m.direccion_viento_grados);
        dom.valWindDeg.textContent = `${deg}°`;

        const card = degreesToCardinal(deg);
        if (dom.valWindCard) dom.valWindCard.textContent = `(${card})`;

        if (dom.compassNeedle) {
          dom.compassNeedle.style.transform = `rotate(${deg}deg)`;
        }
      }
    }

    // 4. Operadores Multi-WAN
    if (data.red && data.red.monitores) {
      const mon = data.red.monitores;
      if (dom.badgeEntel) {
        const ok = (mon.entel === 'responde');
        dom.badgeEntel.className = ok ? 'tele-badge green' : 'tele-badge orange';
        dom.badgeEntel.textContent = ok ? 'RESPONDE' : 'LATENCIA / CAÍDO';
      }
      if (dom.badgeTigo) {
        const ok = (mon.tigo === 'responde');
        dom.badgeTigo.className = ok ? 'tele-badge green' : 'tele-badge orange';
        dom.badgeTigo.textContent = ok ? 'RESPONDE' : 'LATENCIA / CAÍDO';
      }
    }

    // 5. Frescura y SLA
    if (dom.lblFreshness && data.calidad) {
      let maxAge = 0;
      for (const k in data.calidad) {
        if (data.calidad[k] && typeof data.calidad[k].edad_reporte_segundos === 'number') {
          if (data.calidad[k].edad_reporte_segundos > maxAge) {
            maxAge = data.calidad[k].edad_reporte_segundos;
          }
        }
      }
      if (maxAge > 0) {
        dom.lblFreshness.textContent = `Óptima (${maxAge}s lag)`;
      } else {
        dom.lblFreshness.textContent = 'En tiempo real (<15s)';
      }
    }

    // 6. Visor de JSON
    if (dom.jsonRawOutput) {
      dom.jsonRawOutput.textContent = JSON.stringify(data, null, 2);
    }
  }

  /**
   * Dibuja el gráfico en tiempo real en el elemento Canvas
   */
  function drawTrafficCanvas() {
    const canvas = dom.trafficCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Fondo tenue
    ctx.fillStyle = 'rgba(6, 10, 18, 0.9)';
    ctx.fillRect(0, 0, width, height);

    // Rejilla sutil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let y = 15; y < height; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const rxData = trafficHistory.rx;
    const txData = trafficHistory.tx;
    const totalPoints = rxData.length;
    if (totalPoints < 2) return;

    // Escala vertical: máximo de los datos con margen
    const maxVal = Math.max(...rxData, ...txData, 35);
    const stepX = width / (totalPoints - 1);

    // Función auxiliar para dibujar curva
    function drawLine(points, strokeColor, fillColor) {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const x = i * stepX;
        const y = height - (points[i] / maxVal) * (height - 18) - 4;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Dibujar área de relleno
      if (fillColor) {
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      // Trazar línea principal
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const x = i * stepX;
        const y = height - (points[i] / maxVal) * (height - 18) - 4;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Punto en el último valor
      const lastX = (points.length - 1) * stepX;
      const lastY = height - (points[points.length - 1] / maxVal) * (height - 18) - 4;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = strokeColor;
      ctx.fill();
    }

    // Rellenos con degradado
    const gradRx = ctx.createLinearGradient(0, 0, 0, height);
    gradRx.addColorStop(0, 'rgba(0, 210, 255, 0.25)');
    gradRx.addColorStop(1, 'rgba(0, 210, 255, 0.0)');

    const gradTx = ctx.createLinearGradient(0, 0, 0, height);
    gradTx.addColorStop(0, 'rgba(255, 145, 0, 0.2)');
    gradTx.addColorStop(1, 'rgba(255, 145, 0, 0.0)');

    drawLine(rxData, '#00d2ff', gradRx);
    drawLine(txData, '#ff9100', gradTx);
  }

  /**
   * Resetea el contador de 30 segundos
   */
  function resetCountdown() {
    remainingSeconds = REFRESH_INTERVAL_SECONDS;
    updateCountdownUI();
  }

  /**
   * Actualiza el indicador visual de cuenta regresiva
   */
  function updateCountdownUI() {
    if (dom.refreshTimerText) {
      dom.refreshTimerText.textContent = `${remainingSeconds}s`;
    }

    if (dom.refreshCircle) {
      // Circunferencia r=10 => 2 * PI * 10 ≈ 62.83
      const totalDash = 63;
      const progress = (REFRESH_INTERVAL_SECONDS - remainingSeconds) / REFRESH_INTERVAL_SECONDS;
      const offset = totalDash * (1 - progress);
      dom.refreshCircle.style.strokeDashoffset = offset;
    }
  }

  /**
   * Ciclo de temporizador (tick cada 1 segundo)
   */
  function startTimerCycle() {
    if (refreshTimerInterval) clearInterval(refreshTimerInterval);

    refreshTimerInterval = setInterval(() => {
      remainingSeconds--;
      updateCountdownUI();

      if (remainingSeconds <= 0) {
        fetchTelemetryData();
      }
    }, 1000);
  }

  /**
   * Inicialización de eventos y primera carga
   */
  function init() {
    // 1. Botón manual de refresco
    if (dom.btnRefreshManual) {
      dom.btnRefreshManual.addEventListener('click', () => {
        fetchTelemetryData();
      });
    }

    // 2. Toggle para ver JSON crudo
    if (dom.btnToggleJson && dom.jsonInspectorWrap) {
      dom.btnToggleJson.addEventListener('click', () => {
        const isHidden = dom.jsonInspectorWrap.style.display === 'none';
        dom.jsonInspectorWrap.style.display = isHidden ? 'block' : 'none';
        dom.btnToggleJson.querySelector('span').textContent = isHidden ? 'Ocultar JSON' : 'Inspeccionar JSON';
      });
    }

    // 3. Copiar JSON al portapapeles
    if (dom.btnCopyJson && dom.jsonRawOutput) {
      dom.btnCopyJson.addEventListener('click', () => {
        const text = dom.jsonRawOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const original = dom.btnCopyJson.innerHTML;
          dom.btnCopyJson.innerHTML = '<span>¡Copiado! ✓</span>';
          setTimeout(() => {
            dom.btnCopyJson.innerHTML = original;
          }, 2000);
        });
      });
    }

    // 4. Renderizado inmediato de datos base y canvas
    const initialData = generateRealisticFallback();
    currentRawData = initialData;
    renderDashboard(initialData);
    drawTrafficCanvas();

    // 5. Primera solicitud asíncrona de datos en vivo
    fetchTelemetryData();

    // 6. Iniciar cuenta regresiva cíclica
    startTimerCycle();
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
