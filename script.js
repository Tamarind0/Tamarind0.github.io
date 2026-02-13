const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;
let yesClicks = 0;
let yesScale = 1;
let noScale = 1;
let noWasClickedFirst = false;

const yesMessages = [
  "Interesting choice... I see what you're doing.",
  "Confidence looks good on you.",
  "Okay okay this is getting official."
];

const noTexts = [
  "No",
  "Wait...",
  "Are you sure?",
  "That seems incorrect",
  "This button is shrinking for a reason...",
  "You’re making this difficult."
];

let noTextIndex = 0;

/* ============================= */
/*        NO BUTTON LOGIC        */
/* ============================= */

function updateNoButton() {
  if (noAttempts === 0 && yesClicks === 0) {
    noWasClickedFirst = true;
  }

  noAttempts++;

  if (noTextIndex < noTexts.length - 1) {
    noTextIndex++;
    noBtn.innerText = noTexts[noTextIndex];
  }

  // Shrink NO
  noScale *= 0.7;
  noBtn.style.transform = `scale(${noScale})`;

  // Grow YES
  yesScale *= 1.5;
  yesBtn.style.transform = `scale(${yesScale})`;

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

  // If she tried NO first → only 1 click required
  const requiredClicks = noWasClickedFirst ? 1 : 3;

  if (yesClicks < requiredClicks) {
    message.textContent = yesMessages[Math.min(yesClicks, yesMessages.length - 1)];
    yesClicks++;
  }

  if (yesClicks === requiredClicks) {
    setTimeout(() => {
      window.location.href = "celebration.html";
    }, 1000);
  }
});
