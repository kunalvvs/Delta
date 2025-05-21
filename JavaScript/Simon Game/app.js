let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["orange", "purple", "green", "sky"];

let h2 = document.querySelector("h2");
let scoreList = document.querySelector("#scoreList"); // Get the score list element
let scores = []; // Array to store scores

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence for new level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game over! Press any key to start.`;
        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);
        addScore(level - 1); // Add score to the list
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Add this function to handle score list
function addScore(score) {
    scores.push(score);
    renderScores();
}

function renderScores() {
    scoreList.innerHTML = "";
    scores.forEach((score, idx) => {
        let li = document.createElement("li");
        li.innerText = `Game ${idx + 1}: Level ${score}`;
        scoreList.appendChild(li);
    });
}