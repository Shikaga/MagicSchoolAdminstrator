	function Person(x,y,speed, color, type, owner) {
	this.owner = owner;
	this.moveableEntity = new MovableEntity(x,y,speed,speed/3);

	this.type = type;
	this.name = chance.first() + " " + chance.last();
	this.color = color;

	this.itemToGoTo = null;

	this.state = "IDLE";

	this.items = [];

	this.renderInit(map, this.moveableEntity);
}

Person.prototype = {
	update: function(dt) {

		if (this.state == "GO TO ITEM") {
			this.goToItem(this.itemToGoTo);
		}

		this.moveableEntity.update(dt);
		this.render();
	},

	render: function() {
		this.container.x = this.moveableEntity.coords.x;
		this.container.y = this.moveableEntity.coords.y;
		this.items.forEach(function(item) {
			item.setNewCoords({
				x: this.container.x + 30,
				y: this.container.y + 30
			})
		}.bind(this))
	},

	getCoords: function() {
		return this.moveableEntity.getCoords();
	},

	isInRoom: function(room) {
		return room.containsCoords(this.moveableEntity.getCoords())
	},

	getRoomIn: function() {
		return roomHandler.getRoomIn(this.moveableEntity.coords)
	},

	getRoomTypeIn: function() {
		return roomHandler.getRoomTypeIn(this.moveableEntity.coords)
	},

	teleportTo: function(coords) {
		this.moveableEntity.setNewCoords(coords)
	},

	goToRoom: function(room) {
		this.moveableEntity.goToRoom(room);
	},

	goToCoords: function(coords) {
		this.moveableEntity.setNewDestination(coords);
	},

	stop: function() {
		this.moveableEntity.stop();
	},

	wanderInRoom: function(room) {
		if (this.isInRoom(room)) {
		//	if (!this.moveableEntity.isTravelling()) {
		//		var coords = room.getRandomCoordinates();
				this.moveableEntity.wanderInRoom(room);
			// }
		} else {
			this.goToRoom(room);
		}
	},

	goToItem: function(item) {
		this.itemToGoTo = item;
		var coords = item.getCoords();
		this.moveableEntity.setNewDestination({
			x: coords.x,
			y: coords.y
		});
	},

	pickupItem: function(item) {
		this.goToItem(item);
		this.state = "GO TO ITEM";
	},

	setSpeechBubble: function(text) {
		this.speechBubble = new ItemRenderer()
			.addRect("#FFF", 0, -50,60,20)
			.addText("Reading", "#000", 0, -50)
			.done()
		this.container.addChild(this.speechBubble);
	},

	isTravelling: function() {
		return this.moveableEntity.isTravelling();
	},

	clearSpeechBubble: function() {

	},

	renderInit: function(map,moveableEntity) {
		this.container = new ItemRenderer()
			.addRect(this.color,-15,-10,30,30)
			.addCircle("#D3AF8E",0,-10,10).done();

		//this.setSpeechBubble();

		this.container.x = moveableEntity.coords.x;
		this.container.y = moveableEntity.coords.y;
		personContainer.addChild(this.container)
		//map.setChildIndex(this.container,2);

	}
}