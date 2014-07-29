function Student(map,x,y) {
	var student = new createjs.Container();
	student.x = x;
	student.y = y;
	map.addChild(student)

	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 10);
	student.addChild(circle);

	var text = new createjs.Text("Student", "16px Arial", "#000");
	text.x = 15;
	text.y = -8;
	student.addChild(text);

	circle.on("click", function(evt) {
		console.log("Student clicked");
	})
}