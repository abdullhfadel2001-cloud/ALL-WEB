// ==========================================
// DAEM - Electric Sky Theme · Script
// ==========================================

// --- قاعدة البيانات الافتراضية للتطبيقات ---
const DEFAULT_APPS = [
  {
    id: 'rafeeqi',
    name: 'Rafeeqi — رَفِيقِي',
    category: 'android',
    icon: '🕌',
    version: 'v1.0.0',
    size: '1.2 MB',
    date: 'Oct 2026',
    desc: 'All-in-one Islamic & productivity app. Prayer times by GPS, daily task reminders, Azkar, and an interactive Tasbeeh counter.',
    downloadUrl: '../my-web-project/index.html',
    demoUrl: '../my-web-project/index.html',
    isCustom: false
  },
  {
    id: 'focusflow',
    name: 'Focus Flow — مؤقت التركيز',
    category: 'tools',
    icon: '⏱️',
    version: 'v1.2.0',
    size: '850 KB',
    date: 'Oct 2026',
    desc: 'Pomodoro-style focus timer with ambient sounds to boost productivity during study sessions.',
    downloadUrl: '#',
    demoUrl: '#',
    isCustom: false
  },
  {
    id: 'trivia',
    name: 'Trivia Master — تحدي العباقرة',
    category: 'games',
    icon: '🧠',
    version: 'v2.0.1',
    size: '3.4 MB',
    date: 'Sep 2026',
    desc: 'Fun trivia quiz game with a points system and fast-paced challenge timer. Compete with friends!',
    downloadUrl: '#',
    demoUrl: '#',
    isCustom: false
  },
  {
    id: 'qrgen',
    name: 'QR Generator — صانع QR',
    category: 'tools',
    icon: '📱',
    version: 'v1.0.0',
    size: '420 KB',
    date: 'Aug 2026',
    desc: 'Instant QR code generator for links, text, and Wi-Fi. Export in high-resolution PNG.',
    downloadUrl: '#',
    demoUrl: '#',
    isCustom: false
  }
];

const CATEGORY_INFO = {
  android: { label: 'ANDROID', cls: 'cat-android' },
  tools:   { label: 'TOOLS',   cls: 'cat-tools'   },
  games:   { label: 'GAMES',   cls: 'cat-games'   },
  web:     { label: 'WEB APP', cls: 'cat-web'      }
};

// --- حالة التطبيق ---
let apps = [];
let filterCat = 'all';
let searchQ = '';

// --- تحميل البيانات ---
function loadApps() {
  const custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  apps = [...custom, ...DEFAULT_APPS];
  renderApps();
  animateStats(apps.length);
}

function saveApp(app) {
  const custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  custom.unshift(app);
  localStorage.setItem('daem_apps', JSON.stringify(custom));
  loadApps();
  toast(`⚡ "${app.name}" added to DAEM!`);
}

function deleteApp(id) {
  let custom = JSON.parse(localStorage.getItem('daem_apps') || '[]');
  custom = custom.filter(a => a.id !== id);
  localStorage.setItem('daem_apps', JSON.stringify(custom));
  loadApps();
  toast('App removed from DAEM');
}

// --- عرض التطبيقات ---
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
        <h3>NO APPS FOUND</h3>
        <p>Try a different search or category filter</p>
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

  // مستمعي الحذف
  grid.querySelectorAll('.del-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (confirm('Remove this app from DAEM?')) deleteApp(e.currentTarget.dataset.id);
    });
  });
}

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// --- عداد الإحصائيات المتحرك ---
function animateStats(total) {
  const statsData = [
    { el: document.getElementById('statApps'), target: total },
    { el: document.getElementById('statDownloads'), target: total * 47 },
    { el: document.getElementById('statUsers'), target: total * 23 }
  ];

  statsData.forEach(({ el, target }) => {
    if (!el) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// --- البحث والفلاتر ---
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
  const modal   = document.getElementById('addModal');
  const openBtn = document.getElementById('addAppBtn');
  const closeBtn= document.getElementById('closeModal');
  const cancel  = document.getElementById('cancelModal');
  const form    = document.getElementById('addAppForm');

  const open  = () => { modal.classList.add('open'); document.getElementById('fName').focus(); };
  const close = () => { modal.classList.remove('open'); form.reset(); };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  cancel.addEventListener('click', close);
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

// --- تأثير البرق الخلفي العشوائي ---
function setupLightning() {
  const container = document.getElementById('lightningBg');
  if (!container) return;

  function spawnBolt() {
    const bolt = document.createElement('div');
    const x = Math.random() * 100;
    const h = 30 + Math.random() * 50;
    const opacity = 0.03 + Math.random() * 0.07;

    bolt.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${Math.random() * 50}%;
      width: 1px;
      height: ${h}px;
      background: linear-gradient(180deg, #00c8ff, transparent);
      opacity: ${opacity};
      pointer-events: none;
      animation: boltFade ${0.3 + Math.random() * 0.4}s ease-out forwards;
    `;

    container.appendChild(bolt);
    setTimeout(() => bolt.remove(), 800);
  }

  // إضافة keyframe للبرق
  const style = document.createElement('style');
  style.textContent = `
    @keyframes boltFade {
      0% { opacity: var(--o, 0.08); transform: scaleX(1); }
      100% { opacity: 0; transform: scaleX(0.3); }
    }
  `;
  document.head.appendChild(style);

  // برق عشوائي
  setInterval(spawnBolt, 800 + Math.random() * 2000);
  setInterval(() => {
    // وميض كبير أحياناً
    document.body.style.transition = 'background-color 0.05s';
    document.body.style.backgroundColor = '#020408';
    const flash = Math.random();
    if (flash > 0.95) {
      document.body.style.backgroundColor = '#010b1a';
      setTimeout(() => { document.body.style.backgroundColor = '#020408'; }, 80);
    }
  }, 4000);
}

// --- إعداد روابط التنقل ---
function setupNavHighlight() {
  const sections = ['hero', 'apps', 'about'];
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec && window.scrollY >= sec.offsetTop - 120) current = id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
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
  setupNavHighlight();
});
