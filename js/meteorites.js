(function(window) {
    'use strict';

    function Meteorites(ctx) {
        this.ctx = ctx;
        this.meteorites = [];
        this.meteoritesToCreate = 1;
        this.renderCounter = 0;
        this.width = 30;
        this.height = 30;

        this.meteoritImage = new Image();
        this.meteoritImage.src = 'img/asteroid.png';
    }

    Meteorites.prototype.clear = function() {
        this.meteorites = [];
        this.meteoritesToCreate = 1;
        this.renderCounter = 0;
    }

    Meteorites.prototype.removeMeteorit = function(meteorit) {
        _.remove(this.meteorites, function(obj){
            return obj.x == meteorit.x && obj.y == meteorit.y;
        })
    }

    Meteorites.prototype.hitMeteorit = function(meteorit) {
        var index = _.findIndex(this.meteorites, function(obj){
            return obj.x == meteorit.x && obj.y == meteorit.y;
        });
        if(index > -1){
            this.meteorites[index].hits++;
        }
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
                    size: Math.floor(Math.random() * 4) + 1,
                    speed: Math.floor(Math.random() * 3) + 1,
                    hits: 0
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
        _.each(this.meteorites, function(meteorit) {
            this.ctx.fillStyle = "#000";
            this.ctx.drawImage(this.meteoritImage, meteorit.x, meteorit.y, 5 + meteorit.size * 12, 5 + meteorit.size * 12);
            //this.ctx.fillRect(meteorite.x, meteorite.y, meteorite.width, meteorite.height);
        }.bind(this));
    }

    Meteorites.prototype.updatePositions = function() {
        this.removeInvisibleMeteorites();
        _.each(this.meteorites, function(meteorite) {
            meteorite.y += meteorite.speed * 2;
        });
    }

    Meteorites.prototype.removeInvisibleMeteorites = function() {
        _.remove(this.meteorites, function(meteorit){
            return meteorit.y > 600;
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
