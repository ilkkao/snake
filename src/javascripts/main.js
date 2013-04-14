
"use strict";

var CONST = { 
    rows: 30, 
    columns : 30,
    blockSize: 13,
    increment: 15,
    backgroundColor: '#e0eff8'
}

var comments = [
    "Ouch!",
    "That hurt!",
    "Not nice!",
    "Try harder!"
]

var snakeArray = new Array(5 + 10 * CONST.increment);
var gameTimer;
var ctx;

var state = {
    level: 0,
    lives: 0,
    incrementLeft: 0,
    snakeLength: 0,
    headPosition: 0,
    speedX: 0,
    speedY: 0,
    gameTime: 0,
    gameSpeed: 0,
    food: {},
    score: 0,
    state: ""
}

var levels = [
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B    S                       B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"B                            B" +
	"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
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
	var marginLeft = Math.floor(window.innerWidth < 400 ? 0 : 
				    (window.innerWidth / 2 - 400 / 2));
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

	$("#button-cell").click(function() {
	    console.log("Button clicked in state: " + state.state);

	    if (state.state == "NEW_GAME") {
		state.state = "";
		Game.newLevel(false);
	    } else if (state.state == "START_PLAY") {
		state.state = "";
		$("#info-label").hide();
		$("#button-cell").hide();
		$("#joystick-table").show();
		
		Game.drawLevel(state.level);
		
		Game.addFood();
		gameTimer = setTimeout(Game.moveSnake, state.gameSpeed);
		console.log("Started gameplay for level: " + state.level);
	    }
	});

	Game.newGame();
    },

    newGame: function() {
	state.level = 0;
        state.gameTime = 0;
	state.score = 0;
	state.lives = 3;

	Game.showText("<br><br><b><span style=\"font-size:100px\">" +
		      "SNAKE</span></b><br><br>" +
		      "<span style=\"font-size:35px\">v0.2</span>");

	$("#button-cell").html("NEW GAME");
	$("#button-cell").show();
	$("#joystick-table").hide();
	
	state.state = "NEW_GAME";
    },
    
    newLevel: function(died) {
	state.food.number = 10;
	state.snakeLength = 5;
	state.incrementLeft = 0;
        state.headPosition = state.snakeLength - 1;
        state.speedX = 1;
        state.speedY = 0;
	state.gameSpeed = 150;

	console.log("Showing level info screen: " + state.level);

	var startingPoint = levels[state.level].indexOf('S');

        //Init snakeArray
        for (var i = 0; i < state.snakeLength; i++) {
            snakeArray[i] = { 
		x: startingPoint % CONST.columns - 1, 
		y: Math.floor(startingPoint / CONST.columns) 
	    };
        }

        Game.showText("<br><br><b>LEVEL " + (state.level + 1) + 
		      "</b><br><br><span style=\"font-size:35px\">Lives left: " +
		      state.lives + "</span>");

	if (died) {
	    $("#button-cell").html("TRY AGAIN");
	} else {
	    $("#button-cell").html("START!");
	}

	$("#button-cell").show();
	$("#joystick-table").hide();

	state.state = "START_PLAY";
    },

    drawLevel: function(level) {
	Game.clearCanvas();
	//Draw walls
        for(var x = 0; x < CONST.columns; x++) {
	    for(var y = 0; y < CONST.rows; y++) {
		var type = levels[level].charAt(x + CONST.columns * y); 

                if (type == "X") {
		    Game.drawDotCanvas(x, y, 3);
		} else if (type == "B") {
		    Game.drawDotCanvas(x, y, 4);
		} else {
		    Game.drawDotCanvas(x, y, 0);
		}
	    }
        }
    },

    addFood: function() {
	state.food.number--;

        do {
            state.food.x = Math.floor(Math.random() * CONST.columns);
            state.food.y = Math.floor(Math.random() * CONST.rows);
        } while (!Game.freeSpot(state.food.x, state.food.y));

        Game.drawDotCanvas(state.food.x, state.food.y, 2, state.food.number);	
    },

    gameOver: function() {
        Game.showText("<br><br>GAME OVER<br><br>Score: " + state.score);

	$("#button-cell").html("OK");
	$("#joystick-table").hide();
	$("#button-cell").show();

	$(document).one('click touchstart', function() {
            Game.newGame();
	});
    },

    setDirection: function(x, y) {
        state.speedX = x;
        state.speedY = y;

	var direction = "top";
	
	if (x == -1 && y == 0)
	    direction = "left";
	else if (x == 1 && y == 0)
	    direction = "right";
	else if (x ==0 && y == 1)
	    direction = "bottom";

        document.getElementById(direction + '-arrow').style.opacity = 0.4;

        setTimeout(function() {
            document.getElementById(direction + '-arrow').style.opacity = 0.7;
        }, 300);
    },

    moveSnake: function() {
        if (++state.gameTime % 50 == 0) {
            state.gameSpeed -= 5;
        }

        var newHead = {
	    x: snakeArray[state.headPosition].x + state.speedX,
            y: snakeArray[state.headPosition].y + state.speedY
	};

	//Move head position
        if (++state.headPosition == state.snakeLength) {
            state.headPosition = 0;
        }

        //Check food
        if (newHead.x == state.food.x && newHead.y == state.food.y) {
	    if (state.food.number == 1) {
		if (++state.level == levels.length) {
		    Game.showText("<br><br>PERFECT GAME!<br><br>Score: " + state.score);
		} else {
		    Game.newLevel(false);
		    return;
		}
	    } else {
		state.score += 10;
		state.incrementLeft += CONST.increment;
		Game.addFood();
	    }
        }

        //Check that snake hasn't collided
        if (!Game.freeSpot(newHead.x, newHead.y)) {
	    if (--state.lives == 0) {
		Game.gameOver();
	    } else {
		var text = comments[Math.floor(Math.random()*comments.length)];

		Game.showText("<br><br><b style=\"color:#dddddd\">" + text + "</b><br><br>");
		setTimeout(function() {
		    Game.newLevel(true);
		}, 1700);
	    }
        } else {
	    if (state.incrementLeft > 0) {
		//Make snake longer
		snakeArray.splice(state.headPosition, 0, newHead);
		state.snakeLength++;
		state.incrementLeft--;
	    } else {
		//Remove tail
		Game.drawDotCanvas(snakeArray[state.headPosition].x, 
				   snakeArray[state.headPosition].y, 0);
		snakeArray[state.headPosition] = newHead;
	    }

            //Draw new head
            Game.drawDotCanvas(snakeArray[state.headPosition].x,
			       snakeArray[state.headPosition].y, 1);

            gameTimer = setTimeout(Game.moveSnake, state.gameSpeed);
        }
    },

    freeSpot: function(x, y) {
        for (var i = 0; i < state.snakeLength; i++) {
            if (snakeArray[i].x == x && snakeArray[i].y == y) {
                return false;
            }
        }

	var type = levels[state.level].charAt(x + CONST.columns * y);

	if (type == "X" || type == "B") {
	    return false;
	}

        return true;
    },

    // Type:
    // 0 = background
    // 1 = snake
    // 2 = food
    // 3 = wall
    // 4 = wall 2
    drawDotCanvas: function(x, y, type, number) {
	var margin = 0;

        ctx.clearRect(CONST.blockSize * x, CONST.blockSize * y, CONST.blockSize - margin,
		      CONST.blockSize - margin);

        if (type == 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
	} else if (type == 1) {
            ctx.fillStyle = '#22aa77';
	} else if (type == 2) {
            ctx.fillStyle = '#ff0000';
	} else if (type == 3) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
	} else if (type == 4) {
//	    ctx.globalAlpha=0.5;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
	}
	
        ctx.fillRect(CONST.blockSize * x, CONST.blockSize * y, CONST.blockSize - margin,
		     CONST.blockSize - margin);
	
	if (type == 2) {
	    ctx.fillStyle = '#ffffff';
	    ctx.fillText(number, CONST.blockSize * x + CONST.blockSize / 3, 
			 CONST.blockSize * y + CONST.blockSize / 1.15);
	}
    },

    clearCanvas: function() {
	ctx.clearRect(0, 0, CONST.blockSize * CONST.columns, CONST.blockSize *
		     CONST.rows + 1);
    },

    showText: function(html) {
        $("#info-label").html(html);
	Game.drawLevel(0);
        $("#info-label").show();
    }
}

window.onload = function() {
    "use strict";
    ctx = document.getElementById('canvas').getContext("2d");
    Game.init();
};

