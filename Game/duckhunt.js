const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("title-box");
const reload = document.getElementById("Reload");
const shot = document.getElementById("shot");
const game = document.getElementById("game");
const gameoverBox = document.getElementById("gameover");
const audio = document.getElementById("audioplayer");

let gameoverflag = false;
let score = 0;
let Reload = 5;
let bulletcount = 3;
let duckIdCounter = 0;

function updateScore() {
  let paddedScore = score.toString().padStart(6, "0");
  scoreDisplay.innerHTML = paddedScore + "<br>SCORE";
}

function updatereload() {
  if (bulletcount == 3) {
    bulletcount = 2;
    document.getElementById("bullet3").style.display = "none";
  } else if (bulletcount == 2) {
    bulletcount = 1;
    document.getElementById("bullet2").style.display = "none";
  } else if (bulletcount == 1) {
    bulletcount = 0;
    document.getElementById("bullet1").style.display = "none";
    bulletcount = 3;
    Reload--;
    reload.textContent = "R=" + Reload;
    document.getElementById("bullet1").style.display = "block";
    document.getElementById("bullet2").style.display = "block";
    document.getElementById("bullet3").style.display = "block";
    if (Reload == 0) {
      gameOver();
    }
  }
}

game.addEventListener("click", (e) => {
  if (e.target.id === "startBtn" || Reload == 0) return;
  audio.play();
  updatereload();
});

function startGame() {
  score = 0;
  Reload = 5;
  bulletcount = 3;
  gameoverflag = false;
  updateScore();
  reload.textContent = "R=" + Reload;
  document.getElementById("game").classList.add("crosshair-cursor");

  for (let i = 0; i < 3; i++) {
    setTimeout(spawnDuck, i * 1000);
  }
}

function gameOver() {
  gameoverBox.classList.add("show");
  scoreDisplay.classList.add("show-final");
  reload.style.opacity = "0";
  shot.style.opacity = "0";
  gameoverflag = true;
  document.querySelectorAll(".duck, .duckshot").forEach((d) => d.remove());
  if (score === 15) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "Perfect.mp3";
    audio.load();
    audio.play();
  } else if (score === 0) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "Game Over.mp3";
    audio.load();
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "Clear.mp3";
    audio.load();
    audio.play();
  }
}

function spawnDuck() {
  if (gameoverflag) return;
  const duck = document.createElement("div");
  duck.classList.add("duck");
  duck.style.display = "block";
  duck.dataset.id = duckIdCounter++;
  duck.style.top = Math.random() * 400 + 50 + "px";
  const direction = Math.random() < 0.5 ? "left" : "right";

  if (direction === "left") {
    duck.style.left = "-60px";
    duck.dataset.direction = "right";
    duck.style.transform = "scaleX(1)";
  } else {
    duck.style.left = "1300px";
    duck.dataset.direction = "left";
    duck.style.transform = "scaleX(-1)";
  }

  game.appendChild(duck);

  moveDuck(duck);

  duck.addEventListener("click", () => {
    if (!gameoverflag) {
      hitDuck(duck);
    }
  });
}

function moveDuck(duck) {
  let x = parseInt(duck.style.left) || 0;
  let y = parseInt(duck.style.top) || 0;

  let speedX = Math.floor(Math.random() * 10) + 5;
  if (duck.dataset.direction === "left") {
    speedX = -speedX;
  }

  let speedY =
    (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);

  const minY = 50;
  const maxY = 400;

  const interval = setInterval(() => {
    if (gameoverflag) {
      clearInterval(interval);
      return;
    }

    x += speedX;
    y += speedY;

    if (y <= minY || y >= maxY) {
      speedY = -speedY;
    }

    duck.style.left = x + "px";
    duck.style.top = y + "px";

    if (x > 1300 || x < -60) {
      clearInterval(interval);
      duck.remove();
      spawnDuck();
    }
  }, 30);

  duck.dataset.interval = interval;
}

function hitDuck(duck) {
  clearInterval(duck.dataset.interval);

  score++;
  updateScore();

  duck.classList.remove("duck");
  duck.classList.add("duckshot");
  setTimeout(() => {
    duck.classList.add("duckshot-animate");
  }, 500);

  setTimeout(() => {
    duck.remove();
    if (!gameoverflag) setTimeout(spawnDuck, 1000);
  }, 2000);
}

startBtn.addEventListener("click", () => {
  startBtn.style.transition = "opacity 0.5s ease";
  startBtn.style.opacity = "0";
  title.style.transition = "opacity 0.5s ease";
  title.style.opacity = "0";
  scoreDisplay.style.transition = "opacity 0.5s ease";
  scoreDisplay.style.opacity = "1";
  shot.style.transition = "opacity 0.5s ease";
  shot.style.opacity = "1";
  reload.style.transition = "opacity 0.5s ease";
  reload.style.opacity = "1";

  setTimeout(() => {
    startBtn.style.display = "none";
    title.style.display = "none";
    startGame();
  }, 500);
});
