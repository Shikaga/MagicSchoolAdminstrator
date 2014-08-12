function Footman(x,y) {
	this.person = new Person(x,y,60, "green", "Footman", this)
	this.setListeners();
}

Footman.prototype = {
	update: function(dt) {
		this.person.update(dt);
	},

	setListeners: function() {
		emitr.on("minutesPass", function(dt) {
			this.update(dt);
		}.bind(this))
	},

	isInRoom: function(room) {
		return this.person.isInRoom(room);
	},
	goToRoom: function(room) {
		this.person.goToRoom(room);
	},
	goToItem: function(item, callback) {
		this.person.goToItem(item, callback);
	},
	occupyItem: function(item) {
		this.person.occupyItem(item);
	},
	getRoomIn: function() {
		return this.person.getRoomIn();
	},
	getName: function() {
		return this.person.name;
	},
	pickupItem: function(item, callback) {
		this.person.pickupItem(item, callback);
	},
	wanderInRoom: function(room) {
		this.person.wanderInRoom(room);
	},
	dropItem: function(item) {
		this.person.dropItem(item);
	},
	acquireItem: function() {
		debugger
	},
	getCoords: function() {
		return this.person.getCoords();
	},

	goToCoords: function(coords, callback) {
		return this.person.goToCoords(coords, callback);
	}
}

Footman.implements(ItemHolder);
Footman.implements(PersonHood);