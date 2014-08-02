function RoomHandler(map) {
	this.rooms = [];

	var op = new ItemPlacer();

	var createRoom = function(x,y,typeString,editable) {
		if (typeString == null) typeString = "empty";
		var room = new Room(map,op,x,y,200,200).setType(RoomTypes[typeString])
		if (editable == false) {
			room.editable = false;
		}
		return room;
	}.bind(this)

	var createAndAddRoom = function(x,y,typeString,editable) {
		var room = createRoom(x,y,typeString,editable);
		this.rooms.push(room);
		return room;
	}.bind(this)

	var entranceHall = createAndAddRoom(100,100,"entrancehall", false);
	createAndAddRoom(300,100,"classroom");
	createAndAddRoom(-100,100,"dorm");
	createAndAddRoom(300,-100,"classroom");

	createAndAddRoom(-100,-100);

	createAndAddRoom(100,-100,"entrancehall", false);
	createAndAddRoom(100,-300,"entrancehall", false);
	createAndAddRoom(-100,-300,"entrancehall", false);
	createAndAddRoom(-300,-300,"entrancehall", false);
	createAndAddRoom(300,-300,"entrancehall", false);
	createAndAddRoom(500,-300,"entrancehall", false);

	createAndAddRoom(100,-500);


	createAndAddRoom(-300,-100);
	createAndAddRoom(-500,-100);
	createAndAddRoom(-500,-300);
	createAndAddRoom(-500,-500);
	createAndAddRoom(-300,-500);
	createAndAddRoom(-100,-500);

	createAndAddRoom(500,-100);
	createAndAddRoom(700,-100);
	createAndAddRoom(700,-300);
	createAndAddRoom(700,-500);
	createAndAddRoom(500,-500);
	createAndAddRoom(300,-500);

	emitr.on("editRooms", function() {
		this.rooms.forEach(function(room) {
			room.enableEdit();
		})
	}.bind(this))
	emitr.on("selectRoom", function(data) {
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
	},
	getFreeBed: function() {
		for (var i=0; i < this.rooms.length; i++) {
			var room = this.rooms[i];
			for (var j=0; j < room.items.length; j++) {
				var item = room.items[j];
				if (item.name == "Bed" && item.owner == null) {
					return item;
				}
			}
		}
	}
}