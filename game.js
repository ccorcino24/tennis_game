const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

let canvas;
let canvasContext;

let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;

let paddle1Y = 250;
let paddle2Y = 250;


function calcMousePosition(evt) {
	let rect = canvas.getBoundingClientRect();
	let rootEl = document.documentElement;
	let mouseX = evt.clientX - rect.left - rootEl.scrollLeft;
	let mouseY = evt.clientY - rect.top - rootEl.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	}
}

window.onload = function () {
	//Loads elements after window loads
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	//Designates how smooth the ball will move in setTimeout
    let framesPerSecond = 50;

    //Designates how smooth the ball moves per 1sec
    setInterval(function() { 
    	ballMovement();
    	drawEnvironment();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', 
    	function(evt) {
    		let mousePosition = calcMousePosition(evt);
    		paddle1Y = mousePosition.y - (PADDLE_HEIGHT/2);
    })
}


//Resets Ball position after scoring
function resetBall() {

	ballSpeedX = -ballSpeedX;
	//Gives horizontal center
	ballX = canvas.width/2;
	//Gives vertical center
	ballY = canvas.height/2;
}

function computerMovement(){
	let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);

	//Don't chase the ball if it is 35px above or below the center
	if (paddle2YCenter < ballY - 35) {
		 paddle2Y += 6;
	} else if (paddle2YCenter > ballY - 35){
		paddle2Y -= 6;
	}
}

function ballMovement(){
		//Computer AI
		computerMovement();

		//How fast the ball moves
		ballX += ballSpeedX;
		ballY += ballSpeedY;

		//Resets ball position after other player scores
		if (ballX < 0) {
			if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)){

				ballSpeedX = -ballSpeedX;
			} else {
			//Adds point to player 2
			resetBall();
			player2Score++;
			}
		}

		//If the position of the ball is greater than canvas width go left
		if (ballX > canvas.width) {
			if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)){
				ballSpeedX = -ballSpeedX;
			} else {
			resetBall();
			//Adds point to player 1
			player1Score++;
			}
		}

		//If the position of the ball is less than 0 go right
		if (ballY < 0) {

			ballSpeedY = -ballSpeedY;
		}

		//If the position of the ball is greater than canvas width go left
		if (ballY > canvas.height) {
			ballSpeedY = -ballSpeedY;
		}
}

function drawEnvironment(){
	//Creates a black rectangle(canvas)
	colorRectangle(0, 0, canvas.width, canvas.height, 'blue');

	//Creates a white paddle for the left player
	colorRectangle(15, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

	//Creates a white paddle on the for the computer
	colorRectangle(canvas.width- 15 - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); 

	//Creates the ball for the game
	colorBall(ballX, ballY, 10, 'white')

	//Draw Scoreboard
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorBall(centerX, centerY, radius, color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}


function colorRectangle(leftX, topY, width, height, color){
	//Fills the canvas with color parameter
	canvasContext.fillStyle = color;
	//Creates the dimensions of the desired shape with parameters
	canvasContext.fillRect(leftX, topY, width, height); 
}
