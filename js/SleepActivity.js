function SleepActivity(student) {
	this.description = "Sleep";
	this.student = student;
	this.state = "IDLE";
} 

SleepActivity.prototype = {

	update: function(dt) {
		switch (this.state) {
			case "IDLE": 
				this.trySleep(dt);
				break;
			case "SLEEP":
				this.student.drive += dt/5;
				this.intertia -= dt;
				break;
		}
	},

	trySleep: function(dt) {
		this.goToBed();
	},

	getPriority: function() {
		var time = clock.getTime();
		if (time.hours > 21 || time.hours < 5) {
			return 100;
		} else {
			return -1;
		}
	},

	tryCancel: function() {
		this.state = "IDLE";
		this.intertia = 0;
	},

	isComplete: function() {
		return this.state == "IDLE";
	},

	goToBed: function() {
		if (this.student.bed == null) {
			this.findBed();
		} 
		if (this.student.bed != null) {
			this.student.occupyItem(this.student.bed);
		} else {
			//console.log("There is no bed to go to!");
		}
	},

	findBed: function() {
		var bed = roomHandler.getFreeBed();
		if (bed == null) {
		} else {
			this.student.bed = bed;
			this.student.bed.owner = this.student;
		}
	}
}

SleepActivity.implements(Activity);