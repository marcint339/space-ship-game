(function() {
    'use strict';

    var app = window.app;

    function Game() {
        this.ctx = this.initCanvasPlayground();
        this.bullets = new app.Bullets(this.ctx);
        this.ship = new app.Ship(this.ctx);
        this.startGame();
        this.initListeners();
    }

    Game.prototype.initListeners = function() {
        window.addEventListener('keydown', function(event){
            switch (event.keyCode) {
                case 37:
                    this.ship.moveToLeft();
                    break;
                case 39:
                    this.ship.moveToRight();
                    break;
                case 32:
                    //space
                    break;
            }
        }.bind(this));
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
        this.bullets.addNewBullets();
        setInterval(function() {
            this.bullets.updatePositions();
            if(counter == 40){
                this.bullets.addNewBullets();
                counter = 0;
            } else {
                counter++;
            }
            this.ctx.clearRect(0, 0, 600, 600);
            this.bullets.drawBullets();
            this.ship.render();
        }.bind(this), 60);
    }

    var game = new Game();

}());
