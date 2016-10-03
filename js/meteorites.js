(function(window) {
    'use strict';

    var asteroidImage = new Image();
    asteroidImage.src = 'img/asteroid.png';

    function Meteorites(ctx) {
        this.ctx = ctx;
        this.meteorites = [];
        this.meteoritesToCreate = 1;
        this.renderCounter = 0;
        this.width = 30;
        this.height = 30;
    }

    Meteorites.prototype.removeMeteorite = function(meteorite) {
        _.remove(this.meteorites, function(obj){
            return obj.x == meteorite.x && obj.y == meteorite.y;
        })
    }

    Meteorites.prototype.getMeteorites = function() {
        return this.meteorites;
    }

    Meteorites.prototype.addNewMeteorites = function() {
        for (var i = 0; i < this.meteoritesToCreate; i++) {
            this.meteorites.push(
                {
                    x: Math.floor(Math.random() * 580),
                    y: Math.floor(Math.random() * -500),
                    width: this.width,
                    height: this.height
                }
            )
        }
        if(this.renderCounter == 4){
            this.meteoritesToCreate++;
            this.renderCounter = 0;
        } else {
            this.renderCounter++;
        }
    }

    Meteorites.prototype.drawMeteorites = function() {
        _.each(this.meteorites, function(meteorite) {
            this.ctx.fillStyle = "#000";
            this.ctx.drawImage(asteroidImage, meteorite.x, meteorite.y, meteorite.width, meteorite.height);
            //this.ctx.fillRect(meteorite.x, meteorite.y, meteorite.width, meteorite.height);
        }.bind(this));
    }

    Meteorites.prototype.updatePositions = function() {
        this.removeInvisibleMeteorites();
        _.each(this.meteorites, function(meteorite) {
            meteorite.y += 4;
        });
    }

    Meteorites.prototype.removeInvisibleMeteorites = function() {
        _.remove(this.meteorites, function(meteorite){
            return meteorite.y > 600;
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
    window.app.Meteorites = Meteorites;

}(window));
