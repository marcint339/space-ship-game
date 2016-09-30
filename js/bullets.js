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
        if(this.renderCounter == 5){
            this.bulletsToCreate++;
            this.renderCounter = 0;
        } else {
            this.renderCounter++;
        }
    }

    Bullets.prototype.drawBullets = function() {
        this.ctx.clearRect(0, 0, 600, 600);
        _.each(this.bullets, function(bullet) {
            this.ctx.save();
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }.bind(this));
    }

    Bullets.prototype.updatePositions = function() {
        _.each(this.bullets, function(bullet) {
            bullet.y += 20;
        });
    }

    Bullets.prototype.render = function() {
        var counter = 0;
        this.addNewBullets();
        setInterval(function() {
            this.updatePositions();
            if(counter == 40){
                this.addNewBullets();
                counter = 0;
            } else {
                counter++;
            }
            this.drawBullets();
        }.bind(this), 60);
    }

    // Export to window
	window.app = window.app || {};
	window.app.Bullets = Bullets;

}(window));
