const voiceSelection = document.getElementById("voice-selection");
const buttonPlay = document.getElementById("button-play");
const textInput = document.querySelector("textarea");

// Get voices for TTS
let voices = [];

function loadVoices() {
  // Get voice from API and order alphabetically
  voices = speechSynthesis.getVoices();
  sortObjectArrayAlphabetically(voices, "name");

  voiceSelection.innerHTML = voices
    .map(
      (voice, index) =>
        `<option value="${index}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

// Load voices when available
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Play TTS
buttonPlay.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelection.value];

  if (selectedVoice) utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);
});

// This function is so I don't have to sort everything manually
function sortObjectArrayAlphabetically(array, propertyToSort) {
  array.sort((a, b) => a[propertyToSort].localeCompare(b[propertyToSort]));
}
