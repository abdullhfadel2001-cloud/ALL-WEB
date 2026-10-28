// ==========================================================================
// تطبيق «سَنَد» - محرك الصوت الحقيقي لتشغيل أصوات الأذان والتكبيرات MP3 الفورية
// ==========================================================================

class AudioEngine {
  constructor() {
    this.currentAudio = null;
    this.isPlayingPreview = false;
    this.currentPreviewId = null;
    this.clickCtx = null;
  }

  stopAll() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    this.isPlayingPreview = false;
    this.currentPreviewId = null;
  }

  // تشغيل ملف صوتي محلي مع بدء فوري بدون أي تأخير
  playAudioUrl(url, id, onEndCallback) {
    this.stopAll();
    this.isPlayingPreview = true;
    this.currentPreviewId = id;

    try {
      this.currentAudio = new Audio(url);
      this.currentAudio.preload = "auto";
      const playPromise = this.currentAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Audio play error:", err);
          this.stopAll();
          if (onEndCallback) onEndCallback();
        });
      }

      this.currentAudio.onended = () => {
        this.stopAll();
        if (onEndCallback) onEndCallback();
      };
    } catch (e) {
      this.stopAll();
      if (onEndCallback) onEndCallback();
    }
  }

  playAdhanSound(adhanId, onEndCallback) {
    const item = AUDIO_LIBRARY.adhans.find(a => a.id === adhanId);
    if (item && item.url) {
      this.playAudioUrl(item.url, adhanId, onEndCallback);
    }
  }

  playTakbeerSound(takbeerId, onEndCallback) {
    const item = AUDIO_LIBRARY.takbeers.find(t => t.id === takbeerId);
    if (item && item.url) {
      this.playAudioUrl(item.url, takbeerId, onEndCallback);
    }
  }

  // صوت نقرة التسبيح الخفيف
  playTasbeehClick() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!this.clickCtx) this.clickCtx = new AudioContextClass();
      if (this.clickCtx.state === "suspended") this.clickCtx.resume();
      const osc = this.clickCtx.createOscillator();
      const gain = this.clickCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.clickCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.clickCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.clickCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.clickCtx.destination);
      osc.start();
      osc.stop(this.clickCtx.currentTime + 0.04);
    } catch (e) {}
  }
}

// تصدير كائن الصوت الموحد
window.soundEngine = new AudioEngine();
