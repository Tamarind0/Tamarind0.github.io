const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;
let yesClicks = 0;
let yesScale = 1;
let noScale = 1;

const yesMessages = [
  "That’s the correct decision. Obviously.",
  "You continue to impress me.",
  "One more click and destiny is sealed."
];

const noTexts = [
  "No",
  "Wait...",
  "Are you sure?",
  "That seems incorrect",
  "Let’s rethink this",
  "This button is malfunctioning",
  "This is getting smaller for a reason..."
];

let noTextIndex = 0;

/* ============================= */
/*        NO BUTTON LOGIC        */
/* ============================= */

function updateNoButton() {
  noAttempts++;

  // Change text dramatically
  if (noTextIndex < noTexts.length - 1) {
    noTextIndex++;
    noBtn.innerText = noTexts[noTextIndex];
  }

  // Shrink the NO button
  noScale *= 0.7;
  noBtn.style.transform = `scale(${noScale})`;

  // Grow YES aggressively
  yesScale *= 1.5;
  yesBtn.style.transform = `scale(${yesScale})`;

  // If NO gets too tiny, remove it entirely
  if (noScale < 0.15) {
    noBtn.style.display = "none";
  }
}

noBtn.addEventListener("mouseover", updateNoButton);
noBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateNoButton();
});

/* ============================= */
/*        YES BUTTON LOGIC       */
/* ============================= */

yesBtn.addEventListener("click", function () {
  if (yesClicks < yesMessages.length) {
    message.textContent = yesMessages[yesClicks];
    yesClicks++;
  }

  if (yesClicks === 3) {
    setTimeout(() => {
      window.location.href = "celebration.html";
    }, 1000);
  }
});
