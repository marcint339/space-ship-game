(function() {
    'use strict';

    var app = window.app;

    function Game() {
        this.ctx = this.initCanvasPlayground();
        this.meteorites = new app.Meteorites(this.ctx);
        this.ship = new app.Ship(this.ctx);
        this.bullets = new app.Bullets(this.ctx);
        this.endOfGame = false;
        this.startGame();
        this.initListeners();
        this.scoreCounter = 0;
    }

    Game.prototype.initListeners = function() {
        window.addEventListener('keydown', function(event){
            if(this.endOfGame) return false;
            switch (event.keyCode) {
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
        }.bind(this));
    }

    Game.prototype.shoot = function() {
        var position = this.ship.getShipPosition();
        this.bullets.addNewBullet(position + 18);
        this.bullets.drawBullets();
    }

    Game.prototype.initCanvasPlayground = function() {
        var canvas = document.getElementById('playground');
        var ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 600;
        return ctx;
    }

    Game.prototype.startGame = function() {
        var counter = 0;
        this.meteorites.addNewMeteorites();
        var timer = setInterval(function() {
            this.meteorites.updatePositions();
            this.bullets.updatePositions();
            if(counter == 40){
                this.meteorites.addNewMeteorites();
                counter = 0;
            } else {
                counter++;
            }
            this.ctx.clearRect(0, 0, 600, 600);
            this.meteorites.drawMeteorites();
            this.bullets.drawBullets();
            this.ship.render();
            this.isEndGame();
            this.checkShoots();
            if(this.endOfGame) clearInterval(timer);
        }.bind(this), 60);
        this.calculateScore();
    }

    Game.prototype.checkShoots = function() {
        var meteorites = this.meteorites.getMeteorites();
        var bullets = this.bullets.getBullets();
        _.forEach(bullets, function(bullet){
            var meteorite = _.find(meteorites, function(meteorite){
                return bullet.x > meteorite.x && bullet.x < (meteorite.x + meteorite.width) && bullet.y > meteorite.y && bullet.y < (meteorite.y + 30);
            });
            if(meteorite){
                this.scoreCounter += 5;
                this.bullets.removeBullet(bullet);
                this.meteorites.removeMeteorite(meteorite);
                this.meteorites.drawMeteorites();
                this.bullets.drawBullets();
                return false; // exit forEach
            }
        }.bind(this))
    }

    Game.prototype.calculateScore = function() {
        var scoreCounterWrapper = document.getElementById('scoreCounter');
        var timer = setInterval(function() {
            if(this.endOfGame) clearInterval(timer);
            this.scoreCounter++;
            scoreCounterWrapper.innerHTML = this.scoreCounter;
        }.bind(this), 1000);
    }

    Game.prototype.stopPlaying = function() {
        this.endOfGame = true;
    }

    Game.prototype.isEndGame = function() {
        var shipPosition = this.ship.getShipPosition();
        var meteorites = this.meteorites.getMeteorites();
        _.forEach(meteorites, function(meteorit){
            if(meteorit.y > 550 && meteorit.x > (shipPosition - 20) && meteorit.x < (shipPosition + 40)){
                this.stopPlaying();
            }
        }.bind(this))
    }

    var game = new Game();

}());
