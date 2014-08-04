//function Item(itemPlacer,type,container,room) {
function Item(x,y,type, ip) {
	this.ip = ip;
	this.type = type;
	this.owner = null;

	this.moveableEntity = new MovableEntity(x,y)

	this.container = this.type.createNewContainer();
	this.syncCoords();
	map.addChild(this.container);

	this.lastXChange = 0;
	this.lastYChange = 0;

	this.setListeners();
}

Item.prototype.setListeners = function() {
	this.container.on("mousedown", function(event) {
		console.log("DOWN");
	}.bind(this))

	this.container.on("pressmove", function(event) {
		this.ip.moveItem(this, event);
		console.log("MOVE")
	}.bind(this))

	this.container.on("pressup", function(event) {
		console.log("UP")
	}.bind(this))
}

Item.prototype.getCoords = function() {
	return {
		x: this.moveableEntity.x, y: this.moveableEntity.y
	}
}

Item.prototype.getType = function() {
	return LibraryItems.bookshelf
}

Item.prototype.getRoom = function() {
	return this.moveableEntity.getCurrentRoom();
}

Item.prototype.setNewCoords = function(coords) {
	this.moveableEntity.x = coords.x;
	this.moveableEntity.y = coords.y;
	this.syncCoords();
}

Item.prototype.syncCoords = function() {
	this.container.x = this.moveableEntity.x;
	this.container.y = this.moveableEntity.y;
}
