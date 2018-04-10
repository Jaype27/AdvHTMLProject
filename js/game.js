let gameScene = new Phaser.Scene('Game');

var ball;
var bricks;
var score = 0;
var standbyBall = true;




gameScene.init = function() {
 this.paddleSpeed = 7; // paddle speed
 this.paddleMaxX = 355; // maximum boundary; horizontal
 this.paddleMinX = 20; // minimum boundary; horizontal
 
 this.ballSpeed = 7; // ball speed
 this.ballMaxX = 365; // maximum boundary; horizontal
 this.ballMinX = 10; // minimum boundary; horizontal
 this.ballMaxY = 657; // maximum boundary; vertical
 this.ballMinY = -10; // minimum boundary; vertical
}

gameScene.preload = function() {
 	
 	this.load.image('paddle', 'images/paddle.png');
 	this.load.image('ball', 'images/ball.png');
 	this.load.image('bricks', 'images/bricks.png');
}

gameScene.create = function() {
	
	// this.paddle = this.add.sprite(40, this.sys.game.config.height / 2, 'paddle');
	// this.ball = this.add.sprite(40, this.sys.game.config.height / 2, 'ball');
	 this.bricks = this.add.sprite(40, this.sys.game.config.height / 2, 'bricks');

}

gameScene.update = function() {
	
}

gameScene.restart = function() {
	
}

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

let game = new Phaser.Game(config);