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
const maxDistance = 150 + yesScale * 20;
  const padding = 20;

  const yesRect = yesBtn.getBoundingClientRect();
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;

  const yesCenterX = yesRect.left + yesRect.width / 2;
  const yesCenterY = yesRect.top + yesRect.height / 2;

  let randomX, randomY, overlap;

  do {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * maxDistance;

    randomX = yesCenterX + Math.cos(angle) * distance - noWidth / 2;
    randomY = yesCenterY + Math.sin(angle) * distance - noHeight / 2;

    overlap =
      randomX < yesRect.right &&
      randomX + noWidth > yesRect.left &&
      randomY < yesRect.bottom &&
      randomY + noHeight > yesRect.top;

  } while (
    overlap ||
    randomX < padding ||
    randomY < padding ||
    randomX + noWidth > window.innerWidth - padding ||
    randomY + noHeight > window.innerHeight - padding
  );

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
