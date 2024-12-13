window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices updated:", window.speechSynthesis.getVoices());
};
function say(text) {
    // Ensure the Web Speech API is available
    if (!('speechSynthesis' in window)) {
        displayErrorMessage("Text-to-Speech not supported in this browser.", "yellow");
        return;
    }

    // Ensure valid text input
    if (typeof text !== 'string' || text.trim() === '') {
        displayErrorMessage("Invalid text input for speech synthesis.", "yellow");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Handle voice selection for Firefox or fallback
    const voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
        const preferredVoice = voices.find(voice => 
            voice.lang.startsWith('en') && !voice.name.includes('Google')
        );
        utterance.voice = preferredVoice || voices[0];
    }

    // Add event listeners for debugging and edge case handling
    utterance.onstart = () => console.log("Speech started.");
    utterance.onend = () => console.log("Speech ended.");
    utterance.onerror = (event) => console.error("Speech error:", event.error);

    // Speak the text
    window.speechSynthesis.speak(utterance);
}

