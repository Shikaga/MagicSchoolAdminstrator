	function Person(x,y,speed, color, type, owner) {
	this.owner = owner;
	this.moveableEntity = new MovableEntity(x,y,speed,speed/3);

	this.type = type;
	this.name = chance.first() + " " + chance.last();
	this.color = color;

	this.itemToGoTo = null;

	this.state = "IDLE";
	this.wanderingRoom = null;

	this.items = [];

	this.renderInit(map, this.moveableEntity);
}

Person.prototype = {
	update: function(dt) {
		this.moveableEntity.update(dt);
		this.moveItems();
		this.render();
	},
	isFree: function() {
		return this.state == "IDLE";
	},
	moveItems: function() {
		this.items.forEach(function(item) {
			item.setNewCoords({
				x: this.moveableEntity.getCoords().x,
				y: this.moveableEntity.getCoords().y
			})
		}.bind(this))
	},

	render: function() {
		this.container.x = this.moveableEntity.coords.x;
		this.container.y = this.moveableEntity.coords.y;
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

	goToCoords: function(coords, callback) {
		this.state = "WALKING"
		this.moveableEntity.setNewDestination(coords, function() {
			this.moveItems()
			if (callback) {
				this.state = "IDLE"
				callback();
			}
		}.bind(this));
	},

	stop: function() {
		this.state = "IDLE";
		this.moveableEntity.stop();
	},

	wanderInRoom: function(room) {
		if (this.state == "WANDERING" && this.wanderingRoom == room) {

		} else {
			this.state = "WANDERING";
			if (this.isInRoom(room)) {
				this.wanderingRoom = room;
				this._wanderInRoom(room);
			} else {
				this.goToRoom(room);
			}
		}
	},

	_wanderInRoom: function(room) {
		this.moveableEntity.wanderInRoom(room, function() {
			this._wanderInRoom(room);
		}.bind(this))
	},

	goToItem: function(item, callback) {
		this.itemToGoTo = item;
		var coords = item.getCoords();
		this.moveableEntity.setNewDestination({
			x: coords.x,
			y: coords.y
		},function() {
			this.moveItems()
			if (callback) {
				callback();
			}
		}.bind(this));
	},

	pickupItem: function(item, callback) {
		item.looseLocation();
		item.gainLocation(this);
		this.items.push(item);
		if (callback) {
			callback();
		}
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

	dropItem: function(dropItem) {
		this.items = this.items.filter(function(item) {return item !== dropItem})
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