	function Person(map,x,y,speed, color, type, owner) {
	this.owner = owner;
	this.moveableEntity = new MovableEntity(x,y,speed);

	this.type = type;
	this.name = chance.first() + " " + chance.last();
	this.color = color;

	this.renderInit(map, this.moveableEntity);
}

Person.prototype = {
	update: function(dt) {
		this.moveableEntity.update(dt);
		this.render();
	},

	render: function() {
		this.container.x = this.moveableEntity.x;
		this.container.y = this.moveableEntity.y;
	},

	isInRoom: function(room) {
		return room.containsCoords(this.moveableEntity.getCoords())
	},

	getRoomIn: function() {
		return roomHandler.getRoomIn({x: this.moveableEntity.x, y: this.moveableEntity.y})
	},

	getRoomTypeIn: function() {
		return roomHandler.getRoomTypeIn({x: this.moveableEntity.x, y: this.moveableEntity.y})
	},

	goToRoom: function(room) {
		var currentPoint = roomHandler.getPointNear(this.moveableEntity.getCoords());
		if (room != null) {
			if (!this.moveableEntity.isGoingToRoom(room)) {
				var doorMap = roomHandler.getDoorMap();
				var route = doorMap.findShortestPath(currentPoint.id, room.id)
				if (route.length > 1) {
					var nextPoint = roomHandler.getPointById(route[1])
					var coords = nextPoint.getRandomCoordinates();//room.getRandomCoordinates();
					this.moveableEntity.setNewDestination(coords);	
				}
			}
		}
	},

	wanderInRoom: function(room) {
		if (this.isInRoom(room)) {
			if (!this.moveableEntity.isTravelling()) {
				var coords = room.getRandomCoordinates();
				this.moveableEntity.wanderToNewDestination(coords);
			}
		} else {
			goToRoom(room);
		}
	},

	goToItem: function(item) {
		var coords = item.getCoords();
		this.moveableEntity.setNewDestination({
			x: coords.x,
			y: coords.y
		});
	},

	setSpeechBubble: function(text) {
		this.speechBubble = new ItemRenderer()
			.addRect("#FFF", 0, -50,60,20)
			.addText("Reading", "#000", 0, -50)
			.done()
		this.container.addChild(this.speechBubble);

	},

	clearSpeechBubble: function() {

	},

	renderInit: function(map,moveableEntity) {
		this.container = new ItemRenderer()
			.addRect(this.color,-15,-10,30,30)
			.addCircle("#D3AF8E",0,-10,10).done();

		//this.setSpeechBubble();

		this.container.x = moveableEntity.x;
		this.container.y = moveableEntity.y;
		personContainer.addChild(this.container)
		//map.setChildIndex(this.container,2);

	}
}