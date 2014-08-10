function Teacher(x,y) {
	this.person = new Person(x,y,60, "blue", "Professor")

	this.setListeners();
}

Teacher.prototype = {
	update: function(dt) {
		this.person.update(dt);
	},

	setListeners: function() {
		emitr.on("minutesPass", function(dt) {
			this.update(dt);
		}.bind(this))
	},

	goToItem: function(item) {
		debugger;
	},

	occupyItem: function(item) {
		debugger;
	},

	goToRoom: function(room) {
		this.person.goToRoom(room);
	},

	isInRoom: function(room) {
		return this.person.isInRoom(room);
	},

	getName: function(room) {
		return this.person.name;
	},

	getRoomIn: function() {
		debugger;
	},

	wanderInRoom: function(room) {
		debugger;
	},

	pickupItem: function() {
		debugger;
	}
}

Teacher.implements(PersonHood);