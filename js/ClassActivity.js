function ClassActivity(student) {
	this.description = "Class";
	this.student = student;
	this.state = "IDLE";
} 

ClassActivity.prototype = {
	update: function(dt) {
		switch (this.state) {
			case "IDLE": 
				this.tryGoToClass();
				console.log("IDLE!");
				break;
			case "CLASS":
				console.log("CLASS!");
				break;
		}
	},

	getPriority: function() {
		debugger;
		if (this.student.group.getRoomToBeIn(clock.getTime().hours)) {
			return 200;
		} else {
			return -1;
		}
	},

	tryCancel: function() {
		this.state = "IDLE";
	},

	isComplete: function() {
		return this.state == "IDLE";
	},

	tryGoToClass: function() {
		var room = this.student.group.getRoomToBeIn(clock.getTime().hours);
		if (room != null) {
			this.student.person.goToRoom(room);
		}	
	}
}