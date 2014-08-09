function Teacher(map,x,y) {
	this.person = new Person(map,x,y,60, "blue", "Professor")

	this.setListeners();
}

Teacher.prototype = {
	update: function(dt) {
		this.person.update(dt);
	},

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			//Do I now have a room that I need?
		}.bind(this))

		emitr.on("newClock", function(clock) {
			
		}.bind(this));

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

	wanderInRoom: function(room) {
		debugger;
	}
}

Teacher.implements(PersonHood);