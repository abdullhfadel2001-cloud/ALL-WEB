// ==========================================================================
// تطبيق «سَنَد» - العقل المدبر ومحرك التطبيق الديني الكامل
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. إنشاء الكائنات الأساسية
  const prayerEngine = new PrayerEngine();
  const audioEngine = new AudioEngine();

  // عناصر واجهة المستخدم
  const toastEl = document.getElementById('sanadToast');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const tabsNavBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // بيانات التخزين
  let selectedAdhanId = localStorage.getItem('sanad_selected_adhan') || 'adhan_makkah';
  let selectedTakbeerId = localStorage.getItem('sanad_selected_takbeer') || 'takbeer_eid_1';
  let tasbeehCount = parseInt(localStorage.getItem('sanad_tasbeeh_count') || '0', 10);
  let tasbeehTotal = parseInt(localStorage.getItem('sanad_tasbeeh_total') || '0', 10);
  let currentPhrase = localStorage.getItem('sanad_tasbeeh_phrase') || 'سُبْحَانَ اللَّهِ';
  let readerFontSize = parseInt(localStorage.getItem('sanad_reader_font_size') || '24', 10);
  let readerThemeIndex = 0; // 0: default, 1: sepia, 2: night
  const readerThemes = ['', 'theme-sepia', 'theme-night'];

  // حالة الأذكار اللحظية
  let currentAzkarCat = 'morning';
  let azkarProgress = {}; // { zekrId: remainingCount }

  // --------------------------------------------------------------------------
  // دالة إظهار التنبيهات (Toast)
  // --------------------------------------------------------------------------
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 1. نظام المظهر المريح للعين (Dark / Light)
  // --------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('sanad_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('sanad_theme', next);
        updateThemeIcon(next);
        showToast(next === 'dark' ? '🌙 تم تفعيل الوضع الليلي الهادئ' : '☀️ تم تفعيل الوضع النهاري المريح للعين');
      });
    }
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // --------------------------------------------------------------------------
  // 2. التنقل بين التبويبات الدينية الثلاثة
  // --------------------------------------------------------------------------
  tabsNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabsNavBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // إيقاف أي معاينة صوتية نشطة عند التنقل
      audioEngine.stopAll();
      resetAudioPreviewButtons();
    });
  });

  // --------------------------------------------------------------------------
  // 3. محرك الصلاة والمواقيت البانورامي
  // --------------------------------------------------------------------------
  async function initPrayerSection() {
    await prayerEngine.fetchTimes();
    updatePrayerUI();
    setInterval(updatePrayerUI, 1000);

    // زر تحديث الموقع
    const locBtn = document.getElementById('locationChangeBtn');
    if (locBtn) {
      locBtn.addEventListener('click', async () => {
        showToast('📍 جاري تحديث مواقيت الصلاة حسب موقعك...');
        await prayerEngine.fetchTimes();
        updatePrayerUI();
        showToast('✅ تم تحديث المواقيت بنجاح!');
      });
    }
  }

  function updatePrayerUI() {
    if (!prayerEngine.times) return;

    // تحديث أوقات الصلوات في الشريط الأفقي
    const keys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    keys.forEach(k => {
      const el = document.getElementById(`time_${k}`);
      if (el && prayerEngine.times[k]) {
        el.textContent = prayerEngine.times[k];
      }
    });

    // تمييز الصلاة النشطة
    prayerEngine.calculateNextPrayer();
    const nextKey = prayerEngine.nextPrayerKey;

    document.querySelectorAll('.timing-col').forEach(col => {
      col.classList.remove('active-prayer');
      if (col.dataset.prayer === nextKey) {
        col.classList.add('active-prayer');
      }
    });

    // تحديث اسم الصلاة القادمة والعداد
    const heroName = document.getElementById('heroNextPrayerName');
    const heroTime = document.getElementById('heroNextPrayerTime');
    const heroClock = document.getElementById('heroCountdownTimer');
    const cityDisplay = document.getElementById('displayCityName');
    const hijriDisplay = document.getElementById('hijriDateDisplay');

    if (heroName) heroName.textContent = prayerEngine.nextPrayerName || 'صلاة الفجر';
    if (heroTime && prayerEngine.times[nextKey]) {
      heroTime.textContent = `موعد الأذان: ${prayerEngine.times[nextKey]}`;
    }
    if (heroClock) {
      heroClock.textContent = prayerEngine.countdownStr || '00:00:00';
    }
    if (cityDisplay) {
      cityDisplay.textContent = prayerEngine.cityName || 'موقعي الحالي';
    }

    // التاريخ الهجري التقريبي
    if (hijriDisplay) {
      const today = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date());
      hijriDisplay.textContent = today;
    }
  }

  // --------------------------------------------------------------------------
  // 4. مكتبة الأصوات (10 أذان + 10 تكبيرات مع معاينة فورية)
  // --------------------------------------------------------------------------
  function initAudioLibrary() {
    const adhanGrid = document.getElementById('adhanAudioGrid');
    const takbeerGrid = document.getElementById('takbeerAudioGrid');

    // توليد أصوات الأذان
    if (adhanGrid && AUDIO_LIBRARY.adhans) {
      adhanGrid.innerHTML = '';
      AUDIO_LIBRARY.adhans.forEach(ad => {
        const isSelected = ad.id === selectedAdhanId;
        const card = document.createElement('div');
        card.className = `audio-item-card ${isSelected ? 'selected-sound' : ''}`;
        card.id = `card_${ad.id}`;

        card.innerHTML = `
          <div class="audio-item-info">
            <span class="audio-title">${ad.name}</span>
            <span class="audio-desc">${ad.mood}</span>
          </div>
          <div class="audio-item-actions">
            <button class="play-preview-btn" data-audio-id="${ad.id}" data-type="adhan" title="استماع">▶</button>
            <input type="radio" name="selected_adhan" value="${ad.id}" class="select-sound-radio" ${isSelected ? 'checked' : ''} title="تعيين كأذان رئيسي">
          </div>
        `;
        adhanGrid.appendChild(card);
      });
    }

    // توليد أصوات التكبيرات
    if (takbeerGrid && AUDIO_LIBRARY.takbeers) {
      takbeerGrid.innerHTML = '';
      AUDIO_LIBRARY.takbeers.forEach(tk => {
        const isSelected = tk.id === selectedTakbeerId;
        const card = document.createElement('div');
        card.className = `audio-item-card ${isSelected ? 'selected-sound' : ''}`;
        card.id = `card_${tk.id}`;

        card.innerHTML = `
          <div class="audio-item-info">
            <span class="audio-title">${tk.name}</span>
            <span class="audio-desc">${tk.style}</span>
          </div>
          <div class="audio-item-actions">
            <button class="play-preview-btn" data-audio-id="${tk.id}" data-type="takbeer" title="استماع">▶</button>
            <input type="radio" name="selected_takbeer" value="${tk.id}" class="select-sound-radio" ${isSelected ? 'checked' : ''} title="تعيين كتنبيه رئيسي">
          </div>
        `;
        takbeerGrid.appendChild(card);
      });
    }

    // إدارة الاستماع المسبق
    document.querySelectorAll('.play-preview-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const audioId = btn.dataset.audioId;
        const type = btn.dataset.type;

        if (audioEngine.isPlayingPreview && audioEngine.currentPreviewId === audioId) {
          audioEngine.stopAll();
          resetAudioPreviewButtons();
        } else {
          audioEngine.stopAll();
          resetAudioPreviewButtons();
          btn.textContent = '⏹';
          btn.classList.add('playing');

          if (type === 'adhan') {
            audioEngine.playAdhanSound(audioId);
          } else {
            audioEngine.playTakbeerSound(audioId);
          }

          // إعادة الزر بعد انتهاء النغمة
          setTimeout(() => {
            if (btn.classList.contains('playing')) {
              btn.textContent = '▶';
              btn.classList.remove('playing');
            }
          }, 7000);
        }
      });
    });

    // إدارة اختيار الصوت وحفظه
    document.querySelectorAll('input[name="selected_adhan"]').forEach(radio => {
      radio.addEventListener('change', () => {
        selectedAdhanId = radio.value;
        localStorage.setItem('sanad_selected_adhan', selectedAdhanId);
        document.querySelectorAll('#adhanAudioGrid .audio-item-card').forEach(c => c.classList.remove('selected-sound'));
        const activeCard = document.getElementById(`card_${selectedAdhanId}`);
        if (activeCard) activeCard.classList.add('selected-sound');
        showToast('📢 تم تعيين صوت الأذان المفضل!');
      });
    });

    document.querySelectorAll('input[name="selected_takbeer"]').forEach(radio => {
      radio.addEventListener('change', () => {
        selectedTakbeerId = radio.value;
        localStorage.setItem('sanad_selected_takbeer', selectedTakbeerId);
        document.querySelectorAll('#takbeerAudioGrid .audio-item-card').forEach(c => c.classList.remove('selected-sound'));
        const activeCard = document.getElementById(`card_${selectedTakbeerId}`);
        if (activeCard) activeCard.classList.add('selected-sound');
        showToast('✨ تم تعيين نغمة التكبير المفضلة!');
      });
    });
  }

  function resetAudioPreviewButtons() {
    document.querySelectorAll('.play-preview-btn').forEach(b => {
      b.textContent = '▶';
      b.classList.remove('playing');
    });
  }

  // --------------------------------------------------------------------------
  // 5. قسم المصحف الشريف وقارئ الآيات العثماني
  // --------------------------------------------------------------------------
  const surahsContainer = document.getElementById('surahsGridContainer');
  const readerModal = document.getElementById('quranReaderModal');
  const closeReaderBtn = document.getElementById('closeReaderBtn');
  const quranContent = document.getElementById('quranReaderContent');
  const modalSurahName = document.getElementById('modalSurahName');
  const modalSurahMeta = document.getElementById('modalSurahMeta');
  const fontIncBtn = document.getElementById('fontIncBtn');
  const fontDecBtn = document.getElementById('fontDecBtn');
  const readingThemeBtn = document.getElementById('readingThemeBtn');
  const saveBookmarkBtn = document.getElementById('saveBookmarkBtn');
  const resumeBookmarkBtn = document.getElementById('resumeBookmarkBtn');
  const quranSearchInput = document.getElementById('quranSearchInput');

  let currentReadingSurah = null;

  function initQuranSection() {
    renderSurahsList(QURAN_SURAHS);

    // البحث في السور
    if (quranSearchInput) {
      quranSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        const filtered = QURAN_SURAHS.filter(s => 
          s.name.includes(query) || 
          s.englishName.toLowerCase().includes(query) ||
          String(s.id) === query
        );
        renderSurahsList(filtered);
      });
    }

    // إغلاق نافذة القراءة
    if (closeReaderBtn) {
      closeReaderBtn.addEventListener('click', () => {
        readerModal.classList.remove('open');
      });
    }

    // تكبير وتصغير خط المصحف
    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', () => {
        if (readerFontSize < 42) {
          readerFontSize += 2;
          applyReaderFontSize();
        }
      });
    }
    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', () => {
        if (readerFontSize > 18) {
          readerFontSize -= 2;
          applyReaderFontSize();
        }
      });
    }

    // تبديل نمط خلفية المصحف (افتراضي، ورق مصحف كلاسيكي، ليلي)
    if (readingThemeBtn) {
      readingThemeBtn.addEventListener('click', () => {
        readerThemeIndex = (readerThemeIndex + 1) % readerThemes.length;
        const box = document.querySelector('.reader-modal-box');
        box.classList.remove('theme-sepia', 'theme-night');
        if (readerThemes[readerThemeIndex]) {
          box.classList.add(readerThemes[readerThemeIndex]);
        }
        showToast('🎨 تم تغيير نمط القراءة لراحة العين');
      });
    }

    // حفظ الفاصلة
    if (saveBookmarkBtn) {
      saveBookmarkBtn.addEventListener('click', () => {
        if (currentReadingSurah) {
          const bookmark = {
            surahId: currentReadingSurah.id,
            surahName: currentReadingSurah.name,
            date: new Date().toLocaleDateString('ar-EG')
          };
          localStorage.setItem('sanad_quran_bookmark', JSON.stringify(bookmark));
          showToast(`🔖 تم حفظ الفاصلة عند سورة ${currentReadingSurah.name}`);
        }
      });
    }

    // متابعة القراءة من الفاصلة المحفوظة
    if (resumeBookmarkBtn) {
      resumeBookmarkBtn.addEventListener('click', () => {
        const bookmark = JSON.parse(localStorage.getItem('sanad_quran_bookmark') || 'null');
        if (bookmark) {
          const target = QURAN_SURAHS.find(s => s.id === bookmark.surahId);
          if (target) {
            openSurahReader(target);
            showToast(`📖 تم فتح سورة ${target.name} من مكان توقفك`);
          }
        } else {
          showToast('لا توجد فاصلة محفوظة بعد. احفظ فاصلة عند أي سورة أولاً!');
        }
      });
    }
  }

  function renderSurahsList(list) {
    if (!surahsContainer) return;
    surahsContainer.innerHTML = '';

    if (!list.length) {
      surahsContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">لم يتم العثور على سور مطابقة للبحث</div>`;
      return;
    }

    list.forEach(surah => {
      const card = document.createElement('div');
      card.className = 'surah-card';
      card.innerHTML = `
        <div class="surah-card-left">
          <div class="surah-number-badge">${surah.id}</div>
          <div class="surah-info">
            <div class="surah-name">سورة ${surah.name}</div>
            <div class="surah-meta">${surah.type} • ${surah.verses} آيات • ص ${surah.startPage || 1}</div>
          </div>
        </div>
        <div class="read-arrow">←</div>
      `;
      card.addEventListener('click', () => openSurahReader(surah));
      surahsContainer.appendChild(card);
    });
  }

  function openSurahReader(surah) {
    currentReadingSurah = surah;
    if (modalSurahName) modalSurahName.textContent = `سورة ${surah.name}`;
    if (modalSurahMeta) modalSurahMeta.textContent = `${surah.type} • ${surah.verses} آيات`;

    applyReaderFontSize();

    // جلب أو توليد آيات السورة
    let versesHtml = '';
    if (surah.id !== 9) { // التوبة بدون بسملة
      versesHtml += `<div class="bismillah-header">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
    }

    const sample = SAMPLE_SURAHS_TEXT[surah.id];
    if (sample && sample.length) {
      versesHtml += sample.join(' ');
    } else {
      // عرض توضيحي عثماني عالي الجودة
      versesHtml += `
        <div style="text-align: center; margin: 15px 0; font-size: 0.95em; color: var(--gold);">
          ﴿ قراءة سورة ${surah.name} المباركة ﴾
        </div>
        الحمد لله رب العالمين ﴿١﴾ الرحمن الرحيم ﴿٢﴾ مالك يوم الدين ﴿٣﴾ إياك نعبد وإياك نستعين ﴿٤﴾ اهدنا الصراط المستقيم ﴿٥﴾ صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين ﴿٦﴾.
      `;
    }

    if (quranContent) {
      quranContent.innerHTML = versesHtml;
    }

    readerModal.classList.add('open');
  }

  function applyReaderFontSize() {
    if (quranContent) {
      quranContent.style.fontSize = `${readerFontSize}px`;
    }
    localStorage.setItem('sanad_reader_font_size', readerFontSize);
  }

  // --------------------------------------------------------------------------
  // 6. قسم الأذكار والسبحة الرقمية
  // --------------------------------------------------------------------------
  function initAzkarAndTasbeeh() {
    // إعداد السبحة
    const tasbeehBtn = document.getElementById('tasbeehTapArea');
    const tasbeehCountEl = document.getElementById('tasbeehCurrentCount');
    const tasbeehTotalEl = document.getElementById('tasbeehTotalCount');
    const tasbeehPhraseEl = document.getElementById('currentTasbeehPhrase');
    const resetTasbeehBtn = document.getElementById('resetTasbeehBtn');
    const presetBtns = document.querySelectorAll('.preset-pill');

    if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
    if (tasbeehTotalEl) tasbeehTotalEl.textContent = tasbeehTotal;
    if (tasbeehPhraseEl) tasbeehPhraseEl.textContent = currentPhrase;

    // نقر السبحة
    if (tasbeehBtn) {
      tasbeehBtn.addEventListener('click', () => {
        tasbeehCount++;
        tasbeehTotal++;
        if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
        if (tasbeehTotalEl) tasbeehTotalEl.textContent = tasbeehTotal;

        localStorage.setItem('sanad_tasbeeh_count', tasbeehCount);
        localStorage.setItem('sanad_tasbeeh_total', tasbeehTotal);

        // اهتزاز خفيف ونغمة نقرة
        if ('vibrate' in navigator) navigator.vibrate(25);
        audioEngine.playTasbeehClick();
      });
    }

    // تصفير العداد
    if (resetTasbeehBtn) {
      resetTasbeehBtn.addEventListener('click', () => {
        if (confirm('هل تريد تصفير عداد السبحة الحالي؟')) {
          tasbeehCount = 0;
          if (tasbeehCountEl) tasbeehCountEl.textContent = '0';
          localStorage.setItem('sanad_tasbeeh_count', '0');
          showToast('↺ تم تصفير العداد');
        }
      });
    }

    // اختيار ذكر سريع للسبحة
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPhrase = btn.dataset.phrase;
        if (tasbeehPhraseEl) tasbeehPhraseEl.textContent = currentPhrase;
        localStorage.setItem('sanad_tasbeeh_phrase', currentPhrase);
      });
    });

    // تبويبات موسوعة الأذكار
    const catBtns = document.querySelectorAll('.azkar-cat-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAzkarCat = btn.dataset.cat;
        renderAzkarList();
      });
    });

    renderAzkarList();
  }

  function renderAzkarList() {
    const container = document.getElementById('azkarListContainer');
    if (!container) return;

    const list = AZKAR_DATA[currentAzkarCat] || [];
    container.innerHTML = '';

    list.forEach(item => {
      if (azkarProgress[item.id] === undefined) {
        azkarProgress[item.id] = item.count;
      }
      const remaining = azkarProgress[item.id];
      const isDone = remaining <= 0;

      const card = document.createElement('div');
      card.className = `zekr-card ${isDone ? 'completed' : ''}`;
      card.id = `zekr_${item.id}`;

      card.innerHTML = `
        <div class="zekr-content">
          <div class="zekr-text">${item.text}</div>
          <div class="zekr-benefit">✨ ${item.benefit || ''}</div>
        </div>
        <button class="zekr-counter-btn" data-id="${item.id}" title="اضغط للتسبيح">
          ${isDone ? '✓' : remaining}
        </button>
      `;

      const countBtn = card.querySelector('.zekr-counter-btn');
      countBtn.addEventListener('click', () => {
        if (azkarProgress[item.id] > 0) {
          azkarProgress[item.id]--;
          if ('vibrate' in navigator) navigator.vibrate(35);
          audioEngine.playTasbeehClick();

          if (azkarProgress[item.id] === 0) {
            countBtn.textContent = '✓';
            card.classList.add('completed');
            showToast('تقبل الله طاعتك! ✨');
          } else {
            countBtn.textContent = azkarProgress[item.id];
          }
        }
      });

      container.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // بدء تشغيل جميع أقسام التطبيق
  // --------------------------------------------------------------------------
  initTheme();
  initPrayerSection();
  initAudioLibrary();
  initQuranSection();
  initAzkarAndTasbeeh();
});
