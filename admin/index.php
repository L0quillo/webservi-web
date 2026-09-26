<?php
session_start();
$isLogged = isset($_SESSION['webservi_admin_logged']) && $_SESSION['webservi_admin_logged'] === true;
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WebServi CMS — Panel de Administración</title>
  <link rel="icon" type="image/png" href="../favicon.png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap">
  <style>
    :root {
      --navy-900: #061325;
      --navy-800: #0a1f3d;
      --blue-600: #0751a0;
      --blue-500: #0d6efd;
      --blue-50: #f1f7fe;
      --orange-500: #f5811f;
      --orange-600: #d9690c;
      --slate-800: #1e293b;
      --slate-600: #475569;
      --slate-400: #94a3b8;
      --slate-200: #e2e8f0;
      --slate-100: #f8fafc;
      --white: #ffffff;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
      --font-head: 'Space Grotesk', var(--font-main);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-main);
      background-color: #f1f5f9;
      color: var(--slate-800);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: var(--navy-900);
      color: var(--white);
      padding: 16px 24px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header-wrap {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-box img {
      height: 38px;
      background: #fff;
      padding: 4px 8px;
      border-radius: var(--radius-sm);
    }
    .brand-title {
      font-family: var(--font-head);
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand-badge {
      font-size: 0.75rem;
      background: rgba(245,129,31,0.2);
      color: var(--orange-500);
      padding: 2px 8px;
      border-radius: 99px;
      font-weight: 700;
    }
    .top-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .btn-primary { background: var(--blue-600); color: #fff; }
    .btn-primary:hover { background: #054080; }
    .btn-accent { background: var(--orange-500); color: #fff; }
    .btn-accent:hover { background: var(--orange-600); }
    .btn-ghost { background: transparent; color: var(--slate-400); border: 1px solid rgba(255,255,255,0.2); }
    .btn-ghost:hover { color: #fff; border-color: #fff; }

    /* Layout */
    .admin-main {
      max-width: 1200px;
      margin: 30px auto;
      padding: 0 20px;
      width: 100%;
      flex-grow: 1;
    }

    /* Login Card */
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
    }
    .login-card {
      background: #fff;
      padding: 40px;
      border-radius: var(--radius-lg);
      box-shadow: 0 20px 40px -15px rgba(6,19,37,0.1);
      width: 100%;
      max-width: 440px;
      border: 1px solid var(--slate-200);
      text-align: center;
    }
    .login-card img {
      height: 55px;
      margin: 0 auto 20px;
    }
    .login-card h2 {
      font-family: var(--font-head);
      margin-bottom: 8px;
      font-size: 1.5rem;
    }
    .login-card p {
      color: var(--slate-600);
      font-size: 0.9rem;
      margin-bottom: 24px;
    }

    /* Tabs */
    .tab-bar {
      display: flex;
      gap: 8px;
      border-bottom: 2px solid var(--slate-200);
      margin-bottom: 30px;
      overflow-x: auto;
    }
    .tab-btn {
      padding: 12px 20px;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--slate-600);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }
    .tab-btn:hover { color: var(--blue-600); }
    .tab-btn.active {
      color: var(--blue-600);
      border-bottom-color: var(--blue-600);
    }

    /* Editor Sections */
    .editor-section {
      display: none;
    }
    .editor-section.active {
      display: block;
    }
    .card {
      background: #fff;
      border-radius: var(--radius-md);
      padding: 28px;
      border: 1px solid var(--slate-200);
      margin-bottom: 24px;
      box-shadow: 0 4px 12px -2px rgba(10,31,61,0.04);
    }
    .card h3 {
      font-family: var(--font-head);
      font-size: 1.25rem;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-desc {
      color: var(--slate-600);
      font-size: 0.88rem;
      margin-bottom: 20px;
    }

    /* Form Fields */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .form-group {
      margin-bottom: 18px;
    }
    .form-group label {
      display: block;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 6px;
      color: var(--slate-800);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--slate-200);
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--slate-800);
      background: #fff;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      outline: none;
      border-color: var(--blue-600);
      box-shadow: 0 0 0 3px rgba(7,81,160,0.12);
    }
    textarea.form-control {
      resize: vertical;
      min-height: 85px;
    }

    /* Floating Save Bar */
    .save-bar {
      position: sticky;
      bottom: 20px;
      background: var(--navy-900);
      color: #fff;
      padding: 16px 28px;
      border-radius: var(--radius-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 90;
      margin-top: 40px;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #166534;
      color: #fff;
      padding: 14px 22px;
      border-radius: var(--radius-md);
      font-weight: 700;
      display: none;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>

<?php if (!$isLogged): ?>
  <!-- LOGIN VIEW -->
  <div class="login-container">
    <div class="login-card">
      <img src="../assets/logos/LOGO GRANDE WEBSERVI.png" alt="WebServi.Net" onerror="this.src='../assets/logos/v2-logo.png'">
      <h2>Gestor de Contenido</h2>
      <p>Panel visual de administración de WebServi.Net</p>
      
      <form id="loginForm">
        <div class="form-group" style="text-align: left;">
          <label>Contraseña de Acceso</label>
          <input class="form-control" type="password" id="loginPassword" required placeholder="Ingrese contraseña...">
        </div>
        <div id="loginError" style="color: #dc2626; font-size: 0.85rem; margin-bottom: 14px; display: none;"></div>
        <button class="btn btn-primary" style="width: 100%; justify-content: center;" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  </div>

<?php else: ?>
  <!-- ADMIN DASHBOARD -->
  <header>
    <div class="header-wrap">
      <div class="brand-box">
        <img src="../assets/logos/LOGO GRANDE WEBSERVI.png" alt="WebServi.Net" onerror="this.src='../assets/logos/v2-logo.png'">
        <div class="brand-title">WebServi <span class="brand-badge">CMS</span></div>
      </div>
      <div class="top-actions">
        <a class="btn btn-ghost" href="../" target="_blank">Ver Web en Vivo ↗</a>
        <button class="btn btn-ghost" id="btnLogout">Cerrar Sesión</button>
      </div>
    </div>
  </header>

  <main class="admin-main">
    <div class="tab-bar">
      <button class="tab-btn active" data-tab="general">🌐 General & Contacto</button>
      <button class="tab-btn" data-tab="soluciones">⚡ Soluciones B2B</button>
      <button class="tab-btn" data-tab="sectores">🏢 Sectores</button>
      <button class="tab-btn" data-tab="seguridad">🔒 Cambiar Contraseña</button>
    </div>

    <!-- TAB 1: GENERAL -->
    <div class="editor-section active" id="sec-general">
      <div class="card">
        <h3>📞 Datos de Contacto Directo</h3>
        <p class="card-desc">Estos valores se actualizan en el encabezado, pie de página y botones de acción.</p>
        <div class="form-grid">
          <div class="form-group">
            <label>Teléfono Visible</label>
            <input class="form-control" type="text" id="site_phone">
          </div>
          <div class="form-group">
            <label>WhatsApp (Sin signos, ej. 59175020555)</label>
            <input class="form-control" type="text" id="site_whatsapp">
          </div>
          <div class="form-group">
            <label>Correo Electrónico</label>
            <input class="form-control" type="email" id="site_email">
          </div>
          <div class="form-group">
            <label>Aviso Superior</label>
            <input class="form-control" type="text" id="site_notice">
          </div>
        </div>
      </div>

      <div class="card">
        <h3>🚀 Portada Principal (Hero)</h3>
        <p class="card-desc">El mensaje principal que leen los gerentes y clientes al entrar a la página.</p>
        <div class="form-group">
          <label>Etiqueta Superior (Eyebrow)</label>
          <input class="form-control" type="text" id="hero_tag">
        </div>
        <div class="form-group">
          <label>Título Principal</label>
          <input class="form-control" type="text" id="hero_title">
        </div>
        <div class="form-group">
          <label>Texto Descriptivo (Subtítulo)</label>
          <textarea class="form-control" id="hero_lead" rows="3"></textarea>
        </div>
      </div>
    </div>

    <!-- TAB 2: SOLUCIONES -->
    <div class="editor-section" id="sec-soluciones">
      <div id="solutionsEditorContainer">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- TAB 3: SECTORES -->
    <div class="editor-section" id="sec-sectores">
      <div id="sectorsEditorContainer">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- TAB 4: SEGURIDAD -->
    <div class="editor-section" id="sec-seguridad">
      <div class="card" style="max-width: 500px;">
        <h3>🔒 Cambiar Contraseña del Administrador</h3>
        <p class="card-desc">Defina una nueva clave para acceder a este panel de administración.</p>
        
        <form id="changePassForm">
          <div class="form-group">
            <label>Nueva Contraseña (mínimo 6 caracteres)</label>
            <input class="form-control" type="password" id="new_admin_password" required minlength="6">
          </div>
          <button class="btn btn-primary" type="submit">Actualizar Contraseña</button>
        </form>
      </div>
    </div>

    <!-- FLOATING SAVE BAR -->
    <div class="save-bar">
      <div>
        <div style="font-weight: 700;">Panel WebServi CMS</div>
        <div style="font-size: 0.85rem; color: #94a3b8;">Los cambios se publican de inmediato en la web en vivo.</div>
      </div>
      <button class="btn btn-accent" id="btnSaveAll" style="font-size: 1rem; padding: 12px 28px;">
        <span>💾 Guardar y Publicar</span>
      </button>
    </div>
  </main>
<?php endif; ?>

<div class="toast" id="toast">✓ <span id="toastMsg">Cambios guardados con éxito</span></div>

<script>
let currentData = null;

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  m.textContent = msg;
  t.style.background = isError ? '#dc2626' : '#166534';
  t.style.display = 'flex';
  setTimeout(() => { t.style.display = 'none'; }, 3500);
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pass = document.getElementById('loginPassword').value;
    const err = document.getElementById('loginError');
    err.style.display = 'none';

    try {
      const res = await fetch('api.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      } else {
        err.textContent = data.error || 'Contraseña incorrecta';
        err.style.display = 'block';
      }
    } catch (e) {
      err.textContent = 'Error de conexión con el servidor.';
      err.style.display = 'block';
    }
  });
}

// Logout
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', async () => {
    await fetch('api.php?action=logout');
    window.location.reload();
  });
}

// Change Password
const passForm = document.getElementById('changePassForm');
if (passForm) {
  passForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPass = document.getElementById('new_admin_password').value;
    const res = await fetch('api.php?action=change_password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_password: newPass })
    });
    const d = await res.json();
    if (d.success) {
      showToast(d.message || 'Contraseña actualizada');
      passForm.reset();
    } else {
      showToast(d.error || 'Error al cambiar contraseña', true);
    }
  });
}

// Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('sec-' + tab);
    if (target) target.classList.add('active');
  });
});

// Load Content
async function loadContent() {
  try {
    const res = await fetch('api.php?action=get_content');
    if (!res.ok) return;
    currentData = await res.json();
    populateForm(currentData);
  } catch (e) {
    console.error('Error cargando content.json:', e);
  }
}

function populateForm(data) {
  if (!data) return;

  // General
  if (data.site) {
    document.getElementById('site_phone').value = data.site.phone || '';
    document.getElementById('site_whatsapp').value = data.site.whatsapp || '';
    document.getElementById('site_email').value = data.site.email || '';
    document.getElementById('site_notice').value = data.site.notice || '';
    document.getElementById('hero_tag').value = data.site.heroTag || '';
    document.getElementById('hero_title').value = data.site.heroTitle || '';
    document.getElementById('hero_lead').value = data.site.heroLead || '';
  }

  // Soluciones
  const solContainer = document.getElementById('solutionsEditorContainer');
  if (solContainer && data.solutions) {
    solContainer.innerHTML = Object.keys(data.solutions).map(key => {
      const s = data.solutions[key];
      return `
        <div class="card" data-solution-key="${key}">
          <h3>${s.icon || '⚡'} ${s.title} (${s.code || key})</h3>
          <p class="card-desc">Edite los detalles técnicos de esta solución.</p>
          <div class="form-grid">
            <div class="form-group">
              <label>Título Completo</label>
              <input class="form-control sol-title" type="text" value="${escapeHtml(s.title || '')}">
            </div>
            <div class="form-group">
              <label>Título Corto</label>
              <input class="form-control sol-short" type="text" value="${escapeHtml(s.shortTitle || '')}">
            </div>
            <div class="form-group">
              <label>Icono (Emoji)</label>
              <input class="form-control sol-icon" type="text" value="${escapeHtml(s.icon || '')}">
            </div>
          </div>
          <div class="form-group">
            <label>Subtítulo / Lead</label>
            <input class="form-control sol-lead" type="text" value="${escapeHtml(s.lead || '')}">
          </div>
          <div class="form-group">
            <label>Descripción General (Blurb)</label>
            <textarea class="form-control sol-blurb">${escapeHtml(s.blurb || '')}</textarea>
          </div>
          <div class="form-group">
            <label>El Reto Operativo (Qué resuelve)</label>
            <textarea class="form-control sol-need">${escapeHtml(s.need || '')}</textarea>
          </div>
          <div class="form-group">
            <label>Componentes / Viñetas (Una por línea)</label>
            <textarea class="form-control sol-parts" rows="4">${(s.parts || []).join('\n')}</textarea>
          </div>
          <div class="form-group">
            <label>Audiencia / Entornos</label>
            <input class="form-control sol-audience" type="text" value="${escapeHtml(s.audience || '')}">
          </div>
        </div>
      `;
    }).join('');
  }

  // Sectores
  const secContainer = document.getElementById('sectorsEditorContainer');
  if (secContainer && data.sectors) {
    secContainer.innerHTML = data.sectors.map((sec, idx) => `
      <div class="card" data-sector-idx="${idx}">
        <h3>${sec.icon || '🏢'} Sector: ${sec.name}</h3>
        <p class="card-desc">Información orientada al entorno del cliente.</p>
        <div class="form-grid">
          <div class="form-group">
            <label>Nombre del Sector</label>
            <input class="form-control sec-name" type="text" value="${escapeHtml(sec.name || '')}">
          </div>
          <div class="form-group">
            <label>Resumen Breve</label>
            <input class="form-control sec-summary" type="text" value="${escapeHtml(sec.summary || '')}">
          </div>
        </div>
        <div class="form-group">
          <label>Titular de Impacto</label>
          <input class="form-control sec-headline" type="text" value="${escapeHtml(sec.headline || '')}">
        </div>
        <div class="form-group">
          <label>Descripción del Enfoque</label>
          <textarea class="form-control sec-desc">${escapeHtml(sec.description || '')}</textarea>
        </div>
        <div class="form-group">
          <label>Puntos Clave / Destacados (Uno por línea)</label>
          <textarea class="form-control sec-highlights" rows="3">${(sec.highlights || []).join('\n')}</textarea>
        </div>
      </div>
    `).join('');
  }
}

function escapeHtml(str) {
  return String(str).replace(/"/g, '&quot;');
}

// Save All
const btnSaveAll = document.getElementById('btnSaveAll');
if (btnSaveAll) {
  btnSaveAll.addEventListener('click', async () => {
    if (!currentData) currentData = {};
    if (!currentData.site) currentData.site = {};

    // Collect General
    currentData.site.phone = document.getElementById('site_phone').value;
    currentData.site.whatsapp = document.getElementById('site_whatsapp').value;
    currentData.site.email = document.getElementById('site_email').value;
    currentData.site.notice = document.getElementById('site_notice').value;
    currentData.site.heroTag = document.getElementById('hero_tag').value;
    currentData.site.heroTitle = document.getElementById('hero_title').value;
    currentData.site.heroLead = document.getElementById('hero_lead').value;

    // Collect Soluciones
    document.querySelectorAll('[data-solution-key]').forEach(el => {
      const key = el.getAttribute('data-solution-key');
      if (currentData.solutions && currentData.solutions[key]) {
        const s = currentData.solutions[key];
        s.title = el.querySelector('.sol-title').value;
        s.shortTitle = el.querySelector('.sol-short').value;
        s.icon = el.querySelector('.sol-icon').value;
        s.lead = el.querySelector('.sol-lead').value;
        s.blurb = el.querySelector('.sol-blurb').value;
        s.need = el.querySelector('.sol-need').value;
        s.audience = el.querySelector('.sol-audience').value;
        const partsText = el.querySelector('.sol-parts').value;
        s.parts = partsText.split('\n').map(p => p.trim()).filter(Boolean);
      }
    });

    // Collect Sectores
    document.querySelectorAll('[data-sector-idx]').forEach(el => {
      const idx = parseInt(el.getAttribute('data-sector-idx'), 10);
      if (currentData.sectors && currentData.sectors[idx]) {
        const sec = currentData.sectors[idx];
        sec.name = el.querySelector('.sec-name').value;
        sec.summary = el.querySelector('.sec-summary').value;
        sec.headline = el.querySelector('.sec-headline').value;
        sec.description = el.querySelector('.sec-desc').value;
        const hText = el.querySelector('.sec-highlights').value;
        sec.highlights = hText.split('\n').map(h => h.trim()).filter(Boolean);
      }
    });

    // Send API save
    btnSaveAll.disabled = true;
    btnSaveAll.textContent = 'Guardando...';

    try {
      const res = await fetch('api.php?action=save_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData)
      });
      const resp = await res.json();
      if (resp.success) {
        showToast('¡Contenido guardado y publicado con éxito!');
      } else {
        showToast(resp.error || 'Error al guardar cambios', true);
      }
    } catch (e) {
      showToast('Error de conexión al guardar', true);
    } finally {
      btnSaveAll.disabled = false;
      btnSaveAll.innerHTML = '<span>💾 Guardar y Publicar</span>';
    }
  });
}

if (document.getElementById('sec-general')) {
  loadContent();
}
</script>
</body>
</html>
