const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;
let yesClicks = 0;
let yesScale = 1;

const messages = [
  "Correct. I like where this is going.",
  "You seem very confident in this decision.",
  "This is legally binding now."
];

function moveNoButton() {
  const padding = 20; // keeps it away from edges
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;
  const yesRect = yesBtn.getBoundingClientRect();

  let randomX, randomY;
  let overlap;

  do {
    randomX = Math.random() * (screenWidth - noWidth - padding * 2) + padding;
    randomY = Math.random() * (screenHeight - noHeight - padding * 2) + padding;

    overlap =
      randomX < yesRect.right &&
      randomX + noWidth > yesRect.left &&
      randomY < yesRect.bottom &&
      randomY + noHeight > yesRect.top;

  } while (overlap);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
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
