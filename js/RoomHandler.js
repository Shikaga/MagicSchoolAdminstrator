function RoomHandler() {
	this.rooms = [];
	this.doors = [];
	this.op = new ItemPlacer();

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

	this.adjacentRooms = [];
}

RoomHandler.prototype = {
	createRoom: function(x,y,width,height,typeString,editable) {
		if (typeString == null) typeString = "empty";
		var room = new Room(map,this.op,x,y,width,height).setType(RoomTypes[typeString])
		if (editable == false) {
			room.editable = false;
		}
		return room;
	},

	createAndAddRoom: function(x,y,typeString,editable) {
		var room = this.createRoom(x,y,200,200,typeString,editable);
		this.addRoom(room);
		return room;
	}, 

	areRoomsAdjacent: function(room1, room2) {
		function leftRightAdjacent() {
			return (room1.width+room1.x == room2.x || room1.x == room2.width+room2.x);
		}
		function leftRightOverlap() {
			if (room1.y > room2.y && room1.y < room2.y + room2.height) {
				return true;
			}
			if (room1.y+room1.height > room2.y && room1.y < room2.y + room2.height) {
				return true;
			}
			return false;
		}
		function topBottomAdjacent() {
			return (room1.y == room2.height+room2.y || room1.y+room1.height == room2.y);
		}
		function topBottomOverlap() {
			if (room1.x+room1.width > room2.x && room1.x < room2.x + room2.width) {
				return true;
			}
			if (room1.x+room1.width > room2.x && room1.x + room1.width <= room2.x + room2.width) {
				return true;
			}
			return false;
		}
		if (leftRightAdjacent() && leftRightOverlap()) {
			return true;
		} else if (topBottomAdjacent() && topBottomOverlap()) {
			return true;
		}
		return false;
	},

	getSharedBorder: function(rooms) {
		if (this.areRoomsAdjacent(rooms.room1, rooms.room2)) {
			function leftRightAdjacent() {
				return (rooms.room1.width+rooms.room1.x == rooms.room2.x || rooms.room1.x == rooms.room2.width+rooms.room2.x);
			}
			function topBottomAdjacent() {
				return (rooms.room1.y == rooms.room2.height+rooms.room2.y || rooms.room1.y+rooms.room1.height == rooms.room2.y);
			}
			if (leftRightAdjacent()) {
				var topY = Math.max(rooms.room1.y, rooms.room2.y);
				var bottomY = Math.min(rooms.room1.y + rooms.room1.height, rooms.room2.y + rooms.room2.height);
				var side = Math.min(rooms.room1.x + rooms.room1.width, rooms.room2.x + rooms.room2.width);
				return [{x: side, y: topY}, {x: side, y: bottomY}];
			}
			if (topBottomAdjacent()) {
				var leftX = Math.max(rooms.room1.x, rooms.room2.x);
				var rightX = Math.min(rooms.room1.x + rooms.room1.width, rooms.room2.x + rooms.room2.width);
				var side = Math.min(rooms.room1.y + rooms.room1.height, rooms.room2.y + rooms.room2.height);
				return [{x: leftX, y: side}, {x: rightX, y: side}];
			}
		}
		return null;
	},

	addRoom: function(addRoom) {
		this.rooms.forEach(function(room) {
			if (this.areRoomsAdjacent(room, addRoom)) {
				this.adjacentRooms.push({room1: room, room2: addRoom});
			}
		}.bind(this));
		this.rooms.push(addRoom);
	},

	getAdjacentRooms: function() {
		return this.adjacentRooms;
	},

	calculateDoorMap: function() {
		var allMap = {}
		this.rooms.forEach(function(room) {
			var roomMap = {};
			room.doors.forEach(function(door) {
				doorMap = {};
				doorMap[door.roomPair.room1.id] = 1;
				doorMap[door.roomPair.room2.id] = 1;
				allMap[door.id] = doorMap;

				roomMap[door.id] = 1;
			})
			allMap[room.id] = roomMap;
		})
		var graph = new Graph(allMap);
		return graph;
	},

	getDoorMap: function() {
		return this.doorMap;
	},

	identifyAdjacentRoomsAndAddDoors: function() {
		var adjacentRoomsList = this.getAdjacentRooms();
		adjacentRoomsList.forEach(function(adjacentRooms) {
			var sharedBorder = this.getSharedBorder(adjacentRooms);
			var centre = {
				x: (sharedBorder[0].x + sharedBorder[1].x) / 2,
				y: (sharedBorder[0].y + sharedBorder[1].y) / 2
			}
			if (centre.x == -500) {
				debugger;
			}
			var door = this.addNewDoorBetweenAt(adjacentRooms, centre);
			adjacentRooms.room1.doors.push(door);
			adjacentRooms.room2.doors.push(door);
		}.bind(this))
		this.doorMap = this.calculateDoorMap();
	},

	addNewDoorBetweenAt: function(roomPair, coords) {
		var door = new Door(roomPair,coords);
		this.doors.push(door);
		return door;
	},

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
	getDoorNear: function(coords) {
		for (var i=0; i < this.doors.length; i++) {
			var door = this.doors[i];
			var distance = Math.sqrt((door.coords.x - coords.x) * (door.coords.x - coords.x) + (door.coords.y - coords.y) * (door.coords.y - coords.y))
			if (distance < 20) {
				return door;
			}
		};
		return null;
	},
	getPointById: function(id) {
		for (var i=0; i < this.doors.length; i++) {
			if (this.doors[i].id == id) {
				return this.doors[i];
			}
		}
		for (var i=0; i < this.rooms.length; i++) {
			if (this.rooms[i].id == id) {
				return this.rooms[i];
			}
		}
	},
	getLocationNear: function(coords) {
		var door = this.getDoorNear(coords);
		if (door) {
			return door;
		} else {
			return this.getRoomIn(coords);
		}
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