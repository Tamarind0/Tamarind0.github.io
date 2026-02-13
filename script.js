const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;
let yesClicks = 0;
let yesScale = 1;

const messages = [
  "You clicked YES. Obviously correct choice.",
  "Keep going. You're doing amazing sweetie.",
  "One more click. Destiny awaits."
];

function moveNoButton() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const yesRect = yesBtn.getBoundingClientRect();

  let randomX, randomY;
  let overlap;

  do {
    randomX = Math.random() * (screenWidth - 150);
    randomY = Math.random() * (screenHeight - 60);

    overlap =
      randomX < yesRect.right &&
      randomX + 100 > yesRect.left &&
      randomY < yesRect.bottom &&
      randomY + 50 > yesRect.top;

  } while (overlap);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

function growYesButton() {
  yesScale += 0.5;
  yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener("mouseover", () => {
  noAttempts++;
  growYesButton();
  moveNoButton();

  if (noAttempts >= 3) {
    yesBtn.style.transform = "scale(6)";
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
