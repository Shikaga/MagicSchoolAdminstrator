function Student(map,x,y) {
	this.x = x;
	this.y = y;
	this.toX = null;
	this.toY = null;
	this.speed = 1;

	this.dorm = null;
	this.group = null;

	this.name = "RandomName";

	this.setListeners();
	this.renderInit(map, x, y);
}

Student.prototype = {
	update: function(dt) {
		if (this.toX && this.toY && dt > 0) {
            var dx = this.toX - this.x;   
            var dy = this.toY - this.y;
            var distance = Math.sqrt(dx*dx+dy*dy);
            var distanceTravelled = this.speed * dt;

            if (distance < distanceTravelled) {
                this.x = this.toX;
                this.y = this.toY;
                this.toX = null;
                this.toY = null;
                console.log("Student arrived")
            } else {
                this.x += dx/distance * distanceTravelled;
                this.y += dy/distance * distanceTravelled;
            }
        }
        this.student.x = this.x
        this.student.y = this.y;
	},

	setGroup: function(group) {
		this.group = group;
	},

	goToRoom: function(room) {
		var coords = room.getRandomCoordinates();
		this.toX = coords.x;
		this.toY = coords.y;
	},

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			if (data.room.type == "dorm") {
				if (this.dorm === null) {
					this.dorm = data.room;
					this.goToRoom(data.room);
				}				
			}
		}.bind(this))

		emitr.on("newClock", function(clock) {
			var hour = Number.parseFloat(clock.split(":")[0]);
			var room = this.group.getRoomToBeIn(hour);
			if (room != null) {
				this.goToRoom(room);
			}
		}.bind(this));

		emitr.on("timePasses", function(dt) {
			this.update(dt);
		}.bind(this))
	},

	renderInit: function(map,x,y) {
		var student = new createjs.Container();
		this.student = student;
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
			emitr.trigger("studentSelected", {student: this});
		}.bind(this))
	}
}