function ClassActivity(student) {
	this.description = "Class";
	this.student = student;
	this.state = "IDLE";

	this.classroom = null;
} 

ClassActivity.prototype = {
	update: function(dt) {
		switch (this.state) {
			case "IDLE": 
				this.tryGoToClass();
				console.log("IDLE!");
				break;
			case "GOING TO CLASSROOM":
				this.goToClassRoom();
				break;
			case "GOING TO DESK":
				this.goToDesk();
				break;
			case "CLASS":
				console.log("CLASS!");
				break;
		}
	},

	getPriority: function() {
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

	goToClassRoom: function() {
		if (this.student.person.isInRoom(this.classroom)) {
			this.goToDesk();
		} else {
			this.student.person.goToRoom(this.classroom);
		}	
	},

	goToDesk: function() {
		this.state = "GOING TO DESK";
		if (this.student.occupiedItem) {
			//Do nothing
		} else {
			var desk = roomHandler.getFreeItem('desk');
			if (desk && desk.owner == null) {
				this.student.person.goToItem(desk)
				desk.owner = this.student;
				this.student.occupiedItem = desk;
			} else {
				console.log("Cannot go to desk")
			}
		}
	},

	tryGoToClass: function() {
		if (this.classroom == null) {
			this.classroom = this.student.group.getRoomToBeIn(clock.getTime().hours);
		}

		if (this.classroom) {
			if (this.student.person.isInRoom(this.classroom)) {
				this.goToDesk();
			} else {
				this.state = "GOING TO CLASSROOM";
				this.goToClassRoom();
			}
		} else {
			console.log("I don't have a classroom to go to");
		}
	}
}


ClassActivity.implements(Activity);