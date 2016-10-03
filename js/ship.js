(function(window) {
    'use strict';

    var shipImage = new Image();
    shipImage.src = 'img/rocket.png';

    function Ship(ctx) {
        this.ctx = ctx;
        this.position = 280;
        //this.render();
    }

    Ship.prototype.moveToLeft = function() {
        if(this.position > 0){
            this.position -= 25;
        }
        this.render();
    }

    Ship.prototype.moveToRight = function() {
        if(this.position < 575){
            this.position += 25;
        }
        this.render();
    }

    Ship.prototype.getShipPosition = function() {
        return this.position;
    }

    Ship.prototype.render = function(){
        this.ctx.fillStyle = "#FF0000";
        this.ctx.drawImage(shipImage, this.position, 540, 40, 40);
        //this.ctx.fillRect(this.position, 570, 20, 20);
    }

    // Export to window
	window.app = window.app || {};
	window.app.Ship = Ship;

}(window));
