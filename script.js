// ==========================================================================
// DAEM - Cybernetic Electric Core Engine (with Interactive Theme Core)
// ==========================================================================

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
let currentTheme = localStorage.getItem('daem_theme') || 'dark';

// --- تنظيف الذاكرة القديمة ---
try {
  localStorage.removeItem('daem_apps');
  localStorage.removeItem('daem_custom_apps');
} catch (e) {}

// ==========================================================================
// 1. نظام تبديل المظهر بالنقر على النواة (Day / Night Core Switcher)
// ==========================================================================
function setupThemeCore() {
  const toggleBtn = document.getElementById('themeSphereToggle');
  const sphereIcon = document.getElementById('sphereIcon');
  const statusLabel = document.getElementById('statusThemeLabel');
  const coreHintText = document.getElementById('coreHintText');

  function applyTheme(theme, showNotification = false) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('daem_theme', theme);

    if (theme === 'light') {
      if (sphereIcon) sphereIcon.textContent = '☀️';
      if (statusLabel) statusLabel.textContent = 'الوضع النهاري ☀️';
      if (coreHintText) coreHintText.textContent = 'الوضع الحالي: نهاري ☀️ (اضغط للتحويل لليلي 🌙)';
      if (showNotification) toast('تم تفعيل الوضع النهاري ☀️');
    } else {
      if (sphereIcon) sphereIcon.textContent = '⚡';
      if (statusLabel) statusLabel.textContent = 'الوضع الليلي 🌙';
      if (coreHintText) coreHintText.textContent = 'الوضع الحالي: ليلي 🌙 (اضغط للتحويل لنهاري ☀️)';
      if (showNotification) toast('تم تفعيل الوضع الليلي 🌙');
    }
  }

  // تطبيق المظهر المحفوظ عند الفتح
  applyTheme(currentTheme, false);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });

    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, true);
      }
    });
  }

  // السماح بالضغط على زر الحالة في الشريط العلوي أيضاً للتبديل
  const hudStatus = document.querySelector('.hud-status');
  if (hudStatus) {
    hudStatus.style.cursor = 'pointer';
    hudStatus.setAttribute('title', 'اضغط للتبديل بين النهاري والليلي');
    hudStatus.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, true);
    });
  }
}

// ==========================================================================
// 2. Interactive Electric Canvas (Particles & Lightning Arcs)
// ==========================================================================
function initElectricCanvas() {
  const canvas = document.getElementById('electricCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    const glow = document.getElementById('cursorGlow');
    if (glow) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const particleCount = Math.min(65, Math.floor((width * height) / 16000));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 0.8
    });
  }

  let lightningBolt = null;
  function triggerSkyBolt() {
    const startX = Math.random() * width;
    const segments = [];
    let currX = startX;
    let currY = 0;
    const maxSegments = 14;

    for (let i = 0; i < maxSegments; i++) {
      const nextX = currX + (Math.random() - 0.5) * 60;
      const nextY = currY + (height * 0.45) / maxSegments;
      segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });
      currX = nextX;
      currY = nextY;
    }

    lightningBolt = { segments, alpha: 0.9 };
    setTimeout(() => {
      lightningBolt = null;
    }, 180);
  }

  setInterval(() => {
    if (Math.random() > 0.4) triggerSkyBolt();
  }, 4500);

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = currentTheme === 'light';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.8;
          p.y += (dy / dist) * 0.8;
        }
      }

      const pColor = isLight ? '#0284c7' : '#00f0ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = pColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = pColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * (isLight ? 0.22 : 0.35);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${alpha})` : `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse < 140) {
          const alpha = (1 - distToMouse / 140) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isLight ? `rgba(245, 158, 11, ${alpha})` : `rgba(157, 0, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    if (lightningBolt) {
      ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${lightningBolt.alpha})` : `rgba(255, 255, 255, ${lightningBolt.alpha})`;
      ctx.shadowColor = isLight ? '#0284c7' : '#00f0ff';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      lightningBolt.segments.forEach(seg => {
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
      });
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 3. Applications Data Archive
// ==========================================================================
function loadApps() {
  let userApps = JSON.parse(localStorage.getItem('daem_v2_apps') || '[]');
  // حذف أي تطبيق قديم
  userApps = userApps.filter(a => a.id !== 'rafiqi-prayer-app' && a.id !== 'sanad-app' && !a.name.includes('رفيق') && !a.name.includes('سند'));
  localStorage.setItem('daem_v2_apps', JSON.stringify(userApps));

  apps = [...DEFAULT_APPS, ...userApps];
  const countEl = document.getElementById('countAll');
  if (countEl) countEl.textContent = apps.length;
  renderApps();
}

function saveApp(app) {
  const userApps = JSON.parse(localStorage.getItem('daem_v2_apps') || '[]');
  userApps.unshift(app);
  localStorage.setItem('daem_v2_apps', JSON.stringify(userApps));
  loadApps();
  toast(`⚡ تمت إضافة «${app.name}» إلى قائمة البرامج!`);
}

function deleteApp(id) {
  let userApps = JSON.parse(localStorage.getItem('daem_v2_apps') || '[]');
  userApps = userApps.filter(a => a.id !== id);
  localStorage.setItem('daem_v2_apps', JSON.stringify(userApps));
  loadApps();
  toast('تم حذف البرنامج من القائمة.');
}

function renderApps() {
  const grid = document.getElementById('appsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = apps.filter(app => {
    const catOk = filterCat === 'all' || app.category === filterCat;
    const q = searchQ.toLowerCase();
    const searchOk = !q || app.name.toLowerCase().includes(q) || app.desc.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="empty-state-radar">
        <div class="radar-sweep-box">
          <div class="radar-ring r1"></div>
          <div class="radar-ring r2"></div>
          <div class="radar-sweep-arm"></div>
          <span class="radar-center-bolt">⚡</span>
        </div>
        <h3 class="radar-title">NO APPLICATIONS YET</h3>
        <p class="radar-desc">قائمة البرامج والتطبيقات فارغة حالياً. اضغط على الزر بالأسفل لإضافة أول تطبيق إلى المنصة ⚡</p>
        <span class="radar-meta">SYSTEM READY // جاهز للتشغيل</span>
      </div>`;
    return;
  }

  filtered.forEach(app => {
    const cat = CATEGORY_INFO[app.category] || CATEGORY_INFO.tools;
    const card = document.createElement('div');
    card.className = 'app-card';

    const isSanad = app.id === 'sanad-app';
    const actionLabel = isSanad ? '📲 تثبيت مباشر (APK/PWA)' : '⬇️ DOWNLOAD';

    const demoBtn = app.demoUrl && app.demoUrl !== '#'
      ? `<a href="${esc(app.demoUrl)}" target="_blank" class="btn-demo">👁️ فتح وتشغيل</a>`
      : '';

    const delBtn = isSanad ? '' : `<button class="btn-del del-trigger" data-id="${app.id}" title="حذف">🗑️</button>`;

    const dlAttr = app.downloadUrl && app.downloadUrl !== '#' && !app.downloadUrl.startsWith('http') && !app.downloadUrl.endsWith('.html')
      ? `download="${esc(app.name)}"` : '';

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${app.icon || '⚡'}</div>
        <div class="card-title-area">
          <div class="card-name">${esc(app.name)}</div>
          <span class="cat-badge ${cat.cls}">${cat.label}</span>
        </div>
      </div>
      <p class="card-desc">${esc(app.desc)}</p>
      <div class="card-meta">
        <span class="meta-pill">🏷️ ${esc(app.version || 'v1.0')}</span>
        <span class="meta-pill">💾 ${esc(app.size || '—')}</span>
        <span class="meta-pill">⚡ تثبيت فوري</span>
      </div>
      <div class="card-actions">
        <a href="${esc(app.downloadUrl)}" ${dlAttr} class="btn-dl">${actionLabel}</a>
        ${demoBtn}
        ${delBtn}
      </div>`;

    grid.appendChild(card);
  });

  grid.querySelectorAll('.del-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (confirm('هل أنت متأكد من حذف هذا البرنامج من المنصة؟')) {
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

// ==========================================================================
// 4. Search & Category Filters
// ==========================================================================
function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQ = e.target.value.trim();
      renderApps();
    });
  }

  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCat = btn.dataset.cat;
      renderApps();
    });
  });
}

// ==========================================================================
// 5. Modal Management
// ==========================================================================
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
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) close(); });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const app = {
        id: 'app_' + Date.now(),
        name: document.getElementById('fName').value.trim(),
        category: document.getElementById('fCat').value,
        icon: document.getElementById('fIcon').value.trim() || '⚡',
        version: document.getElementById('fVersion').value.trim() || 'v1.0.0',
        size: document.getElementById('fSize').value.trim() || '—',
        date: new Date().toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' }),
        desc: document.getElementById('fDesc').value.trim(),
        downloadUrl: document.getElementById('fUrl').value.trim(),
        demoUrl: document.getElementById('fDemo').value.trim() || '#',
        isCustom: true
      };
      saveApp(app);
      close();
    });
  }
}

// ==========================================================================
// 6. Live Latency Ticker & Toast
// ==========================================================================
function setupLatencyTicker() {
  const latencyEl = document.getElementById('latencyVal');
  if (!latencyEl) return;
  setInterval(() => {
    const lat = 14 + Math.floor(Math.random() * 12);
    latencyEl.textContent = lat + 'ms';
  }, 3000);
}

function toast(msg) {
  const el = document.getElementById('cyberToast');
  const msgEl = document.getElementById('toastMsg');
  if (!el || !msgEl) return;
  msgEl.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupThemeCore();
  initElectricCanvas();
  loadApps();
  setupFilters();
  setupModal();
  setupLatencyTicker();
});
