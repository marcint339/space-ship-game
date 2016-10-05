(function(window) {
    'use strict';

    function Ship(ctx) {
        this.ctx = ctx;
        this.position = 280;

        this.shipImage = new Image();
        this.shipImage.src = 'img/rocket.png';

        this.movingLeft = false;
        this.movingRight = false;
    }

    Ship.prototype.clear = function() {
        this.position = 280;
    }

    Ship.prototype.setMovingLeft = function(value) {
        this.movingLeft = value;
    }

    Ship.prototype.setMovingRight = function(value) {
        this.movingRight = value;
    }

    Ship.prototype.handleShipMove = function() {
        if (this.movingLeft && this.position > -18) {
           this.position -= 6;
        }
        if (this.movingRight && this.position < 575) {
           this.position += 6;
        }
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
