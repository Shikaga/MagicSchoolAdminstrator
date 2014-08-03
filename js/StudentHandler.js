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
		if (subject == "class") {
			room = roomHandler.getRoom("classroom")
		} else if (subject == "freetime") {
			room = roomHandler.getRoom("dorm")
		}
		return room;
	},

	getCurrentActivity: function(hour) {
		return this.syllabus.timetable[hour];
	}
}

function StudentHandler(map, roomHandler) {
	this.students = [];
	this.firstYears = new StudentGroup();

	for (var i=0; i < 1; i++) {
		this.addStudent(map);
	}

	emitr.on("addStudent", function() {
		this.addStudent(map);
	}.bind(this))

}

StudentHandler.prototype = {
	addStudent: function(map) {
		var coord = roomHandler.spawnRoom.getRandomCoordinates();
		var student = new Student(map,coord.x,coord.y);
		this.firstYears.addStudent(student);
		this.students.push(student);
	}
}