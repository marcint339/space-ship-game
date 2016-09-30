(function() {
    'use strict';

    var app = window.app;

    function Game() {
        this.ctx = this.initCanvasPlayground();
        this.bullets = new app.Bullets(this.ctx);
        this.ship = new app.Ship(this.ctx);
        this.startGame();
    }

    Game.prototype.initCanvasPlayground = function() {
        var canvas = document.getElementById('playground');
        var ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 600;
        return ctx;
    }

    Game.prototype.startGame = function() {
        this.bullets.render();
    }

    var game = new Game();

}());
