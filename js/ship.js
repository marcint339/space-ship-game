(function(window) {
    'use strict';

    function Ship(ctx) {
        this.ctx = ctx;
        //this.render();
    }

    Ship.prototype.render = function(){
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(280, 570, 20, 20);
    }

    // Export to window
	window.app = window.app || {};
	window.app.Ship = Ship;

}(window));
