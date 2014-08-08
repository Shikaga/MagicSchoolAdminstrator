function ClassActivity(student) {
	this.description = "Class";
	this.student = student;
	this.state = "IDLE";

	this.classroom = null;
	this.teacher = null;
	this.classTime = false;
	lessonOrganiser.registerClassActivity(this);
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
		if (this.classTime) {
			return 200;
		} else {
			return -1;
		}
	},

	tryCancel: function() {
		if (this.student.occupiedItem) {
			this.student.occupiedItem.owner = null;
			this.student.occupiedItem = null;
		}
		this.state = "IDLE";
	},

	isComplete: function() {
		return this.state == "IDLE";
	},

	goToClassRoom: function() {
		if (this.student.isInRoom(this.classroom)) {
			this.goToDesk();
		} else {
			this.student.goToRoom(this.classroom);
		}	
	},

	goToDesk: function() {
		this.state = "GOING TO DESK";
		if (this.student.occupiedItem) {
			//Do nothing
		} else {
			var desk = roomHandler.getFreeItem('desk');
			if (desk && desk.owner == null) {
				this.student.occupyItem(desk);
			} else {
				console.log("Cannot go to desk")
			}
		}
	},

	tryGoToClass: function() {
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