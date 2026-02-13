const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;
let yesClicks = 0;
let yesScale = 1;
let moveStep = 0;
const messages = [
  "Correct. I like where this is going.",
  "You seem very confident in this decision.",
  "This is legally binding now."
];

function moveNoButton() {
  const moveDistance = 120;
  const padding = 20;

  let currentX = noBtn.offsetLeft;
  let currentY = noBtn.offsetTop;

  if (moveStep === 0) {
    currentY -= moveDistance; // move UP
  } else if (moveStep === 1) {
    currentX -= moveDistance; // move LEFT
  } else if (moveStep === 2) {
    currentX += moveDistance * 2; // move RIGHT (extra dramatic)
  }

  moveStep = (moveStep + 1) % 3;

  // Clamp inside screen
  currentX = Math.max(padding, Math.min(window.innerWidth - noBtn.offsetWidth - padding, currentX));
  currentY = Math.max(padding, Math.min(window.innerHeight - noBtn.offsetHeight - padding, currentY));

  noBtn.style.left = `${currentX}px`;
  noBtn.style.top = `${currentY}px`;
}

function growYesButton() {
  yesScale *= 1.6; // exponential growth instead of gentle scaling
  yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener("mouseover", () => {
  noAttempts++;
  growYesButton();
  moveNoButton();

  if (noAttempts >= 3) {
  yesScale = 10;
  yesBtn.style.transform = `scale(${yesScale})`;
  }
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noAttempts++;
  growYesButton();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  if (yesClicks < 3) {
    message.textContent = messages[yesClicks];
    yesClicks++;
  }

  if (yesClicks === 3) {
    setTimeout(() => {
      window.location.href = "celebration.html";
    }, 1000);
  }
});
