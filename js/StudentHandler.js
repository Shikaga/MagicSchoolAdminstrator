function StudentHandler(roomHandler) {
	this.students = [];
	this.firstYears = new StudentGroup();

	for (var i=0; i < 6; i++) {
		this.addStudent();
	}

	emitr.on("addStudent", function() {
		this.addStudent();
	}.bind(this))

	emitr.on("newDay", function() {
		this.addStudent();
		this.addStudent();
	}.bind(this))

}

StudentHandler.prototype = {
	addStudent: function() {
		var coord = roomHandler.spawnRoom.getRandomCoordinates();
		var student = new Student(coord.x,coord.y);
		this.firstYears.addStudent(student);
		this.students.push(student);
	}
}