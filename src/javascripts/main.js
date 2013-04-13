
"use strict";

var CONSTANT = { 
    rows: 30, 
    columns : 30,
    blockSize: 13
}

var increment = 15;
var backgroundColor = '#e0eff8';

var lives;
var incrementLeft;
var snakeArray = new Array(5 + 10 * increment);
var snakeLength;
var headPosition;
var speedX;
var speedY;

var gameTimer;
var gameTime;
var gameSpeed;

var food = {};
var score;

var currentLevel;
var levels = [
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X    S                       X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X     XXXXXXXXXXXXXXXXXX     X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X          S                 X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X  S                         X" +
	"X                            X" +
	"X                            X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X     XXXXXXXXXXXXXXXXXX     X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X             X              X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X  S                         X" +
	"X                   X        X" +
	"X                   X        X" +
	"XXXXXXXXXXXXXX      X        X" +
	"X            X      X        X" +
	"X            X      X        X" +
	"X                   X        X" +
	"X                   X        X" +
	"X         XXXXXXXXXXXXXXX    X" +
	"X            X               X" +
	"X            X               X" +
	"X            X               X" +
	"X            X       X       X" +
	"X            X       X       X" +
	"X            X       X       X" +
	"XXXXXXXX     X       X       X" +
	"X            X       X       X" +
	"X            X       X       X" +
	"X                    X       X" +
	"X                    X       X" +
	"X                    X       X" +
	"X                    X       X" +
	"X                    X       X" +
	"X    XXXXXXXXXXXXXXXXX       X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"X  X  X  XXXXX  X    X  X    X" +
	"X  X  X    X    XX  XX  X    X" +
	"X  X  X    X    X XX X  X    X" +
	"X  XXXX    X    X    X  X    X" +
	"X  X  X    X    X    X  X    X" +
	"X  X  X    X    X    X  X    X" +
	"X  X  X    X    X    X  XXXX X" +
	"X                            X" +
	"X  S                         X" +
	"X                            X" +
	"X         XXXXXXX    X       X" +
	"X         X          X       X" +
	"X         X          X       X" +
	"X         X          X       X" +
	"X         XXXXXX     X       X" +
	"X               X    X       X" +
	"X                X   X       X" +
	"X                X   X       X" +
	"X               X            X" +
	"X         XXXXXX     X       X" +
	"X                            X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" +
	"X                            X" +
	"X                            X" +
	"X    X      X    XXX XXXXX   X" +
	"X    X     X X  X      X     X" +
	"X    X    X   X  XX    X     X" +
	"X    X    X   X    X   X     X" +
	"X    XXXX X   X XXX    X     X" +
	"X                            X" +
	"X   X    XXX X   X XXX X     X" +
	"X   X    X   X   X X   X     X" +
	"X   X    XX  X   X XX  X     X" +
	"X   X    X    X X  X   X     X" +
	"X   XXXX XXX   X   XXX XXXX  X" +
	"X  S                         X" +
	"X                            X" +
	"X    X      X    XXX XXXXX   X" +
	"X    X     X X  X      X     X" +
	"X    X    X   X  XX    X     X" +
	"X    X    X   X    X   X     X" +
	"X    XXXX X   X XXX    X     X" +
	"X                            X" +
	"X   X    XXX X   X XXX X     X" +
	"X   X    X   X   X X   X     X" +
	"X   X    XX  X   X XX  X     X" +
	"X   X    X    X X  X   X     X" +
	"X   XXXX XXX   X   XXX XXXX  X" +
	"X                            X" +
	"X                            X" +
	"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
];

var Game = {
    init: function() {
        $("#info-label").hide();

	var marginLeft = Math.floor(window.innerWidth < 400 ? 0 : 
				    (window.innerWidth / 2 - 400 / 2));
	console.log("marginLeft: " + marginLeft);
	document.getElementById('main').style.left = marginLeft + "px";

        document.onkeydown = function(e) {
            e = e || window.event;

            if (e.keyCode=='37') {
                Game.setDirection(-1, 0);
            } else if (e.keyCode=='38') {
                Game.setDirection(0, -1);
            } else if (e.keyCode=='39') {
                Game.setDirection(1, 0);
            } else if (e.keyCode=='40') {
                Game.setDirection(0, 1);
            }
        }

        Game.newGame();
    },

    addFood: function() {
	food.number--;

        do {
            food.x = Math.floor(Math.random() * CONSTANT.columns);
            food.y = Math.floor(Math.random() * CONSTANT.rows);
        } while (!Game.freeSpot(food.x, food.y));

        Game.drawDotCanvas(food.x, food.y, 2);	
    },

    newGame: function() {
	currentLevel = 0;
        gameTime = 0;
	score = 0;
	lives = 3;
	Game.newLevel();
    },
    
    newLevel: function() {
	food.number = 10;
	snakeLength = 5;
	incrementLeft = 0;
        headPosition = snakeLength - 1;
        speedX = 1;
        speedY = 0;
	gameSpeed = 170;

	var startingPoint = levels[currentLevel].indexOf('S');

        //Init snakeArray
        for (var i = 0; i < snakeLength; i++) {
            snakeArray[i] = { 
		x: startingPoint % CONSTANT.columns - 1, 
		y: Math.floor(startingPoint / CONSTANT.columns) 
	    };
        }

        $("#info-label").html("<br><br><b>LEVEL " + (currentLevel + 1) + 
			      "</b><br><br><span style=\"font-size:35px\">Lives: " +
			      lives + "</span>");

	Game.drawLevel(0);
        $("#info-label").show();

        setTimeout(function() {
            $("#info-label").hide();
	    Game.drawLevel(currentLevel);
	    
            Game.addFood();
            gameTimer = setTimeout(Game.moveSnake, gameSpeed);
        }, 2000);
    },

    drawLevel: function(level) {
	Game.clearCanvas();
	//Draw walls
        for(var x = 0; x < CONSTANT.columns; x++) {
	    for(var y = 0; y < CONSTANT.rows; y++) {
                if (levels[level].charAt(x + CONSTANT.columns * y) == "X") {
		    Game.drawDotCanvas(x, y, 3);
		}
	    }
        }
    },

    gameOver: function() {
        console.log("gameOver()");
        $("#info-label").html("<br><br>GAME OVER<br><br>Score: " + score);
	Game.drawLevel(0);
        $("#info-label").show();

        setTimeout(function() {
            $("#info-label").hide();
            Game.newGame();
        }, 3000);
    },

    setDirection: function(x, y) {
        speedX = x;
        speedY = y;

	var direction = "top";
	
	if (x == -1 && y == 0)
	    direction = "left";
	else if (x == 1 && y == 0)
	    direction = "right";
	else if (x ==0 && y == 1)
	    direction = "bottom";

        document.getElementById(direction + '-arrow').style.opacity = 0.1;

        setTimeout(function() {
            document.getElementById(direction + '-arrow').style.opacity = 0.3;
        }, 300);
    },

    moveSnake: function() {
        if (++gameTime % 50 == 0) {
            gameSpeed -= 5;
        }

        var newHead = {
	    x: snakeArray[headPosition].x + speedX,
            y: snakeArray[headPosition].y + speedY
	};

	//Move head
        if (++headPosition == snakeLength) {
            headPosition = 0;
        }

        //Check food
        if (newHead.x == food.x && newHead.y == food.y) {
	    if (food.number == 1) {
		if (++currentLevel == levels.length) {
		    $("#info-label").html("<br><br>PERFECT GAME!<br><br>Score: " + score);
		    Game.drawLevel(0);
		    $("#info-label").show();
		} else {
		    Game.newLevel();
		    return;
		}
	    } else {
		score += 10;
		incrementLeft += increment;
		Game.addFood();
	    }
        }

        //Check that snake hasn't collided
        if (!Game.freeSpot(newHead.x, newHead.y)) {
	    if (--lives == 0) {
		Game.gameOver();
	    } else {
		Game.newLevel();
	    }
        } else {
	    if (incrementLeft > 0) {
		//Make snake longer
		snakeArray.splice(headPosition, 0, newHead);
		snakeLength++;
		incrementLeft--;
	    } else {
		//Remove tail
		Game.drawDotCanvas(snakeArray[headPosition].x, snakeArray[headPosition].y, 0);
		snakeArray[headPosition] = newHead;
	    }

            //Draw new head
            Game.drawDotCanvas(snakeArray[headPosition].x, snakeArray[headPosition].y, 1);

            gameTimer = setTimeout(Game.moveSnake, gameSpeed);
        }
    },

    freeSpot: function(x, y) {
        //TBD: Something wrong tail detection is not perfect
        for (var i = 0; i < snakeLength; i++) {
            if (snakeArray[i].x == x && snakeArray[i].y == y) {
                return false;
            }
        }

	if (levels[currentLevel].charAt(x + CONSTANT.columns * y) == "X") {
	    return false;
	}

        return true;
    },

    drawDotCanvas: function(x, y, type) {
        // type:
        //
        // 0 = background
        // 1 = snake
        // 2 = food
	// 3 = wall

        var canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
	    var margin = 0;

            if (type == 0) {
                ctx.fillStyle = backgroundColor; // set canvas background color
	    } else if (type == 1) {
                ctx.fillStyle = '#22aa77';
	    } else if (type == 2) {
                ctx.fillStyle = '#ff0000';
	    } else if (type == 3) {
                ctx.fillStyle = '#000000';
	    }

            ctx.fillRect(CONSTANT.blockSize * x, CONSTANT.blockSize * y, CONSTANT.blockSize - margin,
			 CONSTANT.blockSize - margin); // now fill the canvas

	    if (type == 2) {
		ctx.fillStyle = '#ffffff';
		ctx.fillText(food.number, CONSTANT.blockSize * x + CONSTANT.blockSize / 3, CONSTANT.blockSize * y +
			    CONSTANT.blockSize / 1.15);
	    }
        }
    },

    clearCanvas: function() {
        var canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = backgroundColor; // set canvas background color
            ctx.fillRect(0, 0, CONSTANT.blockSize * CONSTANT.columns, CONSTANT.blockSize *
			 CONSTANT.rows + 1); // now fill the canvas
        }
    }
}

window.onload = function() {
    "use strict";
    Game.init();
};

