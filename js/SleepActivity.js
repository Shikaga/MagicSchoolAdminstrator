function SleepActivity(student) {
	this.description = "Sleep";
	this.student = student;
	this.state = "IDLE";
} 

SleepActivity.prototype = {

	update: function(dt) {
		switch (this.state) {
			case "IDLE": 
				console.log("IDLE!")
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
		debugger;
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
			this.student.person.goToItem(this.student.bed);
		} else {
			//console.log("There is no bed to go to!");
		}
	},

	findBed: function() {
		var bed = roomHandler.getFreeBed();
		if (bed == null) {
			console.log("I can't find a bed!")
		} else {
			this.student.bed = bed;
			this.student.bed.owner = this.student;
		}
	}
}