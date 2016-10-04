(function(window) {
    'use strict';

    function Ship(ctx) {
        this.ctx = ctx;
        this.position = 280;

        this.shipImage = new Image();
        this.shipImage.src = 'img/rocket.png';
    }

    Ship.prototype.clear = function() {
        this.position = 280;
    }

    Ship.prototype.moveToLeft = function() {
        if(this.position > 0){
            this.position -= 15;
        }
        this.render();
    }

    Ship.prototype.moveToRight = function() {
        if(this.position < 575){
            this.position += 15;
        }
        this.render();
    }

    Ship.prototype.getShipPosition = function() {
        return this.position;
    }

    Ship.prototype.render = function(){
        this.ctx.drawImage(this.shipImage, this.position, 540, 45, 45);
    }

    // Export to window
	window.app = window.app || {};
	window.app.Ship = Ship;

}(window));
