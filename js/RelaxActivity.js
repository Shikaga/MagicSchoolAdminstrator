function RelaxActivity(student) {
	this.description = "Relax";
	this.student = student;
	this.state = "IDLE";

	this.maxStandTime = 5;
	this.timeStanding = 0;
	this.intertia = 0;
}

RelaxActivity.prototype.update = function(dt) {
	switch (this.state) {
		case "IDLE": 
			console.log("IDLE!")
			this.intertia = 30;
			this.tryRelax(dt);
			break;
		case "STAND":
			this.student.drive += dt/5;
			this.intertia -= dt;
			break;
	}
}

RelaxActivity.prototype.tryRelax = function(dt) {
	this.timeStanding = dt;
	this.state = "STAND";
}

RelaxActivity.prototype.getPriority = function() {
	return 20 + this.intertia;
}

RelaxActivity.prototype.tryCancel = function() {
	this.state = "IDLE";
	this.intertia = 0;
}


RelaxActivity.prototype.isComplete = function() {
	return this.state == "IDLE";
}

RelaxActivity.implements(Activity);