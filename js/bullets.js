(function(window) {
    'use strict';

    function Bullets(ctx) {
        this.ctx = ctx;
        this.bullets = [];
        this.width = 3;
        this.height = 12;
    }

    Bullets.prototype.removeBullet = function(bullet) {
        _.remove(this.bullets, function(obj){
            return obj.x == bullet.x && obj.y == bullet.y;
        })
    }

    Bullets.prototype.getBullets = function() {
        return this.bullets;
    }

    Bullets.prototype.addNewBullet = function(x) {
        this.bullets.push(
            {
                x: x,
                y: 520,
                width: this.width,
                height: this.height
            }
        )
    }

    Bullets.prototype.drawBullets = function() {
        _.each(this.bullets, function(bullet) {
            this.ctx.fillStyle = "#FFA500";
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }.bind(this));
    }

    Bullets.prototype.updatePositions = function() {
        this.removeInvisibleBullets();
        _.each(this.bullets, function(bullet) {
            bullet.y -= 10;
        });
    }

    Bullets.prototype.removeInvisibleBullets = function() {
        _.remove(this.bullets, function(bullet){
            return bullet.y < 0;
        });
    }

    // Export to window
    window.app = window.app || {};
    window.app.Bullets = Bullets;

}(window));
