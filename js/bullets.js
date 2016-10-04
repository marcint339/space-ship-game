(function(window) {
    'use strict';

    function Bullets(ctx) {
        this.ctx = ctx;
        this.bullets = [];
        this.width = 3;
        this.height = 12;
    }

    Bullets.prototype.clear = function() {
        this.bullets = [];
    }

    Bullets.prototype.getBullets = function() {
        return this.bullets;
    }

    Bullets.prototype.removeSingleBullet = function(bullet) {
        _.remove(this.bullets, function(obj){
            return obj.x === bullet.x && obj.y === bullet.y;
        });
    }

    Bullets.prototype.shoot = function(position) {
        this.bullets.push({
            x: position,
            y: 520,
            width: this.width,
            height: this.height
        })
    }

    Bullets.prototype.drawBullets = function() {
        _.each(this.bullets, function(bullet) {
            this.ctx.fillStyle = '#FFA500';
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }.bind(this));
    }

    Bullets.prototype.updatePositions = function() {
        this.removeInvisibleBullets();
        _.forEach(this.bullets, function(bullet) {
            bullet.y -= 5;
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
