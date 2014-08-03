function MovableEntity(x, y, speed) {
	this.x = x;
	this.y = y;
	this.toX = null;
	this.toY = null;
	this.speed = speed;
}

MovableEntity.prototype = {
	update: function(dt) {
		if (this.toX !== null && this.toY !== null && dt > 0) {
            var dx = this.toX - this.x;   
            var dy = this.toY - this.y;
            var distance = Math.sqrt(dx*dx+dy*dy);
            var distanceTravelled = this.speed * dt;

            if (distance < distanceTravelled) {
                this.x = this.toX;
                this.y = this.toY;
                this.toX = null;
                this.toY = null;
            } else {
                this.x += dx/distance * distanceTravelled;
                this.y += dy/distance * distanceTravelled;
            }
        }
	},

	setNewDestination: function(coords) {
		this.toX = coords.x;
		this.toY = coords.y;
	}
}