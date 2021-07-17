const synth = window.speechSynthesis;
let voices: SpeechSynthesisVoice[];
let voice: SpeechSynthesisVoice;

const VOICE_VOLUME = 1.0;
const VOICE_PITCH = 1.0;
const VOICE_RATE = 1.0;

// Use timeout to prevent a bug in Chrome where getVoices return empty array
// if called too early
setTimeout(() => {
  voices = synth.getVoices();

  // Chose English voice available in the system
  // Prefer en-GB variant
  [voice] = voices.filter((currVoice) => currVoice.lang === 'en-GB');
  // IF it is missing on user system try to use US variant
  if (!voice) {
    [voice] = voices.filter((currVoice) => currVoice.lang === 'en-US');
  }
}, 50);

function synthVoice(word: string): void {
  const utterThis = new SpeechSynthesisUtterance(word);

  utterThis.voice = voice;
  utterThis.volume = VOICE_VOLUME;
  utterThis.pitch = VOICE_PITCH;
  utterThis.rate = VOICE_RATE;

  synth.speak(utterThis);
}

export default synthVoice;
