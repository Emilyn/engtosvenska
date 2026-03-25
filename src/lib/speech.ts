let cachedSwedishVoice: SpeechSynthesisVoice | null = null;

function loadSwedishVoice() {
  const voices = window.speechSynthesis.getVoices();
  cachedSwedishVoice =
    voices.find(v => v.lang === "sv-SE" && v.localService) ||
    voices.find(v => v.lang === "sv-SE") ||
    voices.find(v => v.lang.startsWith("sv") && v.localService) ||
    voices.find(v => v.lang.startsWith("sv")) ||
    null;
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  loadSwedishVoice();
  window.speechSynthesis.addEventListener("voiceschanged", loadSwedishVoice);
}

export function speak(text: string, { slow = false } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "sv-SE";
  u.rate = slow ? 0.4 : 0.82;
  if (cachedSwedishVoice) u.voice = cachedSwedishVoice;
  window.speechSynthesis.speak(u);
}
