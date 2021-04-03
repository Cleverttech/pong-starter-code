let canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#302c2c";

// getting the paintbrush
let ctx = canvas.getContext("2d");

// The DOM of the start and the restart buttons
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");

let circleX = 50,
  circleY = 50,
  circleRadius = 30;

let paddleHeight = 20,
  paddleX = 100;
paddleWidth = 200;

let incrX = 2,
  incrY = 2;

let isGameOver = false;
let intervalId = 0;

//keypress

//keydown and keyup
document.addEventListener("keydown", (event) => {
  // console.log(event) // to keep track of the current event
  if (event.code == "ArrowRight") {
    isArrowRight = true;
    isArrowLeft = false;
  } else if (event.code == "ArrowLeft") {
    isArrowRight = false;
    isArrowLeft = true;
  }
});

document.addEventListener("keyup", () => {
  isArrowRight = false;
  isArrowLeft = false;
});

function drawCirlcle() {
  ctx.beginPath();
  ctx.fillStyle = "pink";
  ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.fillRect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  ctx.stroke();
  ctx.closePath();
}

function collision() {
  //right hand side
  if (circleX > canvas.width - circleRadius) {
    incrX = -2; // ball moves backwards in the X axis
  }
  // bottom side
  if (circleY > canvas.height - circleRadius) {
    incrY = -2;
  }
  //left side
  if (circleX < circleRadius) {
    incrX = 2;
  }
  //top sided
  if (circleY < circleRadius) {
    incrY = 2;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // to keep clearing the circle
  drawCirlcle(); //keeps redrawing in a loop
  collision();
  drawPaddle();

  ctx.fillStyle = "white";
  ctx.font = "24px Verdana";
  ctx.fillText(`score is: ${score}`, 20, 30);

  if (isArrowRight) {
    paddleX = paddleX + 5;
  }
  if (isArrowLeft) {
    paddleX = paddleX - 5;
  }
  //animating our circle making it move
  circleX = circleX + incrX; // X axis value + increment value
  circleY = circleY + incrY; //Y axis value + increment value
  //   requestAnimationFrame(animate);

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(animate);
  }
}

function start() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  animate();
}

function restart() {}

//Everything begins here
window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  start();
  startBtn.addEventListener("click", () => {
    // do something when the user clicks the start button
    // start();
  });

  restartBtn.addEventListener("click", () => {
    // do something when the user clicks the restart button
  });
});
