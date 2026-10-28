// ==========================================================================
// تطبيق رفيق المسلم والحياة اليومية - محرك الصوت المتقدم والملاحظات الصوتية
// ==========================================================================

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.activeOscillators = [];
    this.isPlayingPreview = false;
    this.currentPreviewId = null;
    
    // إعداد مسجل الصوت للملاحظات الصوتية
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.isRecording = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  stopAll() {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];
    this.isPlayingPreview = false;
    this.currentPreviewId = null;
  }

  // عزف نغمة أذان موسيقية روحانية متعددة الطبقات بحسب النمط المختار
  playAdhanSound(adhanId = "adhan_makkah") {
    this.init();
    this.stopAll();
    this.isPlayingPreview = true;
    this.currentPreviewId = adhanId;

    // جداول الترددات للمقامات الروحانية (الحجاز، الراست، الصبا، النهاوند، إلخ)
    const SCALES = {
      adhan_makkah: [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 554.37, 587.33], // مقام حجاز مكي مهيب
      adhan_madinah: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25], // مقام راست مدني واسع
      adhan_quds: [246.94, 261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88],    // مقام بياتي مقدسي شجي
      adhan_egypt: [220.00, 246.94, 261.63, 311.13, 329.63, 349.23, 415.30, 440.00],   // مقام صبا مصري خاشع
      adhan_fajr: [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 369.99, 392.00],    // مقام سيكاه الصباح
      adhan_soft: [220.00, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00],             // نهاوند هادئ مريح
      adhan_baghdad: [220.00, 233.08, 261.63, 293.66, 329.63, 349.23, 392.00],          // مقام كورد شجن بغدادي
      adhan_andalus: [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88],          // عجم مغاربي متفائل
      adhan_kids: [329.63, 392.00, 440.00, 493.88, 523.25, 587.33],                     // نغمات مرتفعة رقيقة
      adhan_chime: [261.63, 329.63, 392.00, 523.25, 659.25]                             // رنين توافقي هادئ
    };

    const notes = SCALES[adhanId] || SCALES.adhan_makkah;
    const now = this.ctx.currentTime;
    const duration = 0.8;

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.45;
      
      // مذبذب رئيسي بصوت دافئ
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(freq, startTime);
      osc2.frequency.setValueAtTime(freq * 0.5, startTime); // طبقة قرار أعمق

      // منحنى الصوت (Envelope) ناعم ومريح للأذن
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.1);
      osc2.stop(startTime + duration + 0.1);

      this.activeOscillators.push(osc1, osc2);
    });

    // إيقاف المعاينة تلقائياً عند انتهاء النغمات
    const totalDuration = notes.length * 450 + 800;
    setTimeout(() => {
      if (this.currentPreviewId === adhanId) {
        this.isPlayingPreview = false;
        this.currentPreviewId = null;
        if (typeof window.onAudioPreviewEnd === "function") {
          window.onAudioPreviewEnd(adhanId);
        }
      }
    }, totalDuration);
  }

  // عزف التكبيرات ونغمات التنبيه
  playTakbeerSound(takbeerId = "takbeer_eid_1") {
    this.init();
    this.stopAll();
    this.isPlayingPreview = true;
    this.currentPreviewId = takbeerId;

    const now = this.ctx.currentTime;

    if (takbeerId.startsWith("chime_") || takbeerId.startsWith("alert_")) {
      // نغمات جرس وأجراس طبيعية
      const frequencies = [523.25, 659.25, 783.99, 1046.50];
      frequencies.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + i * 0.2);
        gain.gain.setValueAtTime(0, now + i * 0.2);
        gain.gain.linearRampToValueAtTime(0.18, now + i * 0.2 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 0.95);
        this.activeOscillators.push(osc);
      });
    } else {
      // نغمات التكبير (الله أكبر الله أكبر لا إله إلا الله)
      const chordNotes = [261.63, 329.63, 392.00, 329.63, 261.63, 392.00, 523.25];
      chordNotes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + i * 0.35);
        gain.gain.setValueAtTime(0, now + i * 0.35);
        gain.gain.linearRampToValueAtTime(0.22, now + i * 0.35 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.35 + 0.7);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.35);
        osc.stop(now + i * 0.35 + 0.75);
        this.activeOscillators.push(osc);
      });
    }

    setTimeout(() => {
      this.isPlayingPreview = false;
      this.currentPreviewId = null;
      if (typeof window.onAudioPreviewEnd === "function") {
        window.onAudioPreviewEnd(takbeerId);
      }
    }, 2800);
  }

  // صوت نقرة التسبيح الخفيف
  playTasbeehClick() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }
}

// تصدير كائن الصوت الموحد
window.soundEngine = new AudioEngine();

