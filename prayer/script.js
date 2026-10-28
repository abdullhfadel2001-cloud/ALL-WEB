// ==========================================
// رفيق المسلم اليومي - الكود البرمجي الرئيسي
// ==========================================

// أسماء الصلوات بالعربية ومفاتيحها
const PRAYER_NAMES = {
  Fajr: 'صلاة الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'صلاة الظهر',
  Asr: 'صلاة العصر',
  Maghrib: 'صلاة المغرب',
  Isha: 'صلاة العشاء'
};

// بنك الأذكار
const AZKAR_DATA = {
  morning: [
    {
      id: 'm1',
      text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
      benefit: 'حفظ وبركة في اليوم',
      target: 1
    },
    {
      id: 'm2',
      text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
      benefit: 'سيد الاستغفار: من قالها موقناً بها فمات من يومه دخل الجنة',
      target: 1
    },
    {
      id: 'm3',
      text: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ العَلِيمُ.',
      benefit: 'لم يضره شيء حتى يمسي',
      target: 3
    },
    {
      id: 'm4',
      text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.',
      benefit: 'صلاح الشأن وتفريج الهم',
      target: 3
    },
    {
      id: 'm5',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
      benefit: 'حُطت خطاياه وإن كانت مثل زبد البحر',
      target: 100
    }
  ],
  evening: [
    {
      id: 'e1',
      text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
      benefit: 'حفظ وتحصين المساء',
      target: 1
    },
    {
      id: 'e2',
      text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
      benefit: 'لم تضره حمة أو سوء تلك الليلة',
      target: 3
    },
    {
      id: 'e3',
      text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.',
      benefit: 'الاعتراف بنعم الله وحفظه',
      target: 1
    },
    {
      id: 'e4',
      text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
      benefit: 'تعدل ساعات طويلة من الذكر',
      target: 3
    }
  ],
  afterPrayer: [
    {
      id: 'p1',
      text: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ. اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ ذَا الْجَلاَلِ وَالإِكْرَامِ.',
      benefit: 'سنة بعد كل فريضة',
      target: 1
    },
    {
      id: 'p2',
      text: 'آية الكرسي: ﴿اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...﴾',
      benefit: 'من قرأها دبر كل صلاة لم يمنعه من دخول الجنة إلا أن يموت',
      target: 1
    },
    {
      id: 'p3',
      text: 'سُبْحَانَ اللَّهِ (33) | الْحَمْدُ لِلَّهِ (33) | اللَّهُ أَكْبَرُ (33) | لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (1)',
      benefit: 'غُفرت خطاياه وإن كانت مثل زبد البحر',
      target: 33
    }
  ],
  sleep: [
    {
      id: 's1',
      text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
      benefit: 'حفظ الروح عند النوم',
      target: 1
    },
    {
      id: 's2',
      text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.',
      benefit: 'يقولها ثلاثاً عند وضع اليد تحت الخد',
      target: 3
    }
  ]
};

// حالة التطبيق (State)
let appState = {
  prayerTimes: null,
  nextPrayer: null,
  coords: null,
  cityName: 'موقعي الحالي',
  tasks: JSON.parse(localStorage.getItem('user_tasks') || '[]'),
  currentTaskFilter: 'all',
  tasbeehCount: parseInt(localStorage.getItem('tasbeeh_count') || '0', 10),
  totalTasbeeh: parseInt(localStorage.getItem('tasbeeh_total') || '0', 10),
  azkarProgress: JSON.parse(localStorage.getItem('azkar_progress') || '{}'),
  soundEnabled: true
};

// ==========================================
// 1. نظام الصوت التوليدي (Web Audio Synthesizer)
// ==========================================
class SoundNotifier {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // نغمة أذان وتنبيه ناعمة
  playAdhanChime() {
    this.init();
    const notes = [261.63, 329.63, 392.00, 523.25]; // دو، مي، صول، دو جواب
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.35);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.35);
      gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.35 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.35 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.35);
      osc.stop(this.ctx.currentTime + idx * 0.35 + 0.85);
    });
  }

  // نقرة مسبحة خفيفة
  playClickTone() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // ignore
    }
  }
}

const audioNotifier = new SoundNotifier();

// إشعار Toast
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// طلب إذن إشعارات المتصفح
function setupNotifications() {
  const notifyBtn = document.getElementById('notifyBtn');
  const notifyBadge = document.getElementById('notifyBadge');

  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      notifyBadge.classList.add('active');
    }
  }

  notifyBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
      showToast('المتصفح لا يدعم إشعارات النظام، لكن التنبيه الصوتي يعمل!');
      return;
    }

    if (Notification.permission === 'granted') {
      showToast('التنبيهات مفعلة بالفعل 🔔');
      audioNotifier.playAdhanChime();
    } else {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        notifyBadge.classList.add('active');
        showToast('تم تفعيل التنبيهات بنجاح!');
        audioNotifier.playAdhanChime();
      } else {
        showToast('تم رفض إذن الإشعارات من المتصفح.');
      }
    }
  });
}

function sendAlert(title, body) {
  if (appState.soundEnabled) {
    audioNotifier.playAdhanChime();
  }
  showToast(`🔔 ${title}: ${body}`);

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: body,
        icon: '🕌'
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

// ==========================================
// 2. التاريخ والمواقيت وتحديد الموقع
// ==========================================
function updateCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const hijriOptions = { calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric' };

  let dateStr = now.toLocaleDateString('ar-EG', options);
  try {
    const hijriStr = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', hijriOptions).format(now);
    dateStr += ` • ${hijriStr}`;
  } catch (e) {
    // fallback if islamic-umalqura not available in engine
  }

  document.getElementById('currentDateDisplay').textContent = dateStr;
}

// جلب أوقات الصلاة حسب الإحداثيات
async function fetchPrayerTimes(lat, lng) {
  const locationText = document.getElementById('locationText');
  locationText.textContent = 'جاري التحديث...';

  try {
    const today = new Date();
    const dateFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const url = `https://api.aladhan.com/v1/timings/${dateFormatted}?latitude=${lat}&longitude=${lng}&method=4`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.code === 200) {
      appState.prayerTimes = data.data.timings;
      localStorage.setItem('cached_prayer_times', JSON.stringify({
        timings: data.data.timings,
        date: dateFormatted,
        lat, lng
      }));

      // اسم المدينة تقريبي
      reverseGeocode(lat, lng);
      renderPrayerTimes();
      findNextPrayer();
    } else {
      throw new Error('API error');
    }
  } catch (error) {
    console.warn('تعذر جلب المواقيت عبر الإنترنت، تجربة الذاكرة المؤقتة:', error);
    const cached = JSON.parse(localStorage.getItem('cached_prayer_times') || 'null');
    if (cached) {
      appState.prayerTimes = cached.timings;
      locationText.textContent = 'الموقع المحفوظ';
      renderPrayerTimes();
      findNextPrayer();
      showToast('تم استخدام مواقيت الصلاة المحفوظة');
    } else {
      // إحداثيات افتراضية (مكة المكرمة)
      locationText.textContent = 'مكة المكرمة (افتراضي)';
      fallbackDefaultTimes();
    }
  }
}

async function reverseGeocode(lat, lng) {
  const locationText = document.getElementById('locationText');
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ar`);
    const data = await res.json();
    const city = data.city || data.locality || data.principalSubdivision || 'موقعي';
    appState.cityName = city;
    locationText.textContent = city;
  } catch (e) {
    locationText.textContent = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }
}

function fallbackDefaultTimes() {
  appState.prayerTimes = {
    Fajr: "05:10",
    Sunrise: "06:30",
    Dhuhr: "12:15",
    Asr: "15:35",
    Maghrib: "18:05",
    Isha: "19:35"
  };
  renderPrayerTimes();
  findNextPrayer();
}

function getUserLocation() {
  const locationText = document.getElementById('locationText');
  locationText.textContent = 'جاري تحديد موقعك...';

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        appState.coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        showToast('يرجى السماح بالوصول للموقع للحصول على أوقات دقيقة');
        // fallback cached or default
        const cached = JSON.parse(localStorage.getItem('cached_prayer_times') || 'null');
        if (cached) {
          appState.prayerTimes = cached.timings;
          locationText.textContent = 'الموقع المحفوظ';
          renderPrayerTimes();
          findNextPrayer();
        } else {
          fallbackDefaultTimes();
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  } else {
    fallbackDefaultTimes();
  }
}

// عرض أوقات الصلاة في الكروت
function formatTime12(timeStr) {
  if (!timeStr) return '--:--';
  const clean = timeStr.split(' ')[0]; // إزالة (EEST) إن وجدت
  let [hours, minutes] = clean.split(':').map(Number);
  const period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function renderPrayerTimes() {
  if (!appState.prayerTimes) return;
  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  prayers.forEach(prayer => {
    const el = document.getElementById(`time-${prayer}`);
    if (el && appState.prayerTimes[prayer]) {
      el.textContent = formatTime12(appState.prayerTimes[prayer]);
    }
  });
}

// تحديد الصلاة القادمة والعد التنازلي
function findNextPrayer() {
  if (!appState.prayerTimes) return;

  const now = new Date();
  const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  
  let next = null;
  let minDiff = Infinity;
  let nextDate = null;

  prayers.forEach(prayer => {
    const timeStr = appState.prayerTimes[prayer].split(' ')[0];
    const [h, m] = timeStr.split(':').map(Number);
    const pDate = new Date();
    pDate.setHours(h, m, 0, 0);

    let diff = pDate - now;
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      next = prayer;
      nextDate = pDate;
    }
  });

  // إذا كانت جميع صلوات اليوم قد انقضت، فالصلاة القادمة فجر الغد
  if (!next) {
    next = 'Fajr';
    const [h, m] = appState.prayerTimes.Fajr.split(' ')[0].split(':').map(Number);
    nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(h, m, 0, 0);
  }

  appState.nextPrayer = {
    key: next,
    name: PRAYER_NAMES[next] || next,
    targetDate: nextDate,
    time: appState.prayerTimes[next]
  };

  document.getElementById('nextPrayerName').textContent = appState.nextPrayer.name;
  document.getElementById('nextPrayerTime').textContent = formatTime12(appState.nextPrayer.time);

  // تحديث التمييز بالكروت
  document.querySelectorAll('.prayer-card').forEach(card => {
    card.classList.remove('highlight');
    if (card.dataset.prayer === next) {
      card.classList.add('highlight');
    }
  });
}

// تحديث العد التنازلي كل ثانية
function updateCountdown() {
  if (!appState.nextPrayer || !appState.nextPrayer.targetDate) return;

  const now = new Date();
  let diff = appState.nextPrayer.targetDate - now;

  if (diff <= 1000 && diff >= 0) {
    sendAlert(appState.nextPrayer.name, `حان الآن موعد ${appState.nextPrayer.name}`);
    setTimeout(() => {
      findNextPrayer();
    }, 2000);
  }

  if (diff < 0) {
    diff = 0;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('nextPrayerCountdown').textContent = formatted;
}

// ==========================================
// 3. إدارة المهام والتمارين اليومية
// ==========================================
const CATEGORY_MAP = {
  fitness: { label: 'تمارين ورياضة', badge: 'badge-fitness', icon: '🏃‍♂️' },
  worship: { label: 'عبادة وقرآن', badge: 'badge-worship', icon: '📖' },
  work: { label: 'عمل ودراسة', badge: 'badge-work', icon: '💼' },
  general: { label: 'مهمة عامة', badge: 'badge-general', icon: '✨' }
};

function saveTasks() {
  localStorage.setItem('user_tasks', JSON.stringify(appState.tasks));
  renderTasks();
  updateTaskStats();
}

function addTask(title, category, time) {
  const newTask = {
    id: 'task_' + Date.now(),
    title: title.trim(),
    category: category || 'general',
    time: time || '',
    completed: false,
    createdAt: new Date().toISOString(),
    notified: false
  };

  appState.tasks.unshift(newTask);
  saveTasks();
  showToast('تمت إضافة المهمة بنجاح ✅');
}

function toggleTask(id) {
  const task = appState.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
  }
}

function deleteTask(id) {
  appState.tasks = appState.tasks.filter(t => t.id !== id);
  saveTasks();
  showToast('تم حذف المهمة');
}

function updateTaskStats() {
  const total = appState.tasks.length;
  const completed = appState.tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById('countAll').textContent = total;
  document.getElementById('countPending').textContent = pending;
  document.getElementById('countCompleted').textContent = completed;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  document.getElementById('progressPercentage').textContent = `${percentage}%`;
  document.getElementById('progressBarFill').style.width = `${percentage}%`;
}

function renderTasks() {
  const container = document.getElementById('tasksList');
  container.innerHTML = '';

  let filtered = appState.tasks;
  if (appState.currentTaskFilter === 'pending') {
    filtered = appState.tasks.filter(t => !t.completed);
  } else if (appState.currentTaskFilter === 'completed') {
    filtered = appState.tasks.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <p>لا توجد مهام في هذا القسم حالياً.</p>
        <span style="font-size:0.85rem; color:var(--text-muted)">أضف تمرينك أو عملك اليومي من النموذج بالأعلى</span>
      </div>
    `;
    return;
  }

  filtered.forEach(task => {
    const cat = CATEGORY_MAP[task.category] || CATEGORY_MAP.general;
    const item = document.createElement('div');
    item.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    let timeBadge = '';
    if (task.time) {
      timeBadge = `<span>⏰ ${task.time}</span>`;
    }

    item.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
        <div class="task-meta">
          <span class="task-title">${escapeHtml(task.title)}</span>
          <div class="task-sub">
            <span class="task-badge ${cat.badge}">${cat.icon} ${cat.label}</span>
            ${timeBadge}
          </div>
        </div>
      </div>
      <button class="task-delete-btn" data-id="${task.id}" title="حذف المهمة">🗑️</button>
    `;

    container.appendChild(item);
  });

  // إضافة مستمعي الأحداث
  container.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => toggleTask(e.target.dataset.id));
  });

  container.querySelectorAll('.task-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => deleteTask(e.currentTarget.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// فحص مواعيد المهام للتنبيه التلقائي
function checkTaskReminders() {
  const now = new Date();
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;

  appState.tasks.forEach(task => {
    if (!task.completed && task.time === currentTime && !task.notified) {
      sendAlert('تذكير بمهمة', task.title);
      task.notified = true;
      saveTasks();
    }
  });
}

// ==========================================
// 4. الأذكار
// ==========================================
let currentAzkarCategory = 'morning';

function renderAzkar(category) {
  currentAzkarCategory = category;
  const container = document.getElementById('azkarContainer');
  container.innerHTML = '';

  const list = AZKAR_DATA[category] || [];

  list.forEach(zkr => {
    const userDoneCount = appState.azkarProgress[zkr.id] || 0;
    const isFinished = userDoneCount >= zkr.target;

    const card = document.createElement('div');
    card.className = `zkr-card ${isFinished ? 'finished' : ''}`;
    card.innerHTML = `
      <p class="zkr-text">${zkr.text}</p>
      ${zkr.benefit ? `<p class="zkr-benefit">💡 ${zkr.benefit}</p>` : ''}
      <div class="zkr-footer">
        <span style="font-size: 0.85rem; color: var(--text-muted)">التكرار المطلوب: <strong>${zkr.target}</strong></span>
        <button class="zkr-count-btn" data-id="${zkr.id}" data-target="${zkr.target}">
          ${isFinished ? '✅ تم الإنجاز' : `<span>📿</span> ${userDoneCount} / ${zkr.target}`}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll('.zkr-count-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const target = parseInt(e.currentTarget.dataset.target, 10);
      let current = appState.azkarProgress[id] || 0;

      if (current < target) {
        current++;
        appState.azkarProgress[id] = current;
        localStorage.setItem('azkar_progress', JSON.stringify(appState.azkarProgress));
        audioNotifier.playClickTone();
        if (navigator.vibrate) navigator.vibrate(25);
        renderAzkar(currentAzkarCategory);
      } else {
        // إعادة التعيين إذا ضغط بعد الإنجاز
        appState.azkarProgress[id] = 0;
        localStorage.setItem('azkar_progress', JSON.stringify(appState.azkarProgress));
        renderAzkar(currentAzkarCategory);
      }
    });
  });
}

// ==========================================
// 5. المسبحة الإلكترونية
// ==========================================
function setupTasbeeh() {
  const tasbeehClickArea = document.getElementById('tasbeehClickArea');
  const tasbeehCountEl = document.getElementById('tasbeehCount');
  const totalTasbeehEl = document.getElementById('totalTasbeehCount');
  const resetBtn = document.getElementById('resetTasbeehBtn');
  const phraseSelect = document.getElementById('tasbeehPhraseSelect');
  const phraseDisplay = document.getElementById('activePhraseDisplay');

  tasbeehCountEl.textContent = appState.tasbeehCount;
  totalTasbeehEl.textContent = appState.totalTasbeeh;

  phraseSelect.addEventListener('change', (e) => {
    phraseDisplay.textContent = e.target.value;
  });

  function handleTasbeehPress() {
    appState.tasbeehCount++;
    appState.totalTasbeeh++;
    
    tasbeehCountEl.textContent = appState.tasbeehCount;
    totalTasbeehEl.textContent = appState.totalTasbeeh;

    localStorage.setItem('tasbeeh_count', appState.tasbeehCount);
    localStorage.setItem('tasbeeh_total', appState.totalTasbeeh);

    audioNotifier.playClickTone();
    if (navigator.vibrate) {
      // نبضة اهتزاز أقوى كل 33 تسبيحة
      if (appState.tasbeehCount % 33 === 0) {
        navigator.vibrate([40, 60, 40]);
      } else {
        navigator.vibrate(20);
      }
    }
  }

  tasbeehClickArea.addEventListener('click', handleTasbeehPress);

  resetBtn.addEventListener('click', () => {
    appState.tasbeehCount = 0;
    localStorage.setItem('tasbeeh_count', '0');
    tasbeehCountEl.textContent = '0';
    showToast('تمت إعادة تعيين عداد المسبحة');
  });
}

// ==========================================
// 6. المظهر والتبويبات وربط الأحداث
// ==========================================
function setupTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('app_theme') || 'light';

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      themeBtn.textContent = '🌙';
      localStorage.setItem('app_theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '☀️';
      localStorage.setItem('app_theme', 'dark');
    }
  });
}

function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panes = {
    prayer: document.getElementById('prayerTab'),
    tasks: document.getElementById('tasksTab'),
    azkar: document.getElementById('azkarTab'),
    tasbeeh: document.getElementById('tasbeehTab')
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      Object.values(panes).forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      if (panes[tabId]) {
        panes[tabId].classList.add('active');
      }
    });
  });

  // التبويبات الفرعية للأذكار
  const azkarSubtabs = document.querySelectorAll('.azkar-subtab');
  azkarSubtabs.forEach(sub => {
    sub.addEventListener('click', () => {
      azkarSubtabs.forEach(s => s.classList.remove('active'));
      sub.classList.add('active');
      renderAzkar(sub.dataset.azkar);
    });
  });

  // فلاتر المهام
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.currentTaskFilter = chip.dataset.filter;
      renderTasks();
    });
  });
}

function setupTaskForm() {
  const form = document.getElementById('taskForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('taskTitle');
    const categorySelect = document.getElementById('taskCategory');
    const timeInput = document.getElementById('taskTime');

    if (titleInput.value.trim()) {
      addTask(titleInput.value, categorySelect.value, timeInput.value);
      titleInput.value = '';
      timeInput.value = '';
      titleInput.focus();
    }
  });
}

// زر اختبار الصوت
function setupTestSound() {
  const btn = document.getElementById('testSoundBtn');
  btn.addEventListener('click', () => {
    audioNotifier.playAdhanChime();
    showToast('تم تشغيل صوت التنبيه التجريبي 🔊');
  });

  const refreshLocationBtn = document.getElementById('refreshLocationBtn');
  refreshLocationBtn.addEventListener('click', () => {
    getUserLocation();
    showToast('جاري تحديث الموقع...');
  });

  const locationChip = document.getElementById('locationChip');
  locationChip.addEventListener('click', () => {
    getUserLocation();
  });
}

// ==========================================
// 7. تثبيت التطبيق وتفعيل الـ PWA للأندرويد
// ==========================================
let deferredPrompt;

function setupPWA() {
  // تسجيل Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker تم تفعيله بنجاح:', reg.scope))
        .catch(err => console.log('فشل تفعيل Service Worker:', err));
    });
  }

  // التقاط حدث التثبيت على الأندرويد
  const installBtn = document.getElementById('installAppBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'grid';
      installBtn.classList.add('pulse-install');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('جاري تثبيت تطبيق رفيقي على هاتفك! 🎉');
          installBtn.style.display = 'none';
        }
        deferredPrompt = null;
      } else {
        showToast('لتثبيت التطبيق: افتح قائمة المتصفح (⋮) ثم اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"');
      }
    });
  }
}

// ==========================================
// بدء تشغيل التطبيق (Initialization)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupPWA();
  updateCurrentDate();
  setupTheme();
  setupTabs();
  setupNotifications();
  setupTaskForm();
  setupTasbeeh();
  setupTestSound();

  // تحميل المهام
  renderTasks();
  updateTaskStats();

  // تحميل الأذكار الافتراضية
  renderAzkar('morning');

  // جلب الموقع والمواقيت
  getUserLocation();

  // المؤقتات الدورية
  setInterval(updateCountdown, 1000);
  setInterval(checkTaskReminders, 30000); // فحص التذكيرات كل 30 ثانية
  setInterval(updateCurrentDate, 60000);
});
