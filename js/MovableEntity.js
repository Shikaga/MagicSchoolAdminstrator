function MovableEntity(x, y, speed, wanderSpeed) {
	this.coords = {x: x, y: y};
	this.toCoords = {x: null, y: null};
	this.speed = speed;
	this.wanderSpeed = wanderSpeed;
	this.movementSpeed = this.speed;

	this.state = "IDLE";
	this.wanderingRoom = null;
}

MovableEntity.prototype = {
	update: function(dt) {
		if (this.toCoords.x !== null && this.toCoords.y !== null && dt > 0) {
			var dx = this.toCoords.x - this.coords.x;   
			var dy = this.toCoords.y - this.coords.y;
			var distanceToDestination = Math.sqrt(dx*dx+dy*dy);
			var distanceTravelled = this.movementSpeed * dt;

			if (distanceToDestination <= distanceTravelled) {
				this.coords.x = this.toCoords.x;
				this.coords.y = this.toCoords.y;
				this.toCoords.x = null;
				this.toCoords.y = null;
				if (this.arrivedCalledback) {
					var arrivedCalledback = this.arrivedCalledback;
					this.arrivedCalledback = null;
					arrivedCalledback();
				}
			} else {
				this.coords.x += dx/distanceToDestination * distanceTravelled;
				this.coords.y += dy/distanceToDestination * distanceTravelled;
			}
		}
	},

	isGoingToRoom: function(room) {
		return room.containsCoords(this.toCoords)
	},

	setNewDestination: function(coords,callback) {
		this.movementSpeed = this.speed;
		this.toCoords = coords;
		this.arrivedCalledback = callback;
	},

	setNewCoords: function(coords) {
		this.coords = coords;
	},

	stop: function() {
		this.state = "IDLE";
		this.toCoords = {x: null, y: null}
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

	_wanderToNewPlaceInRoom: function() {
		this.movementSpeed = this.wanderSpeed;
		var coords = this.wanderingRoom.getRandomCoordinates();
		this.toCoords = coords;
	},

	wanderInRoom: function(room, callback) {
		this.arrivedCalledback = callback;
		this.wanderingRoom = room;
		this._wanderToNewPlaceInRoom();
	},

	isTravelling: function() {
		return !(this.toCoords.x == null)
	},

	getCoords: function() {
		return this.coords;
	}
}