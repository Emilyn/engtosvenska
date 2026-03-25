let cachedSwedishVoice: SpeechSynthesisVoice | null = null;

// Prefer high-quality neural/enhanced voices by name, then fall back by lang
const PREFERRED_VOICE_NAMES = [
  "Alva",           // macOS/iOS — best Swedish neural voice
  "Superingen",
  "Microsoft Sofie", // Windows neural
  "Microsoft Mattias",
  "Google svenska",  // Chrome
];

function loadSwedishVoice() {
  const voices = window.speechSynthesis.getVoices();
  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find(v => v.name.includes(name));
    if (match) { cachedSwedishVoice = match; return; }
  }
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
  u.rate = slow ? 0.5 : 0.9;
  u.pitch = 1.0;
  if (cachedSwedishVoice) u.voice = cachedSwedishVoice;
  window.speechSynthesis.speak(u);
}
