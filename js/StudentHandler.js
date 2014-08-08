function StudentHandler(map, roomHandler) {
	this.students = [];
	this.firstYears = new StudentGroup();

	for (var i=0; i < 6; i++) {
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