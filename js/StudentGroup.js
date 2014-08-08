function StudentGroup() {
	this.students = [];
	this.syllabus  = new Timetable();
}

StudentGroup.prototype = {
	addStudent: function(student) {
		this.students.push(student);
		student.setGroup(this);
	},

	getRoomToBeIn: function(hour) {
		var subject = this.syllabus.timetable[hour];
		var room;
		if (subject == "class") {
			room = roomHandler.getRoom("classroom")
		} else if (subject == "freetime") {
			//room = roomHandler.getRoom("dorm")
		}
		return room;
	},

	getCurrentActivity: function(hour) {
		return this.syllabus.timetable[hour];
	}
}
