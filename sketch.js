var mc;
var phase = 0;
var v = 1;
var enemy;
var special;
var dots = new Array();
var dots_2 = new Array();
var special_dot = new Array();
var score = 0;
var gameOver = false;
var boos = [];

function setup() {
  // put setup code here
  createCanvas(500, 500);
  mc = new PacMan();
  enemy = new Boo();
  for (var i = 0; i < 20; i++) {
  	dots[i] = new Dot();
  	dots_2[i] = new Dot_2();
  }
}

function draw() {
  // put drawing code here
  background(204);

  for (var i = 0; i<boos.length; i ++) {
  	boos[i].chase();
  	boos[i].gameOver();
  	boos[i].display();
  }

  for (var i = 0; i < 20; i ++) {
  	dots[i].score();
  	dots[i].display();
  	dots_2[i].score();
  	dots_2[i].display();
  }
  mc.update();
  mc.checkEdge();
  mc.display();
  phase += 0.1;
}

function Dot() {
	this.x = random(0, width);
	this.y = random(0, height);

	this.display = function() {
		push();
		translate(this.x, this.y);
		noStroke();
		fill(200, 200, 0);
		ellipse(0, 0, 15, 15);
		pop();
	}

	this.score = function() {
		if (dist(mc.x, mc.y, this.x, this.y)<10) {
			score += 1;
			this.x = random(0, width);
			this.y = random(0, height);
			boos[boos.length] = new Boo();
		} 
		push();
		fill(255);
		textSize(20);
		text('score'+str(score), 20, 25);


	}
}

function Dot_2() {
	this.x = random(0, width);
	this.y = random(0, height);

	this.display = function() {
		push();
		translate(this.x, this.y);
		noStroke();
		fill(255, 0, 100);
		ellipse(0, 0, 15, 15);
		pop();
	}

	this.score = function() {
		if (dist(mc.x, mc.y, this.x, this.y)<10) {
			score += 5;
			this.x = random(0, width);
			this.y = random(0, height);
			boos[boos.length] = new Boo();
			boos[boos.length] = new Boo();
			boos[boos.length] = new Boo();
		} 
		push();
		fill(255);
		textSize(20);
		text('score'+str(score), 20, 25);


	}
}

function Boo() {
	this.x = random(0, width);
	this.y = random(0, height);

	this.img = createImg('ghost.gif');
	this.img.size(40, 40);
	this.v = v*0.5;

	this.display = function() {
		this.img.position(this.x-20, this.y-20);
	}
	this.chase = function () {
		var diffX = this.x - mc.x;
		var diffY = this.y - mc.y;
		if (abs(diffX)>abs(diffY)){
			if (diffX > 0) {
				this.x -= this.v;
			} else {
				this.x += this.v;
			}
		} else {
			if (diffY>0) {
				this.y -= this.v;
			} else {
				this.y += this.v; 
			}
		}
	}
	this.gameOver = function() {
		if (dist(this.x, this.y, mc.x, mc.y)<20) {
			gameOver = true;
		}
		if (gameOver) {
			push();
			textSize(60);
			fill(255, 0, 0);
			text('Game Over', 100, 250);
			pop();
			if (keyIsPressed) {
				if (key=='R' || key=='r') {
					score = 0;
					mc.x = width/2;
					mc.y = height/2;
					this.x = random(width);
					this.y = random(height);
					gameOver = false;
				}
			}
		}
	}
}

function PacMan() {
	this.x = width/2;
	this.y = height/2;
	this.direction = 0;

	this.update = function() {
		if (keyIsPressed) {
			if (keyCode == UP_ARROW) {
				this.direction = 3;
				this.y -= v;
			} else if (keyCode == DOWN_ARROW) {
				this.direction = 1;
				this.y += v;
			} else if (keyCode == LEFT_ARROW) {
				this.direction = 2;
				this.x -= v;
			} else if (keyCode == RIGHT_ARROW) {
				this.direction = 0;
				this.x += v;
			}
		}
	}

	this.checkEdge = function() {
		if (this.x > width ){
			this.x = 0;
		} else if (this.x<0) {
			this.x = width;
		}

		if (this.y > height ){
			this.y = 0;
		} else if (this.y<0) {
			this.y = height;
		}
	}

	this.display = function() {
		push();
		translate(this.x, this.y);
		rotate(this.direction*PI/2);
		arc(0, 0, 40, 40, abs(sin(phase))*PI/8, PI*2-abs(sin(phase))*PI/8);
		pop();
	}
}