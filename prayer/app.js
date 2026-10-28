// ==========================================================================
// تطبيق رفيق المسلم والحياة اليومية - العقل المدبر والتحكم الشامل (App Core)
// ==========================================================================

// الحالة الشاملة للتطبيق وتفضيلات المستخدم
const AppState = {
  // تفعيل وإطفاء الفئات الرئيسية
  categories: {
    deen: true,
    fitness: true,
    notes: true,
    health: true,
    expenses: true
  },
  
  // ترتيب الفئات بالسحب والإفلات (Drag & Drop)
  categoryOrder: ["cat_deen", "cat_fitness", "cat_notes", "cat_health", "cat_expenses"],

  // وضع الإجازة والراحة
  vacationMode: false,

  // تفضيلات الصلاة والأصوات
  selectedAdhan: "adhan_makkah",
  selectedTakbeer: "takbeer_eid_1",
  prePrayerMinutes: 15,
  isVibrateOnly: false,
  autoSilentDuration: 25,

  // القرآن الكريم
  quran: {
    currentSurah: 1,
    bookmark: JSON.parse(localStorage.getItem("app_quran_bookmark") || '{"surah": 1, "ayah": 1, "name": "الفاتحة"}'),
    fontSize: 22,
    theme: "sepia" // 'white', 'sepia', 'night'
  },

  // الأذكار والتسبيح
  azkarProgress: JSON.parse(localStorage.getItem("app_azkar_progress") || "{}"),
  tasbeehTotal: parseInt(localStorage.getItem("app_tasbeeh_total") || "0", 10),
  tasbeehSession: 0,

  // التمارين والرياضة
  fitness: {
    timer: {
      workTime: 30, // بالثواني
      restTime: 15,
      rounds: 5,
      currentRound: 1,
      phase: "ready", // 'work', 'rest', 'finished'
      timeLeft: 30,
      isRunning: false,
      intervalId: null
    },
    weeklyCompletedDays: JSON.parse(localStorage.getItem("app_completed_workouts") || "[]")
  },

  // الملاحظات والمهام
  notes: JSON.parse(localStorage.getItem("app_user_notes") || "[]"),
  tasks: JSON.parse(localStorage.getItem("app_user_tasks") || "[]"),

  // الصحة والعادات
  health: {
    waterTarget: 2500, // مل
    waterConsumed: parseInt(localStorage.getItem("app_water_consumed") || "0", 10),
    lastWaterDate: localStorage.getItem("app_water_date") || new Date().toDateString(),
    moveReminder: true,
    medReminder: true
  },

  // المصاريف اليومية
  expenses: {
    monthlyBudget: parseFloat(localStorage.getItem("app_budget_monthly") || "1000"),
    items: JSON.parse(localStorage.getItem("app_expense_items") || "[]")
  },

  // إعدادات المظهر
  theme: localStorage.getItem("app_theme") || "dark"
};

// ==========================================================================
// 1. إدارة الإعدادات والحفظ التلقائي
// ==========================================================================
function saveAppState() {
  localStorage.setItem("app_categories_state", JSON.stringify(AppState.categories));
  localStorage.setItem("app_category_order", JSON.stringify(AppState.categoryOrder));
  localStorage.setItem("app_vacation_mode", AppState.vacationMode);
  localStorage.setItem("app_selected_adhan", AppState.selectedAdhan);
  localStorage.setItem("app_selected_takbeer", AppState.selectedTakbeer);
  localStorage.setItem("app_pre_prayer_min", AppState.prePrayerMinutes);
  localStorage.setItem("app_theme", AppState.theme);
}

function loadSavedSettings() {
  const savedCats = JSON.parse(localStorage.getItem("app_categories_state") || "null");
  if (savedCats) AppState.categories = Object.assign(AppState.categories, savedCats);

  const savedOrder = JSON.parse(localStorage.getItem("app_category_order") || "null");
  if (savedOrder) AppState.categoryOrder = savedOrder;

  AppState.vacationMode = localStorage.getItem("app_vacation_mode") === "true";
  AppState.selectedAdhan = localStorage.getItem("app_selected_adhan") || "adhan_makkah";
  AppState.selectedTakbeer = localStorage.getItem("app_selected_takbeer") || "takbeer_eid_1";
  AppState.prePrayerMinutes = parseInt(localStorage.getItem("app_pre_prayer_min") || "15", 10);
}

// ==========================================================================
// 2. السحب والإفلات والتحكم في ظهور الفئات (Drag & Drop + Visibility)
// ==========================================================================
function applyCategoryVisibilityAndOrder() {
  const container = document.getElementById("mainCategoriesContainer");
  if (!container) return;

  // التحقق من تفعيل أو إخفاء كل فئة
  for (const [catKey, isEnabled] of Object.entries(AppState.categories)) {
    const sectionEl = document.getElementById(`section_${catKey}`);
    const toggleEl = document.getElementById(`toggle_cat_${catKey}`);
    if (sectionEl) {
      sectionEl.style.display = isEnabled ? "block" : "none";
    }
    if (toggleEl) {
      toggleEl.checked = isEnabled;
    }
  }

  // إعادة الترتيب حسب المصفوفة المحفوظة
  AppState.categoryOrder.forEach(sectionId => {
    const el = document.getElementById(sectionId);
    if (el) container.appendChild(el);
  });

  // تحديث حالة وضع الإجازة
  const vacationToggle = document.getElementById("vacationModeToggle");
  const vacationBadge = document.getElementById("vacationBadge");
  if (vacationToggle) vacationToggle.checked = AppState.vacationMode;
  if (vacationBadge) vacationBadge.style.display = AppState.vacationMode ? "inline-flex" : "none";
}

function initDragAndDrop() {
  const cards = document.querySelectorAll(".draggable-category-card");
  const container = document.getElementById("mainCategoriesContainer");
  if (!container) return;

  let draggedItem = null;

  cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      draggedItem = card;
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      draggedItem = null;
      // حفظ الترتيب الجديد
      const currentOrder = Array.from(container.children)
        .filter(child => child.classList.contains("draggable-category-card"))
        .map(child => child.id);
      AppState.categoryOrder = currentOrder;
      saveAppState();
    });
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    if (draggedItem) {
      if (afterElement == null) {
        container.appendChild(draggedItem);
      } else {
        container.insertBefore(draggedItem, afterElement);
      }
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".draggable-category-card:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ==========================================================================
// 3. الفئة الأولى: الدين (الصلاة، القرآن الكريم، الأذكار والسبحة)
// ==========================================================================

// أ) إعداد مكتبة أصوات الأذان والتكبير
function initAudioLibrarySelectors() {
  const adhanList = document.getElementById("adhanSoundList");
  const takbeerList = document.getElementById("takbeerSoundList");

  if (adhanList) {
    adhanList.innerHTML = AUDIO_LIBRARY.adhans.map(item => `
      <div class="audio-select-item ${AppState.selectedAdhan === item.id ? 'active' : ''}" data-id="${item.id}">
        <div class="audio-info">
          <strong>${item.name}</strong>
          <span>${item.mood}</span>
        </div>
        <div class="audio-actions">
          <button class="btn-preview-audio" data-type="adhan" data-id="${item.id}" title="استماع مسبق">▶️</button>
          <input type="radio" name="adhanChoice" value="${item.id}" ${AppState.selectedAdhan === item.id ? 'checked' : ''}>
        </div>
      </div>
    `).join("");
  }

  if (takbeerList) {
    takbeerList.innerHTML = AUDIO_LIBRARY.takbeers.map(item => `
      <div class="audio-select-item ${AppState.selectedTakbeer === item.id ? 'active' : ''}" data-id="${item.id}">
        <div class="audio-info">
          <strong>${item.name}</strong>
          <span>${item.style}</span>
        </div>
        <div class="audio-actions">
          <button class="btn-preview-audio" data-type="takbeer" data-id="${item.id}" title="استماع مسبق">▶️</button>
          <input type="radio" name="takbeerChoice" value="${item.id}" ${AppState.selectedTakbeer === item.id ? 'checked' : ''}>
        </div>
      </div>
    `).join("");
  }

  // مستمعي الاستماع المسبق
  document.querySelectorAll(".btn-preview-audio").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      
      if (window.soundEngine.currentPreviewId === id) {
        window.soundEngine.stopAll();
        btn.textContent = "▶️";
      } else {
        document.querySelectorAll(".btn-preview-audio").forEach(b => b.textContent = "▶️");
        btn.textContent = "⏹️";
        if (type === "adhan") {
          window.soundEngine.playAdhanSound(id);
        } else {
          window.soundEngine.playTakbeerSound(id);
        }
      }
    });
  });

  window.onAudioPreviewEnd = () => {
    document.querySelectorAll(".btn-preview-audio").forEach(b => b.textContent = "▶️");
  };

  // اختيار الأذان الافتراضي
  document.querySelectorAll("input[name='adhanChoice']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      AppState.selectedAdhan = e.target.value;
      saveAppState();
      initAudioLibrarySelectors();
      showToast("تم حفظ صوت الأذان المختار");
    });
  });

  document.querySelectorAll("input[name='takbeerChoice']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      AppState.selectedTakbeer = e.target.value;
      saveAppState();
      initAudioLibrarySelectors();
      showToast("تم حفظ نغمة التكبير المختارة");
    });
  });
}

// ب) قارئ القرآن الكريم المتقدم
function initQuranReader() {
  const surahSelect = document.getElementById("quranSurahSelect");
  const searchInput = document.getElementById("quranSearchInput");
  const readerArea = document.getElementById("quranVersesArea");
  const bookmarkBtn = document.getElementById("bookmarkCurrentSurahBtn");
  const bookmarkDisplay = document.getElementById("savedBookmarkBadge");
  const fontSizeSlider = document.getElementById("quranFontSizeSlider");
  const themeBtns = document.querySelectorAll(".quran-theme-btn");

  // ملء قائمة السور
  if (surahSelect) {
    surahSelect.innerHTML = QURAN_SURAHS.map(s => `
      <option value="${s.id}" ${s.id === AppState.quran.currentSurah ? 'selected' : ''}>
        ${s.id}. سورة ${s.name} (${s.type} - ${s.verses} آية)
      </option>
    `).join("");

    surahSelect.addEventListener("change", (e) => {
      loadSurah(parseInt(e.target.value, 10));
    });
  }

  // البحث السريع في السور
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        surahSelect.innerHTML = QURAN_SURAHS.map(s => `<option value="${s.id}">${s.id}. سورة ${s.name}</option>`).join("");
        return;
      }
      const filtered = QURAN_SURAHS.filter(s => s.name.includes(q) || s.englishName.toLowerCase().includes(q));
      surahSelect.innerHTML = filtered.map(s => `<option value="${s.id}">${s.id}. سورة ${s.name}</option>`).join("");
      if (filtered.length > 0) {
        loadSurah(filtered[0].id);
      }
    });
  }

  // تكبير وتصغير الخط
  if (fontSizeSlider) {
    fontSizeSlider.value = AppState.quran.fontSize;
    fontSizeSlider.addEventListener("input", (e) => {
      AppState.quran.fontSize = e.target.value;
      readerArea.style.fontSize = `${e.target.value}px`;
    });
  }

  // ثيمات القراءة (مريح للعين / داكن / بيج كلاسيكي)
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      themeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const th = btn.dataset.qtheme;
      AppState.quran.theme = th;
      readerArea.setAttribute("data-read-theme", th);
    });
  });

  // حفظ العلامة (Bookmark)
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => {
      const current = QURAN_SURAHS.find(s => s.id === AppState.quran.currentSurah);
      AppState.quran.bookmark = {
        surah: AppState.quran.currentSurah,
        name: current ? current.name : "الفاتحة",
        date: new Date().toLocaleDateString("ar-EG")
      };
      localStorage.setItem("app_quran_bookmark", JSON.stringify(AppState.quran.bookmark));
      updateBookmarkUI();
      showToast("تم حفظ مكان القراءة بنجاح 🔖");
    });
  }

  function updateBookmarkUI() {
    if (bookmarkDisplay && AppState.quran.bookmark) {
      bookmarkDisplay.textContent = `آخر علامة: سورة ${AppState.quran.bookmark.name}`;
      bookmarkDisplay.onclick = () => loadSurah(AppState.quran.bookmark.surah);
    }
  }

  function loadSurah(surahId) {
    AppState.quran.currentSurah = surahId;
    const surahInfo = QURAN_SURAHS.find(s => s.id === surahId);
    const titleEl = document.getElementById("activeSurahTitle");
    if (titleEl && surahInfo) {
      titleEl.textContent = `سورة ${surahInfo.name} (${surahInfo.type} • ${surahInfo.verses} آيات)`;
    }

    readerArea.style.fontSize = `${AppState.quran.fontSize}px`;
    readerArea.setAttribute("data-read-theme", AppState.quran.theme);

    // التحقق من وجود نصوص مخزنة محلياً
    if (SAMPLE_SURAHS_TEXT[surahId]) {
      readerArea.innerHTML = `
        <div class="quran-page-sheet">
          <div class="bismillah-header">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div class="verses-flow">
            ${SAMPLE_SURAHS_TEXT[surahId].map((v, i) => `<span class="ayah-unit" data-ayah="${i+1}">${v}</span> `).join("")}
          </div>
        </div>
      `;
    } else {
      // جلب الآيات تلقائياً عبر API القرآن الكريم الموثوق
      readerArea.innerHTML = `<div class="loading-state">جاري تحميل آيات سورة ${surahInfo ? surahInfo.name : ''}... 📖</div>`;
      fetch(`https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`)
        .then(res => res.json())
        .then(data => {
          if (data && data.code === 200) {
            const ayahs = data.data.ayahs;
            readerArea.innerHTML = `
              <div class="quran-page-sheet">
                <div class="verses-flow">
                  ${ayahs.map(a => `<span class="ayah-unit" data-ayah="${a.numberInSurah}">${a.text} ﴿${a.numberInSurah}﴾</span> `).join("")}
                </div>
              </div>
            `;
          }
        })
        .catch(() => {
          readerArea.innerHTML = `<div class="error-notice">سورة ${surahInfo.name} - ${surahInfo.verses} آية. يرجى الاتصال بالإنترنت لتحميل كامل نص السورة لأول مرة.</div>`;
        });
    }
  }

  loadSurah(AppState.quran.currentSurah);
  updateBookmarkUI();
}

// ج) الأذكار والسبحة الإلكترونية
function initAzkarAndTasbeeh() {
  const tabs = document.querySelectorAll(".azkar-category-pill");
  const container = document.getElementById("azkarCardsList");

  function renderCategory(cat) {
    if (!container) return;
    const list = ENCYCLOPEDIA_AZKAR[cat] || ENCYCLOPEDIA_AZKAR.morning;
    container.innerHTML = list.map(item => {
      const done = AppState.azkarProgress[item.id] || 0;
      const isCompleted = done >= item.count;
      return `
        <div class="zkr-item-card ${isCompleted ? 'is-complete' : ''}" id="card_${item.id}">
          <p class="zkr-arabic-text">${item.text}</p>
          ${item.benefit ? `<p class="zkr-fadael">💡 ${item.benefit}</p>` : ''}
          <div class="zkr-card-bottom">
            <span class="zkr-target-label">الهدف: ${item.count}</span>
            <button class="btn-zkr-tap" data-id="${item.id}" data-target="${item.count}">
              ${isCompleted ? '✅ تم الإنجاز' : `📿 ${done} / ${item.count}`}
            </button>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".btn-zkr-tap").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const target = parseInt(btn.dataset.target, 10);
        let curr = AppState.azkarProgress[id] || 0;
        
        if (curr < target) {
          curr++;
          AppState.azkarProgress[id] = curr;
          localStorage.setItem("app_azkar_progress", JSON.stringify(AppState.azkarProgress));
          window.soundEngine.playTasbeehClick();
          if (navigator.vibrate) navigator.vibrate(20);
          renderCategory(cat);
        } else {
          // إعادة التعيين
          AppState.azkarProgress[id] = 0;
          localStorage.setItem("app_azkar_progress", JSON.stringify(AppState.azkarProgress));
          renderCategory(cat);
        }
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderCategory(tab.dataset.azkarCat);
    });
  });

  renderCategory("morning");

  // المسبحة المفتوحة
  const tasbeehClickArea = document.getElementById("openTasbeehDisk");
  const tasbeehSessionEl = document.getElementById("tasbeehSessionCounter");
  const tasbeehTotalEl = document.getElementById("tasbeehTotalCounter");
  const resetTasbeehBtn = document.getElementById("resetTasbeehBtn");

  function updateTasbeehDisplay() {
    if (tasbeehSessionEl) tasbeehSessionEl.textContent = AppState.tasbeehSession;
    if (tasbeehTotalEl) tasbeehTotalEl.textContent = AppState.tasbeehTotal.toLocaleString();
  }

  if (tasbeehClickArea) {
    tasbeehClickArea.addEventListener("click", () => {
      AppState.tasbeehSession++;
      AppState.tasbeehTotal++;
      localStorage.setItem("app_tasbeeh_total", AppState.tasbeehTotal);
      window.soundEngine.playTasbeehClick();
      if (navigator.vibrate) {
        if (AppState.tasbeehSession % 33 === 0) {
          navigator.vibrate([40, 60, 40]);
        } else {
          navigator.vibrate(15);
        }
      }
      updateTasbeehDisplay();
    });
  }

  if (resetTasbeehBtn) {
    resetTasbeehBtn.addEventListener("click", () => {
      AppState.tasbeehSession = 0;
      updateTasbeehDisplay();
      showToast("تم تصفير عداد الجلسة الحالية");
    });
  }

  updateTasbeehDisplay();
}

// ==========================================
// 4. الفئة الثانية: التمارين والرياضة (Fitness)
// ==========================================
function initFitnessIntervalTimer() {
  const timer = AppState.fitness.timer;
  const timeDisplay = document.getElementById("intervalTimeDisplay");
  const phaseDisplay = document.getElementById("intervalPhaseDisplay");
  const roundDisplay = document.getElementById("intervalRoundDisplay");
  const startBtn = document.getElementById("startIntervalBtn");
  const resetBtn = document.getElementById("resetIntervalBtn");
  const calendarGrid = document.getElementById("workoutCalendarGrid");

  function updateTimerUI() {
    if (timeDisplay) timeDisplay.textContent = timer.timeLeft.toString().padStart(2, "0");
    if (phaseDisplay) {
      if (timer.phase === "work") {
        phaseDisplay.textContent = "🔥 تمرين ونشاط!";
        phaseDisplay.className = "phase-badge phase-work";
      } else if (timer.phase === "rest") {
        phaseDisplay.textContent = "💧 استراحة والتقاط أنفاس";
        phaseDisplay.className = "phase-badge phase-rest";
      } else if (timer.phase === "finished") {
        phaseDisplay.textContent = "🎉 أحسنت! اكتمل التمرين";
        phaseDisplay.className = "phase-badge phase-finish";
      } else {
        phaseDisplay.textContent = "جاهز للانطلاق";
        phaseDisplay.className = "phase-badge";
      }
    }
    if (roundDisplay) roundDisplay.textContent = `جولة ${timer.currentRound} من ${timer.rounds}`;
  }

  function startTimer() {
    if (timer.isRunning) return;
    timer.isRunning = true;
    if (timer.phase === "ready") {
      timer.phase = "work";
      timer.timeLeft = timer.workTime;
      window.soundEngine.playWorkoutBeep("start");
    }
    startBtn.textContent = "⏸️ إيقاف مؤقت";

    timer.intervalId = setInterval(() => {
      timer.timeLeft--;

      if (timer.timeLeft <= 3 && timer.timeLeft > 0) {
        window.soundEngine.playWorkoutBeep("tick");
      }

      if (timer.timeLeft <= 0) {
        if (timer.phase === "work") {
          if (timer.currentRound >= timer.rounds) {
            // انتهاء كامل الجولات
            timer.phase = "finished";
            clearInterval(timer.intervalId);
            timer.isRunning = false;
            startBtn.textContent = "🔄 تكرار التمرين";
            window.soundEngine.playWorkoutBeep("start");
            recordCompletedWorkout();
          } else {
            // الانتقال إلى الاستراحة
            timer.phase = "rest";
            timer.timeLeft = timer.restTime;
            window.soundEngine.playWorkoutBeep("rest");
          }
        } else if (timer.phase === "rest") {
          // بدء جولة جديدة
          timer.currentRound++;
          timer.phase = "work";
          timer.timeLeft = timer.workTime;
          window.soundEngine.playWorkoutBeep("start");
        }
      }

      updateTimerUI();
    }, 1000);
  }

  function pauseTimer() {
    timer.isRunning = false;
    clearInterval(timer.intervalId);
    startBtn.textContent = "▶️ استئناف";
  }

  function resetTimer() {
    pauseTimer();
    timer.phase = "ready";
    timer.currentRound = 1;
    timer.timeLeft = timer.workTime;
    startBtn.textContent = "▶️ بدء الجولات";
    updateTimerUI();
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (timer.isRunning) pauseTimer();
      else startTimer();
    });
  }

  if (resetBtn) resetBtn.addEventListener("click", resetTimer);

  // تسجيل الإنجاز في تقويم الأسبوع
  function recordCompletedWorkout() {
    const today = new Date().toISOString().split("T")[0];
    if (!AppState.fitness.weeklyCompletedDays.includes(today)) {
      AppState.fitness.weeklyCompletedDays.push(today);
      localStorage.setItem("app_completed_workouts", JSON.stringify(AppState.fitness.weeklyCompletedDays));
      renderCalendar();
      showToast("تم تسجيل إنجازك الرياضي في التقويم بنجاح! 🏃‍♂️💪");
    }
  }

  function renderCalendar() {
    if (!calendarGrid) return;
    calendarGrid.innerHTML = "";
    const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
    const now = new Date();

    days.forEach((dayName, idx) => {
      const d = new Date();
      d.setDate(now.getDate() - (now.getDay() + 1 - idx));
      const dateStr = d.toISOString().split("T")[0];
      const isDone = AppState.fitness.weeklyCompletedDays.includes(dateStr);
      
      const dayBox = document.createElement("div");
      dayBox.className = `calendar-day-cell ${isDone ? 'completed' : ''}`;
      dayBox.innerHTML = `
        <span class="c-day-name">${dayName}</span>
        <span class="c-day-icon">${isDone ? '✅' : '⚪'}</span>
      `;
      calendarGrid.appendChild(dayBox);
    });
  }

  renderCalendar();
  updateTimerUI();
}

// ==========================================
// 5. الفئة الثالثة: الملاحظات والمهام (Notes & To-Do)
// ==========================================
function initNotesAndTasks() {
  const taskListEl = document.getElementById("todoItemsList");
  const taskInput = document.getElementById("quickTaskInput");
  const taskAddBtn = document.getElementById("quickTaskAddBtn");

  const notesGridEl = document.getElementById("notesCardsGrid");
  const noteTextInput = document.getElementById("newNoteTextInput");
  const noteColorInput = document.getElementById("newNoteColorSelect");
  const noteSaveBtn = document.getElementById("saveNoteBtn");

  const voiceRecordBtn = document.getElementById("startVoiceRecordBtn");
  const voiceStatusEl = document.getElementById("voiceRecordStatus");

  // إدارة المهام اليومية (To-Do)
  function renderTasks() {
    if (!taskListEl) return;
    taskListEl.innerHTML = AppState.tasks.length === 0
      ? `<div class="empty-hint">لا توجد مهام حالياً. أضف مهمتك اليومية بالأعلى.</div>`
      : AppState.tasks.map(t => `
        <div class="todo-item-row ${t.done ? 'is-done' : ''}">
          <label class="todo-label">
            <input type="checkbox" class="task-check" data-id="${t.id}" ${t.done ? 'checked' : ''}>
            <span class="task-text">${t.text}</span>
          </label>
          <button class="btn-delete-task" data-id="${t.id}">🗑️</button>
        </div>
      `).join("");

    taskListEl.querySelectorAll(".task-check").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        const task = AppState.tasks.find(t => t.id === id);
        if (task) {
          task.done = e.target.checked;
          localStorage.setItem("app_user_tasks", JSON.stringify(AppState.tasks));
          renderTasks();
        }
      });
    });

    taskListEl.querySelectorAll(".btn-delete-task").forEach(btn => {
      btn.addEventListener("click", () => {
        AppState.tasks = AppState.tasks.filter(t => t.id !== btn.dataset.id);
        localStorage.setItem("app_user_tasks", JSON.stringify(AppState.tasks));
        renderTasks();
      });
    });
  }

  if (taskAddBtn && taskInput) {
    taskAddBtn.addEventListener("click", () => {
      const val = taskInput.value.trim();
      if (val) {
        AppState.tasks.unshift({ id: "task_" + Date.now(), text: val, done: false });
        localStorage.setItem("app_user_tasks", JSON.stringify(AppState.tasks));
        taskInput.value = "";
        renderTasks();
      }
    });
  }

  // إدارة الملاحظات الملونة
  function renderNotes() {
    if (!notesGridEl) return;
    // ترتيب: الملاحظات المثبتة (Pinned) أولاً
    const sorted = [...AppState.notes].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    notesGridEl.innerHTML = sorted.length === 0
      ? `<div class="empty-hint">لا توجد ملاحظات. سجل فكرتك أو تسجيلك الصوتي الآن.</div>`
      : sorted.map(n => `
        <div class="note-card note-color-${n.color || 'yellow'} ${n.pinned ? 'is-pinned' : ''}">
          <div class="note-header-actions">
            <button class="pin-note-btn" data-id="${n.id}" title="تثبيت بالأعلى">${n.pinned ? '📌 مثبت' : '📍'}</button>
            <button class="delete-note-btn" data-id="${n.id}" title="حذف">✕</button>
          </div>
          <div class="note-content-body">
            ${n.text ? `<p>${n.text}</p>` : ''}
            ${n.audioBase64 ? `
              <div class="voice-memo-player">
                <audio controls src="${n.audioBase64}" preload="metadata"></audio>
                <span class="audio-tag">🎙️ ملاحظة صوتية</span>
              </div>
            ` : ''}
          </div>
          <div class="note-date-tag">${n.date}</div>
        </div>
      `).join("");

    notesGridEl.querySelectorAll(".pin-note-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const note = AppState.notes.find(n => n.id === btn.dataset.id);
        if (note) {
          note.pinned = !note.pinned;
          localStorage.setItem("app_user_notes", JSON.stringify(AppState.notes));
          renderNotes();
        }
      });
    });

    notesGridEl.querySelectorAll(".delete-note-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        AppState.notes = AppState.notes.filter(n => n.id !== btn.dataset.id);
        localStorage.setItem("app_user_notes", JSON.stringify(AppState.notes));
        renderNotes();
      });
    });
  }

  if (noteSaveBtn && noteTextInput) {
    noteSaveBtn.addEventListener("click", () => {
      const text = noteTextInput.value.trim();
      const color = noteColorInput ? noteColorInput.value : "yellow";
      if (text) {
        AppState.notes.unshift({
          id: "note_" + Date.now(),
          text,
          color,
          pinned: false,
          date: new Date().toLocaleDateString("ar-EG")
        });
        localStorage.setItem("app_user_notes", JSON.stringify(AppState.notes));
        noteTextInput.value = "";
        renderNotes();
        showToast("تم حفظ الملاحظة بنجاح 📝");
      }
    });
  }

  // التسجيل الصوتي السريع (Voice Memo)
  if (voiceRecordBtn) {
    voiceRecordBtn.addEventListener("click", async () => {
      if (!window.soundEngine.isRecording) {
        const ok = await window.soundEngine.startVoiceRecording();
        if (ok) {
          voiceRecordBtn.classList.add("recording");
          voiceRecordBtn.innerHTML = "⏹️ إيقاف وحفظ التسجيل";
          if (voiceStatusEl) voiceStatusEl.textContent = "🔴 جاري التسجيل الصوتي الآن...";
        } else {
          showToast("يرجى السماح بالوصول للميكروفون للتسجيل");
        }
      } else {
        voiceRecordBtn.classList.remove("recording");
        voiceRecordBtn.innerHTML = "🎙️ تسجيل ملاحظة صوتية";
        if (voiceStatusEl) voiceStatusEl.textContent = "تم إيقاف التسجيل وجاري الحفظ...";

        const recData = await window.soundEngine.stopVoiceRecording();
        if (recData && recData.base64) {
          AppState.notes.unshift({
            id: "voice_" + Date.now(),
            text: "",
            audioBase64: recData.base64,
            color: "blue",
            pinned: true,
            date: new Date().toLocaleDateString("ar-EG") + " (صوتي)"
          });
          localStorage.setItem("app_user_notes", JSON.stringify(AppState.notes));
          renderNotes();
          showToast("تمت إضافة الملاحظة الصوتية بنجاح 🎙️");
          if (voiceStatusEl) voiceStatusEl.textContent = "";
        }
      }
    });
  }

  renderTasks();
  renderNotes();
}

// ==========================================
// 6. الفئة الرابعة: العادات والصحة (Health & Habits)
// ==========================================
function initHealthAndHabits() {
  const waterTarget = AppState.health.waterTarget;
  const currentWaterEl = document.getElementById("waterConsumedDisplay");
  const waterFillSvg = document.getElementById("waterCupFillLevel");
  const waterPercentEl = document.getElementById("waterPercentDisplay");
  const addWater250Btn = document.getElementById("addWater250Btn");
  const addWater500Btn = document.getElementById("addWater500Btn");
  const resetWaterBtn = document.getElementById("resetWaterBtn");

  // إعادة ضبط شرب الماء يومياً
  const todayStr = new Date().toDateString();
  if (AppState.health.lastWaterDate !== todayStr) {
    AppState.health.waterConsumed = 0;
    AppState.health.lastWaterDate = todayStr;
    localStorage.setItem("app_water_date", todayStr);
    localStorage.setItem("app_water_consumed", "0");
  }

  function updateWaterUI() {
    const consumed = AppState.health.waterConsumed;
    const pct = Math.min(100, Math.round((consumed / waterTarget) * 100));

    if (currentWaterEl) currentWaterEl.textContent = `${consumed} / ${waterTarget} مل`;
    if (waterPercentEl) waterPercentEl.textContent = `${pct}% من الهدف اليومي`;
    if (waterFillSvg) {
      // تعديل ارتفاع منسوب الماء في الكوب
      const heightVal = Math.min(100, pct);
      waterFillSvg.style.height = `${heightVal}%`;
    }
  }

  function addWater(amount) {
    AppState.health.waterConsumed += amount;
    localStorage.setItem("app_water_consumed", AppState.health.waterConsumed);
    updateWaterUI();
    window.soundEngine.playTakbeerSound("chime_water");
    showToast(`💧 تم إضافة ${amount} مل ماء، بارك الله في صحتك`);
  }

  if (addWater250Btn) addWater250Btn.addEventListener("click", () => addWater(250));
  if (addWater500Btn) addWater500Btn.addEventListener("click", () => addWater(500));
  if (resetWaterBtn) {
    resetWaterBtn.addEventListener("click", () => {
      AppState.health.waterConsumed = 0;
      localStorage.setItem("app_water_consumed", "0");
      updateWaterUI();
    });
  }

  updateWaterUI();
}

// ==========================================
// 7. الفئة الخامسة: المصاريف اليومية البسيطة (Expenses)
// ==========================================
function initExpensesTracker() {
  const budgetInput = document.getElementById("monthlyBudgetInput");
  const remainingEl = document.getElementById("remainingBudgetDisplay");
  const spentTodayEl = document.getElementById("spentTodayDisplay");
  const expenseForm = document.getElementById("addExpenseForm");
  const expenseListEl = document.getElementById("recentExpensesList");

  function renderExpenses() {
    const budget = AppState.expenses.monthlyBudget;
    const totalSpent = AppState.expenses.items.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const remaining = Math.max(0, budget - totalSpent);

    if (budgetInput) budgetInput.value = budget;
    if (remainingEl) remainingEl.textContent = `${remaining.toLocaleString()} $`;
    if (spentTodayEl) spentTodayEl.textContent = `${totalSpent.toLocaleString()} $`;

    if (expenseListEl) {
      expenseListEl.innerHTML = AppState.expenses.items.length === 0
        ? `<div class="empty-hint">لا توجد مصاريف مسجلة هذا الشهر.</div>`
        : AppState.expenses.items.slice(0, 5).map(exp => `
          <div class="expense-item-row">
            <div class="exp-title-meta">
              <strong>${exp.title}</strong>
              <small>${exp.date} • ${exp.category}</small>
            </div>
            <div class="exp-amount">-${parseFloat(exp.amount).toLocaleString()} $</div>
          </div>
        `).join("");
    }
  }

  if (budgetInput) {
    budgetInput.addEventListener("change", (e) => {
      AppState.expenses.monthlyBudget = parseFloat(e.target.value) || 0;
      localStorage.setItem("app_budget_monthly", AppState.expenses.monthlyBudget);
      renderExpenses();
    });
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("expTitle").value.trim();
      const amount = parseFloat(document.getElementById("expAmount").value);
      const cat = document.getElementById("expCat").value;

      if (title && amount > 0) {
        AppState.expenses.items.unshift({
          id: "exp_" + Date.now(),
          title,
          amount,
          category: cat,
          date: new Date().toLocaleDateString("ar-EG")
        });
        localStorage.setItem("app_expense_items", JSON.stringify(AppState.expenses.items));
        expenseForm.reset();
        renderExpenses();
        showToast("تم تسجيل المصروف بنجاح 💰");
      }
    });
  }

  renderExpenses();
}

// ==========================================
// 8. مركز التحكم العام والإعدادات (Control Center Modal)
// ==========================================
function initControlCenterSettings() {
  const modal = document.getElementById("controlCenterModal");
  const openBtn = document.getElementById("openControlCenterBtn");
  const closeBtn = document.getElementById("closeControlCenterBtn");
  const vacationToggle = document.getElementById("vacationModeToggle");

  if (openBtn) openBtn.addEventListener("click", () => modal.classList.add("open"));
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  // تفعيل وإطفاء الفئات
  document.querySelectorAll(".category-master-toggle").forEach(toggle => {
    toggle.addEventListener("change", (e) => {
      const catKey = e.target.dataset.catKey;
      AppState.categories[catKey] = e.target.checked;
      saveAppState();
      applyCategoryVisibilityAndOrder();
      showToast(`تم ${e.target.checked ? 'تفعيل' : 'إخفاء'} الفئة بنجاح`);
    });
  });

  // تفعيل وضع الإجازة
  if (vacationToggle) {
    vacationToggle.addEventListener("change", (e) => {
      AppState.vacationMode = e.target.checked;
      saveAppState();
      applyCategoryVisibilityAndOrder();
      showToast(AppState.vacationMode ? "تم تفعيل وضع الإجازة والراحة 🌴 (إيقاف منبهات الرياضة)" : "تم استئناف وضع العمل الطبيعي ⚡");
    });
  }

  // تبديل المظهر العام (نهاري / ليلي)
  const themeToggleBtn = document.getElementById("appThemeToggleBtn");
  function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === "light" ? "🌙 الوضع الليلي" : "☀️ الوضع النهاري";
    }
  }

  applyTheme(AppState.theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const next = AppState.theme === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }
}

// ==========================================
// 9. الإشعارات والتحقق الدوري (Heartbeat Clock)
// ==========================================
function showToast(msg) {
  const toast = document.getElementById("appGlobalToast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// إشعار موعد الصلاة
window.onPrayerTimeArrived = (prayerInfo) => {
  if (AppState.vacationMode && prayerInfo.key === "Sunrise") return; // تجاهل التنبيهات غير الضرورية
  
  // تشغيل صوت الأذان المختار من مكتبة الأصوات
  if (!AppState.isVibrateOnly) {
    window.soundEngine.playAdhanSound(AppState.selectedAdhan);
  }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);

  showToast(`🕌 حان الآن موعد ${prayerInfo.name}`);
};

// بدء تشغيل كافة وحدات التطبيق عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", async () => {
  loadSavedSettings();
  initControlCenterSettings();
  applyCategoryVisibilityAndOrder();
  initDragAndDrop();

  // جلب مواقيت الصلاة
  await window.prayerEngine.fetchTimes();

  // تفعيل باقي الوحدات
  initAudioLibrarySelectors();
  initQuranReader();
  initAzkarAndTasbeeh();
  initFitnessIntervalTimer();
  initNotesAndTasks();
  initHealthAndHabits();
  initExpensesTracker();

  // نبض كل ثانية لتحديث عداد الصلاة
  setInterval(() => {
    window.prayerEngine.tick();
  }, 1000);
});

