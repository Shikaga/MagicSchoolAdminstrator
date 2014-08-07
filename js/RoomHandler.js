function RoomHandler(map) {
	this.rooms = [];

	var op = new ItemPlacer();

	var createRoom = function(x,y,width,height,typeString,editable) {
		if (typeString == null) typeString = "empty";
		var room = new Room(map,op,x,y,width,height).setType(RoomTypes[typeString])
		if (editable == false) {
			room.editable = false;
		}
		return room;
	}.bind(this)

	var createAndAddRoom = function(x,y,typeString,editable) {
		var room = createRoom(x,y,200,200,typeString,editable);
		this.rooms.push(room);
		return room;
	}.bind(this)

	var entranceHall = createRoom(100,-100,200,400, "entrancehall");
	this.rooms.push(entranceHall);
	this.rooms.push(createRoom(-300,-300,1000,200, "entrancehall"));

	createAndAddRoom(300,100,"classroom");
	createAndAddRoom(-100,100,"dorm");
	createAndAddRoom(300,-100,"classroom");

	createAndAddRoom(-100,-100, "library");
	this.rooms[5].op.setRoom(this.rooms[5]);

	this.rooms[5].op.itemTypeSelected = LibraryItems.bookshelf;
	this.rooms[5].op.newItem(0,100);
	this.rooms[5].op.itemPlaced();

	this.rooms[5].op.itemTypeSelected = LibraryItems.chair;
	this.rooms[5].op.newItem(100,100);
	this.rooms[5].op.itemPlaced();

	this.rooms[5].op.itemTypeSelected = LibraryItems.chair;
	this.rooms[5].op.newItem(150,100);
	this.rooms[5].op.itemPlaced();

	this.rooms[5].op.itemTypeSelected = LibraryItems.chair;
	this.rooms[5].op.newItem(100,150);
	this.rooms[5].op.itemPlaced();

	this.rooms[5].op.clearRoom();


	//createAndAddRoom(100,-300,"entrancehall", false);
	//createAndAddRoom(-100,-300,"entrancehall", false);
	//createAndAddRoom(-300,-300,"entrancehall", false);
	//createAndAddRoom(300,-300,"entrancehall", false);
	//createAndAddRoom(500,-300,"entrancehall", false);

	createAndAddRoom(100,-500);

	createAndAddRoom(-300,-100);
	this.rooms.push(createRoom(-500,-500,200,600));
	createAndAddRoom(-300,-500);
	createAndAddRoom(-100,-500);

	createAndAddRoom(500,-100);

	this.rooms.push(createRoom(700,-500,200,600));
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
	getRoom: function(typeId) {
		for (var i=0; i < this.rooms.length; i++) {
			if (this.rooms[i].type.id == typeId) {
				return this.rooms[i];
			}
		}
	},
	getRoomTypeIn: function(coords) {
		var room = this.getRoomIn(coords);
		if (room) return room.type;
	},
	getRoomIn: function(coords) {
		for (var i=0; i < this.rooms.length; i++) {
			var room = this.rooms[i];
			if (room.containsCoords(coords)) {
				return room;
			}
		}
	},
	getFreeBed: function() {
		return this.getFreeItem('bed');
	},
	getBookshelf: function() {
		return this.getItem('bookshelf');
	},
	getChair: function() {
		return this.getFreeItem('chair');
	},
	getItem: function(itemId) {
		for (var i=0; i < this.rooms.length; i++) {
			var room = this.rooms[i];
			for (var j=0; j < room.items.length; j++) {
				var item = room.items[j];
				if (item.type.id == itemId) {
					return item;
				}
			}
		}
	},
	getFreeItem: function(itemId) {
		for (var i=0; i < this.rooms.length; i++) {
			var room = this.rooms[i];
			for (var j=0; j < room.items.length; j++) {
				var item = room.items[j];
				if (item.type.id == itemId && item.owner == null) {
					return item;
				}
			}
		}
	}
}