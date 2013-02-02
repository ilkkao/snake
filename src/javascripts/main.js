
"use strict";

var CONSTANT = { rows: 15, columns : 30 };

var grid;
var snakeArray = new Array(100);
var snakeLength;
var headPosition;
var speedX;
var speedY;

var gameTimer;
var score;
var gameSpeed;

var food = {};

//App object
var SNAKE = {};
var that;

SNAKE.Class = ACTION.BaseClass.extend({

    init: function() {
        console.log("snake init()");
        SNAKE.Class.superClass_.init.call(this);

        that = this;
    },

    onCreate: function(viewModel) {
        console.log("snake onCreate()");
        SNAKE.Class.superClass_.onCreate.call(this, viewModel);
        this.initViewModel();
        //this.viewModel.reset();
    },

    onUpdateViewModel: function(viewModel) {
        console.log("snake onUpdateViewModel()");
        SNAKE.Class.superClass_.onUpdateViewModel.call(this, viewModel);
        this.initViewModel();
    },

    initViewModel: function() {
        console.log("snake initViewModel()");

        $("#gameOverLabel").hide();

        grid = new Array(CONSTANT.colums);

        for(var i = 0; i < grid.length; i++) {
            grid[i] = new Array(CONSTANT.rows);
        }

        //for(var x = 0; x < CONSTANT.columns; x++) {
        //    for(var y = 0; y < CONSTANT.rows; y++) {
        //        drawDot(x, y);
        //        console.log("yes");
        //    }
        //}

        document.onkeydown = function(e) {
            e = e || window.event;

            if(e.keyCode=='37') {
                that.setDirection(-1, 0);
            } else if(e.keyCode=='38') {
                that.setDirection(0, -1);
            } else if(e.keyCode=='39') {
                that.setDirection(1, 0);
            } else if(e.keyCode=='40') {
                that.setDirection(0, 1);
            }
        }

        this.newGame();
    },

    //this.viewModel.update();

    onDestroy: function() {
        // This function should do any cleanup needed before the view is destroyed as
        // a result of being popped off the view stack.
    },

    addFood: function() {
        do {
            food.x = Math.floor(Math.random() * CONSTANT.columns);
            food.y = Math.floor(Math.random() * CONSTANT.rows);

            that.drawDotCanvas(food.x, food.y, 2);

            console.log("Added food at " + food.x + "," + food.y);
        } while (that.snakeSpot(food.x, food.y));
    },

    newGame: function() {
        snakeLength = 45;
        headPosition = 44;

        //Init snakeArray
        for (var i = 0; i < snakeLength; i++) {
            snakeArray[i] = { x: 3, y: 3 };
        }

        speedX = 1;
        speedY = 0;

        score = 0;
        gameSpeed = 170;

        that.addFood();
        gameTimer = setInterval(that.moveSnake, gameSpeed);
    },

    gameOver: function() {
        console.log("gameOver()");
        $("#gameOverLabel").html("GAME OVER<br><br>Score: " + score);
        $("#canvas").hide();
        $("#gameOverLabel").show();
        clearInterval(gameTimer);

        setTimeout(function() {
            $("#gameOverLabel").hide();
            SNAKE.controller.clearCanvas();
            $("#canvas").show();
            SNAKE.controller.newGame();
        }, 4000);
    },

    setDirection: function(x, y) {
        speedX = x;
        speedY = y;
    },

    moveSnake: function() {
        var oldHead = {};
        oldHead.x = snakeArray[headPosition].x;
        oldHead.y = snakeArray[headPosition].y;

        score++;

        if (score % 50 == 0) {
            gameSpeed -= 20;

            clearInterval(gameTimer);
            gameTimer = setInterval(SNAKE.controller.moveSnake, gameSpeed);
        }

        var oldHeadPosition = headPosition;

        headPosition++;

        if (headPosition == snakeLength) {
            headPosition = 0;
        }

        oldHead.x += speedX;
        oldHead.y += speedY;

        var gameIsOver = false;

        //Check that snake hasn't collided with itself
        if (that.snakeSpot(oldHead.x, oldHead.y)) {
            gameOver = true;
        }

        //Check borders
        if (oldHead.x < 0 || oldHead.y < 0 || oldHead.x >= CONSTANT.columns ||
           oldHead.y >= CONSTANT.rows) {
            gameIsOver = true;
        }

        //Check food
        if (oldHead.x == food.x && oldHead.y == food.y) {
            that.addFood();
        }

        if (gameIsOver) {
            SNAKE.controller.gameOver();
        } else {
            console.log(oldHead.x + ", " + oldHead.y);

            //remove
            that.drawDotCanvas(snakeArray[headPosition].x, snakeArray[headPosition].y, 0);
            snakeArray[headPosition] = oldHead;

            //add
            that.drawDotCanvas(snakeArray[headPosition].x, snakeArray[headPosition].y, 1);
        }
    },

    snakeSpot: function(x, y) {
        //TBD: Something wrong tail detection is not perfect
        for (var i = 0; i < snakeLength; i++) {
            if (snakeArray[i].x == x && snakeArray[i].y == y) {
                return true;
            }
        }

        return false;
    },

    drawDotCanvas: function(x, y, type) {
        // type:
        //
        // 0 = background
        // 1 = snake
        // 2 = food

        var canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            if (type == 1)
                ctx.fillStyle = '#22aa77';
            else if (type == 0)
                ctx.fillStyle = '#ffffff'; // set canvas background color
            else if (type == 2)
                ctx.fillStyle = '#ff0000'; // set canvas background color

            ctx.fillRect(10 * x, 10 * y, 8, 8); // now fill the canvas
        }
    },

    clearCanvas: function() {
        var canvas = document.getElementById('canvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = '#ffffff'; // set canvas background color
            ctx.fillRect(0, 0, 10 * CONSTANT.columns, 10 * CONSTANT.rows + 1); // now fill the canvas
        }
    }
});

window.onload = function() {
    "use strict";

    SNAKE.controller = new SNAKE.Class();
    ACTION.init(SNAKE.controller);
};

