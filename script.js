const input = document.getElementById("input");
const output = document.getElementById("output");
const modeBtn = document.getElementById("modeBtn");

// 🌙 Dark mode
modeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  modeBtn.innerText = document.body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
};

// 🎤 Voice input
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
  };
}

// 🔊 Voice output
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}

// 🧮 Calculator + emojis
function calculate() {
  try {
    let exp = input.value
      .toLowerCase()
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/into|multiply/g, "*")
      .replace(/divide by/g, "/");

    let result = eval(exp);
    let emoji = "😄";

    if (result > 100) emoji = "😲🔥";
    else if (result <= 0) emoji = "😐";

    output.innerText = `Result: ${result} ${emoji}`;
    speak(`The result is ${result}`);
  } catch {
    output.innerText = "Error 😢";
    speak("Sorry, invalid calculation");
  }
}
