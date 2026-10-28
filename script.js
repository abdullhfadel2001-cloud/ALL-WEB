// ==========================================
// DAEM - Core Script
// ==========================================

// قائمة التطبيقات الافتراضية (فارغة حالياً حسب طلبك)
const DEFAULT_APPS = [];

const CATEGORY_INFO = {
  android: { label: 'ANDROID', cls: 'cat-android' },
  tools:   { label: 'TOOLS',   cls: 'cat-tools'   },
  games:   { label: 'GAMES',   cls: 'cat-games'   },
  web:     { label: 'WEB APP', cls: 'cat-web'      }
};

let apps = [];
let filterCat = 'all';
let searchQ = '';

// --- إدارة البيانات ---
function loadApps() {
  const custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  apps = [...custom, ...DEFAULT_APPS];
  renderApps();
}

function saveApp(app) {
  const custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  custom.unshift(app);
  localStorage.setItem('daem_apps', JSON.stringify(custom));
  loadApps();
  toast(`⚡ "${app.name}" added to My Applications!`);
}

function deleteApp(id) {
  let custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  custom = custom.filter(a => a.id !== id);
  localStorage.setItem('daem_apps', JSON.stringify(custom));
  loadApps();
  toast('Application removed.');
}

// --- عرض البطاقات ---
function renderApps() {
  const grid = document.getElementById('appsGrid');
  grid.innerHTML = '';

  const filtered = apps.filter(app => {
    const catOk = filterCat === 'all' || app.category === filterCat;
    const q = searchQ.toLowerCase();
    const searchOk = !q || app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="e-icon">⚡</div>
        <h3>NO APPLICATIONS YET</h3>
        <p>Projects will be listed here soon. You can add new apps anytime using the button below.</p>
      </div>`;
    return;
  }

  filtered.forEach(app => {
    const cat = CATEGORY_INFO[app.category] || CATEGORY_INFO.tools;
    const card = document.createElement('div');
    card.className = 'app-card';

    const demoBtn = app.demoUrl && app.demoUrl !== '#'
      ? `<a href="${esc(app.demoUrl)}" target="_blank" class="btn-demo">👁️ Demo</a>`
      : '';

    const delBtn = app.isCustom
      ? `<button class="btn-del del-trigger" data-id="${app.id}" title="Remove">🗑️</button>`
      : '';

    const dlAttr = app.downloadUrl && app.downloadUrl !== '#' && !app.downloadUrl.startsWith('http')
      ? `download="${esc(app.name)}"` : '';

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${app.icon || '📦'}</div>
        <div class="card-title-area">
          <div class="card-name">${esc(app.name)}</div>
          <span class="cat-badge ${cat.cls}">${cat.label}</span>
        </div>
      </div>
      <p class="card-desc">${esc(app.desc)}</p>
      <div class="card-meta">
        <span class="meta-pill">🏷️ ${esc(app.version || 'v1.0')}</span>
        <span class="meta-pill">💾 ${esc(app.size || '—')}</span>
        <span class="meta-pill">📅 ${esc(app.date || 'Recent')}</span>
      </div>
      <div class="card-actions">
        <a href="${esc(app.downloadUrl)}" ${dlAttr} class="btn-dl">⬇️ DOWNLOAD</a>
        ${demoBtn}
        ${delBtn}
      </div>`;

    grid.appendChild(card);
  });

  grid.querySelectorAll('.del-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (confirm('Delete this application from DAEM?')) {
        deleteApp(e.currentTarget.dataset.id);
      }
    });
  });
}

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// --- البحث والفلترة ---
function setupFilters() {
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQ = e.target.value.trim();
    renderApps();
  });

  document.querySelectorAll('.ftab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCat = btn.dataset.cat;
      renderApps();
    });
  });
}

// --- Modal إضافة تطبيق ---
function setupModal() {
  const modal      = document.getElementById('addModal');
  const openBtn    = document.getElementById('addAppBtn');
  const navOpenBtn = document.getElementById('addAppNavBtn');
  const closeBtn   = document.getElementById('closeModal');
  const cancel     = document.getElementById('cancelModal');
  const form       = document.getElementById('addAppForm');

  const open  = () => { modal.classList.add('open'); document.getElementById('fName').focus(); };
  const close = () => { modal.classList.remove('open'); form.reset(); };

  if (openBtn) openBtn.addEventListener('click', open);
  if (navOpenBtn) navOpenBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (cancel) cancel.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const app = {
      id: 'custom_' + Date.now(),
      name: document.getElementById('fName').value.trim(),
      category: document.getElementById('fCat').value,
      icon: document.getElementById('fIcon').value.trim() || '🚀',
      version: document.getElementById('fVersion').value.trim() || 'v1.0.0',
      size: document.getElementById('fSize').value.trim() || '—',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      desc: document.getElementById('fDesc').value.trim(),
      downloadUrl: document.getElementById('fUrl').value.trim(),
      demoUrl: document.getElementById('fDemo').value.trim() || '#',
      isCustom: true
    };
    saveApp(app);
    close();
  });
}

// --- تأثير البرق الكهربائي العشوائي في السماء ---
function setupLightning() {
  const container = document.getElementById('lightningBg');
  if (!container) return;

  function spawnBolt() {
    const bolt = document.createElement('div');
    const x = Math.random() * 100;
    const h = 40 + Math.random() * 70;
    const opacity = 0.05 + Math.random() * 0.1;

    bolt.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${Math.random() * 50}%;
      width: 1px;
      height: ${h}px;
      background: linear-gradient(180deg, #00c8ff, #8b00ff, transparent);
      opacity: ${opacity};
      pointer-events: none;
      animation: boltFade 0.4s ease-out forwards;
    `;

    container.appendChild(bolt);
    setTimeout(() => bolt.remove(), 700);
  }

  setInterval(spawnBolt, 1200 + Math.random() * 2000);
}

// --- Toast ---
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// ==========================================
// التشغيل
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadApps();
  setupFilters();
  setupModal();
  setupLightning();
});
