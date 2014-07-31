function RoomHandler(map) {
	this.rooms = [];

	var entranceHall = new Room(map,100,100,200,200).setType("entrancehall")
	entranceHall.editable = false;
	this.rooms.push(entranceHall);

	var rightRoom = new Room(map,300,100,200,200);
	this.rooms.push(rightRoom);

	var leftRoom = new Room(map,-100,100,200,200);
	this.rooms.push(leftRoom);

	emitr.on("editRooms", function() {
		emitr.trigger("pauseClock");
		this.rooms.forEach(function(room) {
			room.enableEdit();
		})
	}.bind(this))
	emitr.on("editRoomsComplete", function() {
		emitr.trigger("resumeClock");
		this.rooms.forEach(function(room) {
			room.disableEdit();
		})
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