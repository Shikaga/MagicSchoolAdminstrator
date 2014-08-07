function ItemPlacer(room) {
	
}

ItemPlacer.prototype.setRoom = function(room) {
	console.log("!!!");
	this.clearListeners();
	this.room = room;

	this.gridSize = 20;

	this.itemTypes = room.type.items;
	this.itemTypeSelected = room.type.items[Object.keys(room.type.items)[0]];

	this.pressmove = this.room.container.on("pressmove", function(event) {
		console.log("@@@")
		this.move(event.localX, event.localY);
	}.bind(this))

	this.mousedown = this.room.container.on("mousedown", function(event) {
		this.newItem(event.localX, event.localY);
	}.bind(this))

	this.pressup = this.room.container.on("pressup", function(event) {
		this.itemPlaced(event.localX, event.localY);
	}.bind(this))


	emitr.on("itemMouseDown", function(item) {
		this.item = item;
	}.bind(this));
}

ItemPlacer.prototype.clearRoom = function() {
	this.clearListeners();
}

ItemPlacer.prototype.clearListeners = function() {
	if (this.room) {
		this.room.container.off("mousedown", this.mousedown);
		this.room.container.off("pressmove", this.pressmove);
		this.room.container.off("pressup", this.pressup);
	}
}

ItemPlacer.prototype.getGridPosition = function(room, x,y) {
	x = Math.max(x,20); x = Math.min(x,room.width-20);
	y = Math.max(y,20); y = Math.min(y,room.height-20);
	var xGrid = Math.round(x / this.gridSize) * this.gridSize;
	var yGrid = Math.round(y / this.gridSize) * this.gridSize;
	return {x: xGrid, y: yGrid};
}

ItemPlacer.prototype.moveItem = function(item, event) {
	console.log(event.localX, event.localY)
	var room = roomHandler.getRoomIn({x: item.moveableEntity.x, y: item.moveableEntity.y});
	this.setRoom(room);
	var coords = this.getGridPosition(room, item.moveableEntity.x + event.localX - room.x, 
		item.moveableEntity.y + event.localY - room.y)
	console.log(coords);
	console.log(room.x, room.y)
	item.moveableEntity.x = coords.x + room.x;
	item.moveableEntity.y = coords.y + room.y;
	item.syncCoords();
}

ItemPlacer.prototype.move = function(x,y) {
	var legalCoords = this.getGridPosition(this.room,x,y);
	if (legalCoords) {
		legalCoords.x += this.room.x;
		legalCoords.y += this.room.y;
		if (this.item) {
			this.item.setNewCoords(legalCoords);
		}
	}
}

ItemPlacer.prototype.newItem = function(x,y) {
	if (this.item == null && this.itemTypeSelected) {
		console.log("Placing ", this.itemTypeSelected);
		var legalCoords = this.getGridPosition(this.room,x,y)
		if (legalCoords) {
			this.item = new Item(legalCoords.x + this.room.x, 
				legalCoords.y + this.room.y, 
				this.itemTypeSelected, this);
			this.room.addItem(this.item);
		}
	}
}

ItemPlacer.prototype.itemPlaced = function(x,y) {
	if (this.item) {
		this.item = null;
	}
}