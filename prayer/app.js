// ==========================================================================
// تطبيق «سَنَد» - العقل المدبر ومحرك التطبيق الديني الكامل
// تشغيل أصوات MP3 حقيقية + مصحف حقيقي كامل 604 صفحات بتقليب تفاعلي
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. الكائنات الأساسية
  const prayerEngine = new PrayerEngine();
  const audioEngine = new AudioEngine();

  // عناصر واجهة المستخدم
  const toastEl = document.getElementById('sanadToast');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const tabsNavBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // بيانات التخزين
  let selectedAdhanId = localStorage.getItem('sanad_selected_adhan') || 'adhan_ali_mullah';
  let selectedTakbeerId = localStorage.getItem('sanad_selected_takbeer') || 'takbeer_ali_mullah';
  let tasbeehCount = parseInt(localStorage.getItem('sanad_tasbeeh_count') || '0', 10);
  let tasbeehTotal = parseInt(localStorage.getItem('sanad_tasbeeh_total') || '0', 10);
  let currentPhrase = localStorage.getItem('sanad_tasbeeh_phrase') || 'سُبْحَانَ اللَّهِ';

  // حالة المصحف الشريف
  let currentMushafPage = parseInt(localStorage.getItem('sanad_mushaf_last_page') || '1', 10);
  let mushafThemes = ['', 'sepia', 'night'];
  let currentMushafThemeIdx = parseInt(localStorage.getItem('sanad_mushaf_theme_idx') || '0', 10);

  // حالة الأذكار
  let currentAzkarCat = 'morning';
  let azkarProgress = {};

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
  // 1. نظام المظهر العام (Dark / Light)
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

      // إيقاف أي صوت نشط عند التنقل
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

    const keys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    keys.forEach(k => {
      const el = document.getElementById(`time_${k}`);
      if (el && prayerEngine.times[k]) {
        el.textContent = prayerEngine.times[k];
      }
    });

    prayerEngine.calculateNextPrayer();
    const nextKey = prayerEngine.nextPrayerKey;

    document.querySelectorAll('.timing-col').forEach(col => {
      col.classList.remove('active-prayer');
      if (col.dataset.prayer === nextKey) {
        col.classList.add('active-prayer');
      }
    });

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
  // 4. مكتبة الأصوات الحقيقية (10 أذان MP3 + 10 تكبيرات MP3 حقيقية)
  // --------------------------------------------------------------------------
  function initAudioLibrary() {
    const adhanGrid = document.getElementById('adhanAudioGrid');
    const takbeerGrid = document.getElementById('takbeerAudioGrid');

    // توليد بطاقات أصوات الأذان الحقيقية
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
            <button class="play-preview-btn" data-audio-id="${ad.id}" data-type="adhan" title="استماع حقيقي">▶</button>
            <input type="radio" name="selected_adhan" value="${ad.id}" class="select-sound-radio" ${isSelected ? 'checked' : ''} title="تعيين كأذان رئيسي">
          </div>
        `;
        adhanGrid.appendChild(card);
      });
    }

    // توليد بطاقات أصوات التكبيرات الحقيقية
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
            <button class="play-preview-btn" data-audio-id="${tk.id}" data-type="takbeer" title="استماع حقيقي">▶</button>
            <input type="radio" name="selected_takbeer" value="${tk.id}" class="select-sound-radio" ${isSelected ? 'checked' : ''} title="تعيين كتنبيه رئيسي">
          </div>
        `;
        takbeerGrid.appendChild(card);
      });
    }

    // إدارة الاستماع المسبق للأصوات الحقيقية MP3
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

          const resetCallback = () => {
            btn.textContent = '▶';
            btn.classList.remove('playing');
          };

          if (type === 'adhan') {
            audioEngine.playAdhanSound(audioId, resetCallback);
            showToast('🔊 جاري تشغيل الأذان الحقيقي...');
          } else {
            audioEngine.playTakbeerSound(audioId, resetCallback);
            showToast('✨ جاري تشغيل التكبيرات الحقيقية...');
          }
        }
      });
    });

    // حفظ الاختيار
    document.querySelectorAll('input[name="selected_adhan"]').forEach(radio => {
      radio.addEventListener('change', () => {
        selectedAdhanId = radio.value;
        localStorage.setItem('sanad_selected_adhan', selectedAdhanId);
        document.querySelectorAll('#adhanAudioGrid .audio-item-card').forEach(c => c.classList.remove('selected-sound'));
        const activeCard = document.getElementById(`card_${selectedAdhanId}`);
        if (activeCard) activeCard.classList.add('selected-sound');
        showToast('📢 تم تعيين صوت الأذان المفضل بنجاح!');
      });
    });

    document.querySelectorAll('input[name="selected_takbeer"]').forEach(radio => {
      radio.addEventListener('change', () => {
        selectedTakbeerId = radio.value;
        localStorage.setItem('sanad_selected_takbeer', selectedTakbeerId);
        document.querySelectorAll('#takbeerAudioGrid .audio-item-card').forEach(c => c.classList.remove('selected-sound'));
        const activeCard = document.getElementById(`card_${selectedTakbeerId}`);
        if (activeCard) activeCard.classList.add('selected-sound');
        showToast('✨ تم تعيين التكبير المفضل بنجاح!');
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
  // 5. المصحف الشريف الكامل (604 صفحات وتقليب كالمصحف الحقيقي باليد)
  // --------------------------------------------------------------------------
  const surahsContainer = document.getElementById('surahsGridContainer');
  const quranSearchInput = document.getElementById('quranSearchInput');
  const mushafScreen = document.getElementById('mushafFullScreenView');
  const exitMushafBtn = document.getElementById('exitMushafBtn');
  const openFirstSurahBtn = document.getElementById('openFirstSurahBtn');

  // عناصر صفحة المصحف
  const mushafPageAyahs = document.getElementById('mushafPageAyahsContent');
  const mushafPageFrame = document.getElementById('mushafPageFrame');
  const pageNumberDisplay = document.getElementById('mushafPageNumberDisplay');
  const pageJuzLabel = document.getElementById('pageJuzLabel');
  const pageHizbLabel = document.getElementById('pageHizbLabel');
  const pageSurahLabel = document.getElementById('pageSurahLabel');
  const headerSurahName = document.getElementById('mushafHeaderSurahName');
  const headerJuzName = document.getElementById('mushafHeaderJuzName');
  const pageSlider = document.getElementById('mushafPageSlider');
  const sliderPageIndicator = document.getElementById('sliderPageIndicator');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const savePageBookmarkBtn = document.getElementById('savePageBookmarkBtn');
  const mushafThemeToggleBtn = document.getElementById('mushafThemeToggleBtn');

  // عناصر بطاقة الفاصلة بالفهرس
  const bookmarkResumeCard = document.getElementById('bookmarkResumeCard');
  const bmSurahNameEl = document.getElementById('bmSurahName');
  const bmPageInfoEl = document.getElementById('bmPageInfo');
  const resumeBookmarkBtn = document.getElementById('resumeBookmarkBtn');

  function initQuranSection() {
    renderSurahsList(QURAN_SURAHS);
    updateBookmarkCardUI();
    applyMushafTheme();

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

    // فتح المصحف من الصفحة الأولى
    if (openFirstSurahBtn) {
      openFirstSurahBtn.addEventListener('click', () => {
        openMushafPage(1);
      });
    }

    // الخروج من شاشة المصحف الكاملة والعودة للفهرس
    if (exitMushafBtn) {
      exitMushafBtn.addEventListener('click', () => {
        mushafScreen.classList.remove('open');
        updateBookmarkCardUI();
      });
    }

    // التقليب بالزر: الصفحة التالية (التقدم لليسار)
    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        if (currentMushafPage < 604) {
          triggerPageFlipAnimation('flip-next');
          openMushafPage(currentMushafPage + 1);
        }
      });
    }

    // التقليب بالزر: الصفحة السابقة (الرجوع لليمين)
    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        if (currentMushafPage > 1) {
          triggerPageFlipAnimation('flip-prev');
          openMushafPage(currentMushafPage - 1);
        }
      });
    }

    // القفز عبر شريط التمرير (Slider)
    if (pageSlider) {
      pageSlider.addEventListener('input', (e) => {
        const p = parseInt(e.target.value, 10);
        openMushafPage(p);
      });
    }

    // تقليب الصفحات بالسحب باللمس على الشاشة (Swipe Gestures) كالمصحف في اليد
    const stage = document.getElementById('mushafPageStage');
    let touchStartX = 0;
    let touchEndX = 0;

    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      }, { passive: true });
    }

    function handleSwipeGesture() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          // سحب لليمين -> الصفحة السابقة
          if (currentMushafPage > 1) {
            triggerPageFlipAnimation('flip-prev');
            openMushafPage(currentMushafPage - 1);
          }
        } else {
          // سحب لليسار -> الصفحة التالية
          if (currentMushafPage < 604) {
            triggerPageFlipAnimation('flip-next');
            openMushafPage(currentMushafPage + 1);
          }
        }
      }
    }

    // التنقل بأسهم لوحة المفاتيح
    window.addEventListener('keydown', (e) => {
      if (!mushafScreen.classList.contains('open')) return;
      if (e.key === 'ArrowLeft' && currentMushafPage < 604) {
        triggerPageFlipAnimation('flip-next');
        openMushafPage(currentMushafPage + 1);
      } else if (e.key === 'ArrowRight' && currentMushafPage > 1) {
        triggerPageFlipAnimation('flip-prev');
        openMushafPage(currentMushafPage - 1);
      } else if (e.key === 'Escape') {
        mushafScreen.classList.remove('open');
      }
    });

    // حفظ الفاصلة من شاشة المصحف
    if (savePageBookmarkBtn) {
      savePageBookmarkBtn.addEventListener('click', () => {
        const pageAyahs = QURAN_PAGES[currentMushafPage] || [];
        const surahName = pageAyahs.length ? pageAyahs[0].surahName : '';
        const bookmark = {
          page: currentMushafPage,
          surahName: surahName,
          date: new Date().toLocaleDateString('ar-EG')
        };
        localStorage.setItem('sanad_quran_bookmark', JSON.stringify(bookmark));
        showToast(`🔖 تم حفظ الفاصلة عند صفحة ${currentMushafPage} (سورة ${surahName})`);
        updateBookmarkCardUI();
      });
    }

    // متابعة القراءة من زر الفاصلة في الفهرس
    if (resumeBookmarkBtn) {
      resumeBookmarkBtn.addEventListener('click', () => {
        const bm = JSON.parse(localStorage.getItem('sanad_quran_bookmark') || 'null');
        if (bm && bm.page) {
          openMushafPage(bm.page);
        } else {
          openMushafPage(currentMushafPage);
        }
      });
    }

    // تبديل نمط ورق المصحف (عاجي كلاسيكي، ليلي، ناصع)
    if (mushafThemeToggleBtn) {
      mushafThemeToggleBtn.addEventListener('click', () => {
        currentMushafThemeIdx = (currentMushafThemeIdx + 1) % mushafThemes.length;
        localStorage.setItem('sanad_mushaf_theme_idx', currentMushafThemeIdx);
        applyMushafTheme();
        const names = ['المصحف الطبيعي', 'ورق المصحف العاجي الدافئ', 'المصحف الليلي المعتم'];
        showToast(`🎨 تم تفعيل ${names[currentMushafThemeIdx]}`);
      });
    }
  }

  function applyMushafTheme() {
    const theme = mushafThemes[currentMushafThemeIdx];
    if (theme) {
      document.documentElement.setAttribute('data-mushaf-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-mushaf-theme');
    }
  }

  function triggerPageFlipAnimation(className) {
    if (!mushafPageFrame) return;
    mushafPageFrame.classList.add(className);
    setTimeout(() => {
      mushafPageFrame.classList.remove(className);
    }, 280);
  }

  function updateBookmarkCardUI() {
    const bm = JSON.parse(localStorage.getItem('sanad_quran_bookmark') || 'null');
    if (bm && bookmarkResumeCard) {
      bookmarkResumeCard.style.display = 'flex';
      if (bmSurahNameEl) bmSurahNameEl.textContent = `سورة ${bm.surahName}`;
      if (bmPageInfoEl) bmPageInfoEl.textContent = `صفحة ${bm.page} • ${bm.date || ''}`;
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
            <div class="surah-meta">${surah.type} • ${surah.verses} آيات • ص ${surah.startPage}</div>
          </div>
        </div>
        <div class="read-arrow">←</div>
      `;
      card.addEventListener('click', () => {
        openMushafPage(surah.startPage);
      });
      surahsContainer.appendChild(card);
    });
  }

  // فتح صفحة المصحف وعرض آياتها بالرسم العثماني
  function openMushafPage(pageNumber) {
    currentMushafPage = Math.max(1, Math.min(604, pageNumber));
    localStorage.setItem('sanad_mushaf_last_page', currentMushafPage);

    const ayahs = QURAN_PAGES[currentMushafPage] || [];
    if (!ayahs.length) return;

    const firstAyah = ayahs[0];
    const surahName = firstAyah.surahName;
    const juzNum = firstAyah.juz;

    // تحديث الترويسات والبيانات
    if (headerSurahName) headerSurahName.textContent = `سورة ${surahName}`;
    if (headerJuzName) headerJuzName.textContent = `الجزء ${toArabicDigits(juzNum)}`;
    if (pageSurahLabel) pageSurahLabel.textContent = `سورة ${surahName}`;
    if (pageJuzLabel) pageJuzLabel.textContent = `الجزء ${toArabicDigits(juzNum)}`;
    if (pageHizbLabel) pageHizbLabel.textContent = `صفحة ${toArabicDigits(currentMushafPage)}`;
    if (pageNumberDisplay) pageNumberDisplay.textContent = toArabicDigits(currentMushafPage);

    if (pageSlider) pageSlider.value = currentMushafPage;
    if (sliderPageIndicator) sliderPageIndicator.textContent = `صفحة ${toArabicDigits(currentMushafPage)} من ٦٠٤`;

    // بناء نص الصفحة بالرسم العثماني
    let html = '';
    let currentSurahInPage = null;

    ayahs.forEach(ayah => {
      // إذا بدأت سورة جديدة في هذه الصفحة نضع شريط السورة والبسملة
      if (ayah.ayah === 1 && ayah.surah !== currentSurahInPage) {
        html += `<div class="surah-banner-header">سُورَةُ ${ayah.surahName}</div>`;
        if (ayah.surah !== 9 && ayah.surah !== 1) { // التوبة والفاتحة
          html += `<div class="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
        }
        currentSurahInPage = ayah.surah;
      }

      // إزالة البسملة من أول الآية إذا كانت مكررة
      let ayahText = ayah.text;
      if (ayah.ayah === 1 && ayah.surah !== 1 && ayahText.startsWith('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ')) {
        ayahText = ayahText.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ', '');
      }

      html += `${ayahText} <span class="ayah-end-symbol">﴿${toArabicDigits(ayah.ayah)}﴾</span> `;
    });

    if (mushafPageAyahs) {
      mushafPageAyahs.innerHTML = html;
      mushafPageAyahs.scrollTop = 0;
    }

    // فتح الشاشة الكاملة
    mushafScreen.classList.add('open');
  }

  function toArabicDigits(num) {
    const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/[0-9]/g, d => arabic[d]);
  }

  // --------------------------------------------------------------------------
  // 6. قسم الأذكار والسبحة الرقمية
  // --------------------------------------------------------------------------
  function initAzkarAndTasbeeh() {
    const tasbeehBtn = document.getElementById('tasbeehTapArea');
    const tasbeehCountEl = document.getElementById('tasbeehCurrentCount');
    const tasbeehTotalEl = document.getElementById('tasbeehTotalCount');
    const tasbeehPhraseEl = document.getElementById('currentTasbeehPhrase');
    const resetTasbeehBtn = document.getElementById('resetTasbeehBtn');
    const presetBtns = document.querySelectorAll('.preset-pill');

    if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
    if (tasbeehTotalEl) tasbeehTotalEl.textContent = tasbeehTotal;
    if (tasbeehPhraseEl) tasbeehPhraseEl.textContent = currentPhrase;

    if (tasbeehBtn) {
      tasbeehBtn.addEventListener('click', () => {
        tasbeehCount++;
        tasbeehTotal++;
        if (tasbeehCountEl) tasbeehCountEl.textContent = tasbeehCount;
        if (tasbeehTotalEl) tasbeehTotalEl.textContent = tasbeehTotal;

        localStorage.setItem('sanad_tasbeeh_count', tasbeehCount);
        localStorage.setItem('sanad_tasbeeh_total', tasbeehTotal);

        if ('vibrate' in navigator) navigator.vibrate(25);
        audioEngine.playTasbeehClick();
      });
    }

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

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPhrase = btn.dataset.phrase;
        if (tasbeehPhraseEl) tasbeehPhraseEl.textContent = currentPhrase;
        localStorage.setItem('sanad_tasbeeh_phrase', currentPhrase);
      });
    });

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
  // بدء تشغيل التطبيق بالكامل
  // --------------------------------------------------------------------------
  initTheme();
  initPrayerSection();
  initAudioLibrary();
  initQuranSection();
  initAzkarAndTasbeeh();
});
