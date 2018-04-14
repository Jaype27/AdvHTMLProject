var gameScene = new Phaser.Scene('Game');

var ball;
var bricks;
var score = 0;
var scoreText;
var lives = 3;
var livesText;

var ballOnPaddle = true;
var isBallIn = true;




gameScene.init = function() {

 this.paddleSpeed = 200; // paddle speed
 
 this.ballSpeed = 7; // ball speed
 this.ballMaxX = 640; // maximum boundary; horizontal
 this.ballMinX = 0; // minimum boundary; horizontal
 this.ballMaxY = 360; // maximum boundary; vertical
 this.ballMinY = 0; // minimum boundary; vertical

}

gameScene.preload = function() {
 	
 	this.load.image('paddle', 'images/paddle.png');
 	this.load.image('ball', 'images/ball.png');
 	this.load.image('bricks', 'images/bricks.png');


}

gameScene.create = function() {

	// PADDLE
	this.paddle = this.physics.add.sprite(this.sys.game.config.width / 2, 550, 'paddle');
	this.paddle.setScale(0.5);
	this.paddle.setCollideWorldBounds(true);
	this.paddle.body.immovable = true;
	
	// BALL
	this.ball = this.physics.add.sprite(this.sys.game.config.width / 2, 510, 'ball');
	this.ball.setVelocity(0, 0);
	this.ball.setBounce(1, 1);
	this.ball.setScale(0.5);
	this.ball.allowDrag = false;
	this.ball.setCollideWorldBounds(true);

	isBallIn = true;
	ballOnPaddle = true;

	// BRICKS
	this.bricks = this.physics.add.group({
		key: 'bricks',
		repeat: 4,
		setXY: { x: 68, y: 170, stepX: 60, stepY: 0 } 
	});
	this.bricks.children.iterate(function(child) {
		child.immovable = true;
	});
	Phaser.Actions.ScaleXY(this.bricks.getChildren(), -0.7, -0.7);

	
	this.bricks1 = this.physics.add.group({
		key: 'bricks',
		repeat: 4,
		setXY: { x: 68, y: 200, stepX: 60, stepY: 0 } 
	});
	this.bricks1.children.iterate(function(child) {
		child.immovable = true;
	});
	Phaser.Actions.ScaleXY(this.bricks1.getChildren(), -0.7, -0.7);

	
	this.bricks2 = this.physics.add.group({
		key: 'bricks',
		repeat: 4,
		setXY: { x: 68, y: 230, stepX: 60, stepY: 0 } 
	});
	this.bricks2.children.iterate(function(child) {
		child.immovable = true;
	});
	Phaser.Actions.ScaleXY(this.bricks2.getChildren(), -0.7, -0.7);


	// COLLISIONS
	this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);
	// this.physics.add.overlap(this.bricks, this.ball);
	this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
	this.physics.add.collider(this.ball, this.bricks1, this.hitBrick, null, this);
	this.physics.add.collider(this.ball, this.bricks2, this.hitBrick, null, this);

	// TEXT
	scoreText = this.add.text(10, 640, 'score : 0', {fontSize: '16px', fill: '#FFF'});
	// livesText = this.add.text(280, 640, 'lives : 3', {fontSize: '16px', fill: '#FFF'});
	 
}

gameScene.update = function() {

	if(this.input.activePointer.isDown) {
		this.releaseBall();
		this.physics.moveTo(this.paddle, this.input.x + this.cameras.main.scrollX, 550, null, this.paddleSpeed);
	} else {
		this.paddle.body.setVelocity(0, 0);
	}

	if(this.ball.y > this.paddle.y + 20) {
		this.ball.disableBody(true, true);
		this.restart();
	}
}

gameScene.restart = function() {

	this.time.delayedCall(900, function() {
		
		isBallIn = false;
		ballOnPaddle = true;
		this.ball.enableBody(true, this.sys.game.config.width / 2, 510, true, true);
	
		this.bricks.children.iterate(function(child) {
			child.enableBody(true, child.x, child.y, true, true);
		});

		score = 0;
		scoreText.setText('Score: ' + score);
		console.log(this.score);
  	}, [], this);
}

gameScene.releaseBall = function() {
	if(ballOnPaddle) {
		ballOnPaddle = false;
		this.ball.setVelocity(400, 400);
	}
}

gameScene.hitBrick = function(ball, brick) {
	
	brick.disableBody(true, true);

	score += 50;
	scoreText.setText('Score: ' + score);
	
	this.ball.setVelocity(500, 500);

	if(this.bricks.countActive(true) && this.bricks1.countActive(true) && this.bricks2.countActive(true) === 0) {
		this.bricks.children.iterate(function(child) {
			child.enableBody(true, child.x, child.y, true, true);
		});

		this.bricks1.children.iterate(function(child) {
			child.enableBody(true, child.x, child.y, true, true);
		});

		this.bricks2.children.iterate(function(child) {
			child.enableBody(true, child.x, child.y, true, true);
		});
	}
}

gameScene.hitPaddle = function(ball, paddle) {
	// this.ball.setVelocity(500, 500);
}

let config = {
  type: Phaser.AUTO,
  width: 375,
  height: 667,
  physics: {
  	default: 'arcade',
  	arcade: {
  		gravity: { y: 0},
  	}
  },
  scene: gameScene
};

var game = new Phaser.Game(config);