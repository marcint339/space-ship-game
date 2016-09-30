(function(window) {
    'use strict';

    function Bullets(ctx) {
        this.ctx = ctx;
        this.bullets = [];
        this.bulletsToCreate = 1;
        this.renderCounter = 0;
        this.width = 15;
        this.height = 15;
    }

    Bullets.prototype.getBullets = function() {
        return this.bullets;
    }

    Bullets.prototype.addNewBullets = function() {
        for (var i = 0; i < this.bulletsToCreate; i++) {
            this.bullets.push(
                {
                    x: Math.floor(Math.random() * 580),
                    y: Math.floor(Math.random() * -500),
                    width: this.width,
                    height: this.height
                }
            )
        }
        if(this.renderCounter == 4){
            this.bulletsToCreate++;
            this.renderCounter = 0;
        } else {
            this.renderCounter++;
        }
    }

    Bullets.prototype.drawBullets = function() {
        _.each(this.bullets, function(bullet) {
            this.ctx.fillStyle = "#000";
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }.bind(this));
    }

    Bullets.prototype.updatePositions = function() {
        this.removeInvisibleBullets();
        _.each(this.bullets, function(bullet) {
            bullet.y += 20;
        });
    }

    Bullets.prototype.removeInvisibleBullets = function() {
        _.remove(this.bullets, function(bullet){
            return bullet.y > 600;
        });
    }

    // Bullets.prototype.render = function() {
    //     var counter = 0;
    //     this.addNewBullets();
    //     setInterval(function() {
    //         this.updatePositions();
    //         if(counter == 40){
    //             this.addNewBullets();
    //             counter = 0;
    //         } else {
    //             counter++;
    //         }
    //         this.drawBullets();
    //     }.bind(this), 60);
    // }

    // Export to window
    window.app = window.app || {};
    window.app.Bullets = Bullets;

}(window));
