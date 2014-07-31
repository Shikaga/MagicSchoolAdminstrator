function Student(map,x,y) {
	this.person = new Person(map,x,y,1, "red", "Student")

	this.dorm = null;
	this.group = null;

	this.setListeners();
}

Student.prototype = {
	update: function(dt) {
		this.person.update(dt);
	},

	setGroup: function(group) {
		this.group = group;
	},

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			//Do I now have a room that I need?
		}.bind(this))

		emitr.on("newClock", function(clock) {
			var hour = Number.parseFloat(clock.split(":")[0]);
			var room = this.group.getRoomToBeIn(hour);
			if (room != null) {
				this.person.goToRoom(room);
			}
		}.bind(this));

		emitr.on("timePasses", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}