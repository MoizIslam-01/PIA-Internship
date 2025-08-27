const duck = document.getElementById("duck");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("title-box");
const reload = document.getElementById("Reload");
const shot = document.getElementById("shot");
const game = document.getElementById("game");
const gameoverBox = document.getElementById("gameover");

let score = 0;
let Reload = 5;
let bulletcount = 3;
let gameInterval;

function updateScore() {
  let paddedScore = score.toString().padStart(6, "0");
  scoreDisplay.innerHTML = paddedScore + "<br>SCORE";
}
function updatereload(){
    if (bulletcount ==3){
        bulletcount=2;
        document.getElementById("bullet3").style.display = "none";
    }
    else if (bulletcount == 2){
        bulletcount=1;
        document.getElementById("bullet2").style.display = "none";
    }
    else if (bulletcount == 1){
        bulletcount=0;
        document.getElementById("bullet1").style.display = "none";
        bulletcount = 3;
        Reload--;
        reload.textContent = "R=" + Reload;
        document.getElementById("bullet1").style.display = "block";
        document.getElementById("bullet2").style.display = "block";
        document.getElementById("bullet3").style.display = "block";
        if(Reload == 0){
            gameOver();
        }
    }
    
}


game.addEventListener("click", (e) => {
  if (e.target.id === "startBtn" || Reload == 0) return;
  updatereload();
});


function startGame() {
    score = 0;
    updateScore();
    duck.style.display = "block";
    moveDuck();
    document.getElementById("game").classList.add("crosshair-cursor");
    gameInterval = setInterval(moveDuck, 2000);
}

function gameOver() {
  gameoverBox.classList.add("show");
  scoreDisplay.classList.add("show-final")
  reload.style.opacity="0";
  shot.style.opacity="0";

}


function moveDuck() {
    let x = Math.random() * (800 - 60);
    let y = Math.random() * (500 - 60);
    duck.style.left = x + "px";
    duck.style.top = y + "px";
}

duck.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    moveDuck();
});


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
        title.style.display= "none";
        startGame();
    }, 500);
});

