(function() {
    'use strict';

    var app = window.app;

    function Game() {
        this.ctx = this.initCanvasPlayground();

        this.meteorites = new app.Meteorites(this.ctx);
        this.ship = new app.Ship(this.ctx);
        this.bullets = new app.Bullets(this.ctx);

        this.endOfGame = false;
        this.scoreCounter = 0;
        this.backgroundPosition = 0;

        this.DOMElements = {
            playground: document.getElementById('playground'),
            startGameButton: document.getElementById('startGame'),
            scoreCounterWrapper: document.getElementById('scoreCounter'),
            scoreGameOver: document.getElementById('scoreGameOver'),
            gameOverInfo: document.getElementById('gameOver')
        }

        this.initListeners();
    }

    Game.prototype.initCanvasPlayground = function() {
        var canvas = document.getElementById('playground');
        var ctx = canvas.getContext('2d');
        return ctx;
    }

    Game.prototype.initListeners = function() {
        this.DOMElements.startGameButton.addEventListener('click', function(e){
            this.handleStartGame(e);
        }.bind(this));

        window.addEventListener('keydown', function(e){
            this.handleKeyDown(e);
        }.bind(this));
    }

    Game.prototype.handleStartGame = function(e) {
        e.preventDefault();
        this.DOMElements.startGameButton.style.display = 'none';
        this.startGame();
    }

    Game.prototype.handleKeyDown = function(e) {
        if(this.endOfGame) return false;
        switch (e.keyCode) {
            case 37:
                this.ship.moveToLeft();
                break;
            case 39:
                this.ship.moveToRight();
                break;
            case 38:
                this.shoot();
                break;
        }
    }

    Game.prototype.shoot = function() {
        var position = this.ship.getShipPosition();
        this.bullets.shoot(position + 18); // 18 -> shot from the middle of ship
    }

    Game.prototype.handleResetPreviousGame = function() {
        this.scoreCounter = 0;
        this.DOMElements.scoreCounterWrapper.innerHTML = this.scoreCounter;
        this.DOMElements.gameOverInfo.style.display = 'none';
        this.endOfGame = false;

        this.meteorites.clear();
        this.bullets.clear();
        this.ship.clear();
    }

    Game.prototype.startGame = function() {
        if(this.scoreCounter > 0) this.handleResetPreviousGame();
        var counter = 0;
        var gameTimer = setInterval(function() {
            this.backgroundPosition += 0.4;
            this.DOMElements.playground.style.backgroundPosition = "center " + this.backgroundPosition + "px";

            this.meteorites.updatePositions();
            this.bullets.updatePositions();
            if(counter === 100){
                this.meteorites.addNewMeteorites();
                counter = 0;
            } else {
                counter++;
            }
            this.renderGameElements();
            this.checkIfGameOver();

            if(!this.endOfGame){
                this.checkShoots();
            } else{
                clearInterval(gameTimer);
            }
        }.bind(this), 15);
        this.calculateScore();
    }

    Game.prototype.calculateScore = function() {
        var gameTimer = setInterval(function() {
            if(this.endOfGame){
                clearInterval(gameTimer);
            } else {
                this.scoreCounter++;
                this.DOMElements.scoreCounterWrapper.innerHTML = this.scoreCounter;
            }
        }.bind(this), 1000);
    }

    Game.prototype.renderGameElements = function() {
        this.ctx.clearRect(0, 0, 600, 600);
        this.meteorites.drawMeteorites();
        this.bullets.drawBullets();
        this.ship.render();
    }

    Game.prototype.checkShoots = function() {
        var meteorites = this.meteorites.getMeteorites();
        var bullets = this.bullets.getBullets();
        _.forEach(bullets, function(bullet){
            var meteorit = this.getHitMeteorit(meteorites, bullet);
            if(meteorit){
                this.bullets.removeSingleBullet(bullet);
                if((meteorit.hits + 2) >= meteorit.size){
                    this.meteorites.removeMeteorit(meteorit);
                    this.scoreCounter += (3 * meteorit.size);
                } else {
                    this.meteorites.hitMeteorit(meteorit);
                }

                this.meteorites.drawMeteorites();
                this.bullets.drawBullets();
                return false; // exit forEach
            }
        }.bind(this))
    }

    Game.prototype.getHitMeteorit = function(meteorites, bullet) {
        return _.find(meteorites, function(meteorit){
            return bullet.x > meteorit.x &&
                   bullet.x < (meteorit.x + (5 + meteorit.size * 12)) &&
                   bullet.y > meteorit.y &&
                   bullet.y < (meteorit.y + 30);
        });
    }

    Game.prototype.checkIfGameOver = function() {
        var shipPosition = this.ship.getShipPosition();
        var meteorites = this.meteorites.getMeteorites();
        _.forEach(meteorites, function(meteorit){
            if(this.isMeteoritAndShipCollision(meteorit, shipPosition)){
                this.stopPlaying();
                return false; // exit forEach
            }
        }.bind(this))
    }

    Game.prototype.isMeteoritAndShipCollision = function(meteorit, shipPosition) {
        var meteoritSize = 5 + meteorit.size * 12;
        return meteorit.y > 540 && meteorit.y < 585 && meteorit.x > (shipPosition - meteoritSize + 1) && meteorit.x < (shipPosition + 44);
    }

    Game.prototype.stopPlaying = function() {
        this.endOfGame = true;
        this.ctx.clearRect(0, 0, 600, 600);
        this.displayResult();
    }

    Game.prototype.displayResult = function() {
        this.DOMElements.startGameButton.style.display = 'inline-block';
        this.DOMElements.gameOverInfo.style.display = 'block';
        this.DOMElements.scoreGameOver.innerHTML = this.scoreCounter;
    }

    var game = new Game();

}());
