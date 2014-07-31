function Teacher(map,x,y) {
	this.person = new Person(map,x,y,1, "blue", "Professor")

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

		emitr.on("timePasses", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}