function Student(map,x,y) {
	this.person = new Person(map,x,y,1, "red", "Student")

	this.dorm = null;
	this.group = null;
	this.currentActivity = null;
	this.bed = null;

	this.setListeners();
}

Student.prototype = {
	update: function(dt) {
		this.person.update(dt);
	},

	setGroup: function(group) {
		this.group = group;
	},

	goToBed: function() {
		if (this.bed == null) {
			this.findBed();
		} 
		if (this.bed !== null) {
			this.person.goToItem(this.bed);
		} else {
			console.log("There is no bed to go to!");
		}
	},

	findBed: function() {
		var bed = roomHandler.getFreeBed();
		if (bed == null) {
			console.log("I can't find a bed!")
		} else {
			this.bed = bed;
			this.bed.owner = this;
		}
	},

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			//Do I now have a room that I need?
		}.bind(this))

		emitr.on("newClock", function(clock) {
			var hour = Number.parseFloat(clock.split(":")[0]);
			var activity = this.group.getCurrentActivity(hour);
			//if (activity !== this.currentActivity) {
				//New Activity!
			//	this.currentActivity = activity;
			if (activity == "freetime") {
				this.goToBed();
			} else if (activity == "class") {
				var room = this.group.getRoomToBeIn(hour);
				if (room != null) {
					this.person.goToRoom(room);
				}	
			}
			//}
			//
		}.bind(this));

		emitr.on("timePasses", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}