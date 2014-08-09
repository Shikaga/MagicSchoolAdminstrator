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
		var lesson = this.syllabus.timetable[hour];
		var room;
		if (lesson.type == "lesson") {
			room = roomHandler.getRoom("classroom")
		} else if (lesson == "freetime") {
			//room = roomHandler.getRoom("dorm")
		}
		return room;
	},

	getCurrentActivity: function(hour) {
		return this.syllabus.timetable[hour];
	}
}
