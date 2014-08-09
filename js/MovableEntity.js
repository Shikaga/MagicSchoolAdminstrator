function MovableEntity(x, y, speed) {
	this.x = x;
	this.y = y;
	this.toX = null;
	this.toY = null;
	this.speed = speed;
    this.movementSpeed = this.speed;
}

MovableEntity.prototype = {
	update: function(dt) {
		if (this.toX !== null && this.toY !== null && dt > 0) {
            var dx = this.toX - this.x;   
            var dy = this.toY - this.y;
            var distance = Math.sqrt(dx*dx+dy*dy);
            var distanceTravelled = this.movementSpeed * dt;

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

    isGoingToRoom: function(room) {
        return room.containsCoords({
            x: this.toX,
            y: this.toY
        })
    },

	setNewDestination: function(coords) {
        this.movementSpeed = this.speed;
		this.toX = coords.x;
		this.toY = coords.y;
	},

    goToRoom: function(room) {
        var currentLocation = roomHandler.getLocationNear(this.getCoords());
        if (room != null) {
            var doorMap = roomHandler.getDoorMap();
            var route = doorMap.findShortestPath(currentLocation.id, room.id)
            if (route.length > 1) {
                var nextPoint = roomHandler.getPointById(route[1])
                var coords = nextPoint.getRandomCoordinates();
                this.setNewDestination(coords);  
            }
        }
    },

    wanderToNewDestination: function(coords) {
        this.movementSpeed = this.speed / 3;
        this.toX = coords.x;
        this.toY = coords.y;
    },

    isTravelling: function() {
        return !(this.toX == null)
    },

    getCoords: function() {
        return {
            x: this.x,
            y: this.y
        }
    }
}