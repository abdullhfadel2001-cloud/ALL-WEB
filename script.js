// ==========================================
// DAEM - المنطق البرمجي للموقع
// ==========================================

// قائمة التطبيقات والبرامج الافتراضية
const DEFAULT_APPS = [
  {
    id: 'app_rafeeqi',
    name: 'تطبيق رَفِيقِي',
    category: 'android',
    categoryLabel: '📱 تطبيق أندرويد',
    version: 'v1.0.0',
    size: '1.2 MB',
    date: 'أكتوبر 2026',
    icon: '🕌',
    description: 'تطبيق إسلامي وإنتاجي متكامل: مواقيت الصلاة حسب موقعك بدقة، تذكير بالتمارين والمهام اليومية، أذكار، ومسبحة إلكترونية تفاعلية.',
    downloadUrl: '../my-web-project/index.html',
    downloadFilename: 'Rafeeqi-App.html',
    demoUrl: '../my-web-project/index.html',
    isCustom: false
  },
  {
    id: 'app_pomodoro',
    name: 'مؤقت التركيز الذكي (Focus Flow)',
    category: 'tools',
    categoryLabel: '🛠️ أدوات وبرامج',
    version: 'v1.2.0',
    size: '850 KB',
    date: 'أكتوبر 2026',
    icon: '⏱️',
    description: 'أداة خفيفة لتقنية بومودورو لتنظيم وقت المذاكرة والعمل مع أصوات طبيعية مهدئة لزيادة التركيز.',
    downloadUrl: '#',
    downloadFilename: 'FocusFlow.zip',
    demoUrl: '#',
    isCustom: false
  },
  {
    id: 'app_quiz',
    name: 'تحدي العباقرة (Trivia Master)',
    category: 'games',
    categoryLabel: '🎮 ألعاب',
    version: 'v2.0.1',
    size: '3.4 MB',
    date: 'سبتمبر 2026',
    icon: '🧠',
    description: 'لعبة مسابقات وأسئلة ثقافية ممتعة مع نظام نقاط ومؤقت تحدي سريع للتنافس مع الأصدقاء.',
    downloadUrl: '#',
    downloadFilename: 'TriviaMaster.apk',
    demoUrl: '#',
    isCustom: false
  },
  {
    id: 'app_qr_tool',
    name: 'صانع وقارئ أكواد QR السريع',
    category: 'tools',
    categoryLabel: '🛠️ أدوات وبرامج',
    version: 'v1.0.0',
    size: '420 KB',
    date: 'أغسطس 2026',
    icon: '📱',
    description: 'تطبيق فوري لتوليد أكواد QR للروابط والنصوص والواي فاي وحفظها كصور عالية الدقة.',
    downloadUrl: '#',
    downloadFilename: 'QRCodeGen.zip',
    demoUrl: '#',
    isCustom: false
  }
];

// حالة التطبيق
let apps = [];
let currentCategory = 'all';
let searchQuery = '';

// الفئات والوسوم
const CATEGORY_MAP = {
  android: { label: '📱 تطبيق أندرويد', badgeClass: 'badge-android' },
  tools: { label: '🛠️ أدوات وبرامج', badgeClass: 'badge-tools' },
  games: { label: '🎮 ألعاب', badgeClass: 'badge-games' },
  web: { label: '🌐 تطبيق ويب', badgeClass: 'badge-web' }
};

// ==========================================
// إدارة البيانات
// ==========================================
function loadApps() {
  const customApps = JSON.parse(localStorage.getItem('daem_custom_apps') || '[]');
  apps = [...customApps, ...DEFAULT_APPS];
  updateCategoryCounts();
  renderApps();
}

function saveCustomApp(newApp) {
  const customApps = JSON.parse(localStorage.getItem('daem_custom_apps') || '[]');
  customApps.unshift(newApp);
  localStorage.setItem('daem_custom_apps', JSON.stringify(customApps));
  loadApps();
  showToast(`تمت إضافة برنامج «${newApp.name}» بنجاح! 🎉`);
}

function deleteCustomApp(id) {
  let customApps = JSON.parse(localStorage.getItem('daem_custom_apps') || '[]');
  customApps = customApps.filter(app => app.id !== id);
  localStorage.setItem('daem_custom_apps', JSON.stringify(customApps));
  loadApps();
  showToast('تم حذف البرنامج من القائمة');
}

// ==========================================
// عرض البطاقات في الصفحة
// ==========================================
function renderApps() {
  const grid = document.getElementById('appsGrid');
  const resultsCount = document.getElementById('resultsCount');
  grid.innerHTML = '';

  const filtered = apps.filter(app => {
    const matchCategory = currentCategory === 'all' || app.category === currentCategory;
    const matchSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.version && app.version.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchSearch;
  });

  resultsCount.textContent = `يتم عرض ${filtered.length} من أصل ${apps.length} برنامج`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>لم يتم العثور على أي برامج!</h3>
        <p>جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من الأعلى.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(app => {
    const catInfo = CATEGORY_MAP[app.category] || { label: app.category, badgeClass: 'badge-tools' };
    const card = document.createElement('div');
    card.className = 'app-card';

    // أزرار التحميل والتجربة
    let actionButtons = `
      <a href="${app.downloadUrl}" download="${app.downloadFilename || ''}" class="btn btn-download">
        <span>⬇️</span> تحميل مباشر
      </a>
    `;

    if (app.demoUrl && app.demoUrl !== '#') {
      actionButtons += `
        <a href="${app.demoUrl}" target="_blank" class="btn btn-preview">
          <span>👁️</span> تجربة
        </a>
      `;
    }

    // زر الحذف إذا كان تطبيقاً مضافاً من قبل المستخدم
    let deleteBtnHtml = '';
    if (app.isCustom) {
      deleteBtnHtml = `<button class="delete-app-btn" data-id="${app.id}" title="حذف" style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:0.9rem;">🗑️ حذف</button>`;
    }

    card.innerHTML = `
      <div class="app-header-row">
        <div class="app-icon-box">${app.icon || '📦'}</div>
        <div class="app-title-area">
          <h3 class="app-title">${escapeHtml(app.name)}</h3>
          <span class="app-category-badge ${catInfo.badgeClass}">${catInfo.label}</span>
        </div>
        ${deleteBtnHtml}
      </div>

      <p class="app-description">${escapeHtml(app.description)}</p>

      <div class="app-meta-row">
        <div class="meta-item">
          <span>🏷️</span>
          <span>${escapeHtml(app.version || 'v1.0')}</span>
        </div>
        <div class="meta-item">
          <span>💾</span>
          <span>${escapeHtml(app.size || 'غير محدد')}</span>
        </div>
        <div class="meta-item">
          <span>📅</span>
          <span>${escapeHtml(app.date || 'حديث')}</span>
        </div>
      </div>

      <div class="app-actions">
        ${actionButtons}
      </div>
    `;

    grid.appendChild(card);
  });

  // إضافة مستمعي حذف التطبيقات المضافة
  grid.querySelectorAll('.delete-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      if (confirm('هل أنت متأكد من رغبتك بحذف هذا البرنامج من القائمة؟')) {
        deleteCustomApp(id);
      }
    });
  });
}

function updateCategoryCounts() {
  document.getElementById('countAll').textContent = apps.length;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ==========================================
// البحث والفلترة
// ==========================================
function setupSearchAndFilters() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const filterChips = document.querySelectorAll('.filter-chip');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    clearBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
    renderApps();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    renderApps();
    searchInput.focus();
  });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderApps();
    });
  });
}

// ==========================================
// النافذة المنبثقة لإضافة برنامج جديد
// ==========================================
function setupModal() {
  const modal = document.getElementById('appModal');
  const openBtn = document.getElementById('addAppModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelModalBtn');
  const form = document.getElementById('newAppForm');

  function openModal() {
    modal.classList.add('open');
    document.getElementById('appName').focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    form.reset();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('appName').value;
    const category = document.getElementById('appCategory').value;
    const version = document.getElementById('appVersion').value || 'v1.0.0';
    const size = document.getElementById('appSize').value || '10 MB';
    const icon = document.getElementById('appIcon').value || '🚀';
    const desc = document.getElementById('appDesc').value;
    const fileUrl = document.getElementById('appFileUrl').value;

    const newApp = {
      id: 'custom_' + Date.now(),
      name,
      category,
      version,
      size,
      date: 'اليوم',
      icon,
      description: desc,
      downloadUrl: fileUrl,
      downloadFilename: name.replace(/\s+/g, '-') + '.apk',
      demoUrl: fileUrl.endsWith('.html') ? fileUrl : '#',
      isCustom: true
    };

    saveCustomApp(newApp);
    closeModal();
  });
}

// ==========================================
// تبديل المظهر وإشعارات Toast
// ==========================================
function setupTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('daem_theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '☀️';
      localStorage.setItem('daem_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeBtn.textContent = '🌙';
      localStorage.setItem('daem_theme', 'light');
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastMessage');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// بدء التشغيل
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupSearchAndFilters();
  setupModal();
  loadApps();
});

