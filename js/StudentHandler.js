function StudentHandler(map, roomHandler) {
	this.students = [];
	for (var i=0; i < 6; i++) {
		var coord = roomHandler.spawnRoom.getRandomCoordinate();
		var student = new Student(map,coord.x,coord.y);

		this.students.push(student);
	}

}

StudentHandler.prototype = {
	update: function(dt) {
		this.students.forEach(function(student) {
			student.update(dt);
		})
	}
}