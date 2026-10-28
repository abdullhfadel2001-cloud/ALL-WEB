// ==========================================================================
// تطبيق رفيق المسلم والحياة اليومية - محرك الصلاة والمواقيت الدقيقة
// ==========================================================================

const PRAYER_NAMES_AR = {
  Fajr: "صلاة الفجر",
  Sunrise: "شروق الشمس",
  Dhuhr: "صلاة الظهر",
  Asr: "صلاة العصر",
  Maghrib: "صلاة المغرب",
  Isha: "صلاة العشاء"
};

class PrayerEngine {
  constructor() {
    this.times = null;
    this.nextPrayer = null;
    this.cityName = "موقعي الحالي";
    this.coords = null;
    this.preAlertMinutes = 15; // تنبيه الاستعداد قبل الصلاة
    this.autoSilentMinutes = 25; // مدة الوضع الصامت التلقائي
    this.isSilentModeActive = false;
    this.silentModeTimer = null;
  }

  // جلب المواقيت بناءً على الموقع الجغرافي الدقيق
  async fetchTimes() {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            this.coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };
            await this.getTimesFromCoordinates(this.coords.lat, this.coords.lng);
            resolve(this.times);
          },
          (err) => {
            console.warn("تعذر الوصول للموقع الجغرافي، استخدام التقدير المخزن:", err);
            this.fallbackTimes();
            resolve(this.times);
          },
          { timeout: 8000, enableHighAccuracy: true }
        );
      } else {
        this.fallbackTimes();
        resolve(this.times);
      }
    });
  }

  async getTimesFromCoordinates(lat, lng) {
    try {
      const now = new Date();
      const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=4`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.code === 200) {
        this.times = data.data.timings;
        localStorage.setItem("cached_prayer_timings", JSON.stringify({
          timings: this.times,
          lat, lng, dateStr
        }));
        this.reverseCity(lat, lng);
        this.calculateNextPrayer();
        this.updateSkyBackground();
      } else {
        this.fallbackTimes();
      }
    } catch (e) {
      this.fallbackTimes();
    }
  }

  async reverseCity(lat, lng) {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=ar`);
      const data = await res.json();
      this.cityName = data.city || data.locality || data.principalSubdivision || "موقعي";
      const cityEl = document.getElementById("prayerLocationName");
      if (cityEl) cityEl.textContent = this.cityName;
    } catch (e) {
      this.cityName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    }
  }

  fallbackTimes() {
    const cached = JSON.parse(localStorage.getItem("cached_prayer_timings") || "null");
    if (cached) {
      this.times = cached.timings;
      this.cityName = "الموقع المحفوظ";
    } else {
      // مواقيت تقريبية افتراضية موثوقة
      this.times = {
        Fajr: "05:05",
        Sunrise: "06:25",
        Dhuhr: "12:10",
        Asr: "15:30",
        Maghrib: "18:05",
        Isha: "19:35"
      };
      this.cityName = "مكة المكرمة (افتراضي)";
    }
    this.calculateNextPrayer();
    this.updateSkyBackground();
  }

  // حساب الصلاة القادمة والعد التنازلي بدقة
  calculateNextPrayer() {
    if (!this.times) return;
    const now = new Date();
    const list = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    
    let upcoming = null;
    let nextDate = null;
    let minDiff = Infinity;

    list.forEach(p => {
      const timeClean = this.times[p].split(" ")[0];
      const [h, m] = timeClean.split(":").map(Number);
      const pDate = new Date();
      pDate.setHours(h, m, 0, 0);

      const diff = pDate - now;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        upcoming = p;
        nextDate = pDate;
      }
    });

    // إذا انتهت جميع صلوات اليوم، فالصلاة القادمة فجر الغد
    if (!upcoming) {
      upcoming = "Fajr";
      const [h, m] = this.times.Fajr.split(" ")[0].split(":").map(Number);
      nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      nextDate.setHours(h, m, 0, 0);
    }

    this.nextPrayer = {
      key: upcoming,
      name: PRAYER_NAMES_AR[upcoming] || upcoming,
      targetDate: nextDate,
      time: this.times[upcoming]
    };

    this.updatePrayerUI();
  }

  format12(timeStr) {
    if (!timeStr) return "--:--";
    const clean = timeStr.split(" ")[0];
    let [h, m] = clean.split(":").map(Number);
    const suffix = h >= 12 ? "م" : "ص";
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, "0")} ${suffix}`;
  }

  // تحديث الخلفية الحية بحسب وقت الصلاة الحالي
  updateSkyBackground() {
    if (!this.times) return;
    const body = document.body;
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();

    const getMins = (pKey) => {
      if (!this.times[pKey]) return 0;
      const [h, m] = this.times[pKey].split(" ")[0].split(":").map(Number);
      return h * 60 + m;
    };

    const fajr = getMins("Fajr");
    const sunrise = getMins("Sunrise");
    const dhuhr = getMins("Dhuhr");
    const asr = getMins("Asr");
    const maghrib = getMins("Maghrib");
    const isha = getMins("Isha");

    let currentPhase = "night";

    if (nowMins >= fajr && nowMins < sunrise) {
      currentPhase = "dawn"; // فجر
    } else if (nowMins >= sunrise && nowMins < dhuhr) {
      currentPhase = "morning"; // شروق وصباح
    } else if (nowMins >= dhuhr && nowMins < asr) {
      currentPhase = "noon"; // ظهر
    } else if (nowMins >= asr && nowMins < maghrib) {
      currentPhase = "afternoon"; // عصر
    } else if (nowMins >= maghrib && nowMins < isha) {
      currentPhase = "sunset"; // مغرب وغروب
    } else {
      currentPhase = "night"; // عشاء وليل
    }

    body.setAttribute("data-prayer-sky", currentPhase);
    const phaseLabel = document.getElementById("skyPhaseLabel");
    if (phaseLabel) {
      const labels = {
        dawn: "🌅 أجواء الفجر والسكينة",
        morning: "☀️ إشراقة الصباح",
        noon: "☀️ وقت الظهيرة",
        afternoon: "🌤️ نسمات العصر الذهبية",
        sunset: "🌇 سحر الغروب والمغرب",
        night: "🌙 هدوء الليل ونجوم السماء"
      };
      phaseLabel.textContent = labels[currentPhase] || "";
    }
  }

  // تفعيل الوضع الصامت التلقائي وقت إقامة الصلاة
  triggerAutoSilentMode() {
    this.isSilentModeActive = true;
    const badge = document.getElementById("silentModeIndicator");
    if (badge) badge.classList.add("active");

    if (this.silentModeTimer) clearTimeout(this.silentModeTimer);
    
    // إعادة الهاتف للوضع الطبيعي بعد المدة المحددة
    this.silentModeTimer = setTimeout(() => {
      this.isSilentModeActive = false;
      if (badge) badge.classList.remove("active");
    }, this.autoSilentMinutes * 60 * 1000);
  }

  updatePrayerUI() {
    const list = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    list.forEach(p => {
      const el = document.getElementById(`timeDisplay_${p}`);
      if (el && this.times[p]) {
        el.textContent = this.format12(this.times[p]);
      }
      const card = document.getElementById(`prayerCard_${p}`);
      if (card) {
        card.classList.toggle("active-prayer", this.nextPrayer && this.nextPrayer.key === p);
      }
    });

    if (this.nextPrayer) {
      const nameEl = document.getElementById("nextPrayerNameDisplay");
      const timeEl = document.getElementById("nextPrayerTimeDisplay");
      if (nameEl) nameEl.textContent = this.nextPrayer.name;
      if (timeEl) timeEl.textContent = this.format12(this.nextPrayer.time);
    }
  }

  // الفحص الدوري للعد التنازلي والتنبيهات
  tick() {
    if (!this.nextPrayer || !this.nextPrayer.targetDate) return;
    const now = new Date();
    const diff = this.nextPrayer.targetDate - now;

    const clockEl = document.getElementById("nextPrayerClock");
    if (clockEl) {
      if (diff <= 0) {
        clockEl.textContent = "00:00:00";
        // حان الآن موعد الصلاة
        if (typeof window.onPrayerTimeArrived === "function") {
          window.onPrayerTimeArrived(this.nextPrayer);
        }
        this.triggerAutoSilentMode();
        setTimeout(() => this.calculateNextPrayer(), 3000);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        clockEl.textContent = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }
    }
  }
}

window.prayerEngine = new PrayerEngine();

