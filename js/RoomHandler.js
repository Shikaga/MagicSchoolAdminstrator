function RoomHandler(map) {
	this.rooms = [];

	var entranceHall = new Room(map,100,100,200,200).setType("entrancehall")
	entranceHall.editable = false;
	this.rooms.push(entranceHall);

	var rightRoom = new Room(map,300,100,200,200).setType("classroom");
	this.rooms.push(rightRoom);

	var leftRoom = new Room(map,-100,100,200,200).setType("dorm");
	this.rooms.push(leftRoom);

	var rightRoom2 = new Room(map,300,-100,200,200);
	this.rooms.push(rightRoom2);

	var leftRoom2 = new Room(map,-100,-100,200,200);
	this.rooms.push(leftRoom2);

	var hall1 = new Room(map,100,-100,200,200).setType("entrancehall")
	hall1.editable = false;
	this.rooms.push(hall1);

	var hall2 = new Room(map,100,-300,200,200).setType("entrancehall")
	hall2.editable = false;
	this.rooms.push(hall2);

	this.rooms.push(new Room(map,100,-500,200,200));

	var leftWingHall1 = new Room(map,-100,-300,200,200).setType("entrancehall")
	leftWingHall1.editable = false;
	this.rooms.push(leftWingHall1);

	var leftWingHall2 = new Room(map,-300,-300,200,200).setType("entrancehall")
	leftWingHall1.editable = false;
	this.rooms.push(leftWingHall1);

	this.rooms.push(new Room(map,-300,-100,200,200));
	this.rooms.push(new Room(map,-500,-100,200,200));
	this.rooms.push(new Room(map,-500,-300,200,200));
	this.rooms.push(new Room(map,-500,-500,200,200));
	this.rooms.push(new Room(map,-300,-500,200,200));
	this.rooms.push(new Room(map,-100,-500,200,200));

	var rightWingHall1 = new Room(map,300,-300,200,200).setType("entrancehall")
	rightWingHall1.editable = false;
	this.rooms.push(rightWingHall1);

	var rightWingHall2 = new Room(map,500,-300,200,200).setType("entrancehall")
	rightWingHall2.editable = false;
	this.rooms.push(rightWingHall2);

	this.rooms.push(new Room(map,500,-100,200,200));
	this.rooms.push(new Room(map,700,-100,200,200));
	this.rooms.push(new Room(map,700,-300,200,200));
	this.rooms.push(new Room(map,700,-500,200,200));
	this.rooms.push(new Room(map,500,-500,200,200));
	this.rooms.push(new Room(map,300,-500,200,200));

	emitr.on("editRooms", function() {
		//emitr.trigger("pauseClock");
		this.rooms.forEach(function(room) {
			room.enableEdit();
		})
	}.bind(this))
	emitr.on("editRoom", function(data) {
		this.rooms.forEach(function(room) {
			room.disableEdit();
		})
		data.room.enableSelected();
	}.bind(this))

	this.spawnRoom = entranceHall;
}

RoomHandler.prototype = {
	getRoom: function(type) {
		for (var i=0; i < this.rooms.length; i++) {
			if (this.rooms[i].type == type) {
				return this.rooms[i];
			}
		}
	}
}