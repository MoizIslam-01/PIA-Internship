const duck = document.getElementById("duck");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("title-box");
const reload = document.getElementById("Reload");
const shot = document.getElementById("shot");
const game = document.getElementById("game");
const gameoverBox = document.getElementById("gameover");
let gameoverflag = false;
let score = 0;
let Reload = 5;
let bulletcount = 3;
let gameInterval;
let flyInterval = null; 

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
    Reload = 5;
    bulletcount = 3;
    gameoverflag = false;

    updateScore();
    reload.textContent = "R=" + Reload;

    document.getElementById("game").classList.add("crosshair-cursor");
    spawnDuck();
}

function gameOver() {
    gameoverBox.classList.add("show");
    scoreDisplay.classList.add("show-final");
    reload.style.opacity = "0";
    shot.style.opacity = "0";
    gameoverflag = true;
    duck.style.display = "none";
}


function moveDuck() {
    let x = 0;
    const movespeed = 5;  
    const maxX = 800;

    flyInterval = setInterval(() => {
        if (gameoverflag) {
            clearInterval(flyInterval);
            return;
        }

        x += movespeed;
        duck.style.left = x + "px";

        if (x >= maxX) {
            clearInterval(flyInterval);
            spawnDuck(); 
        }
    }, 30);
}

function spawnDuck() {
    let y = Math.random() * (500 - 60);
    duck.style.left = "0px";
    duck.style.top = y + "px";
    duck.style.display = "block";
    moveDuck();
}

duck.addEventListener("click", () => {
    if (!gameoverflag) {
        clearInterval(flyInterval); 
        score++;
        updateScore();
        duck.style.display = "none"; 
        setTimeout(spawnDuck, 500);  
    }
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

