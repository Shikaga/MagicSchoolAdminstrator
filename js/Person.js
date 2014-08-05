function Person(map,x,y,speed, color, type) {
	this.moveableEntity = new MovableEntity(x,y,speed);

	this.type = type;
	this.name = chance.first() + " " + chance.last();
	this.color = color;

	this.renderInit(map, this.moveableEntity);
}

Person.prototype = {
	update: function(dt) {
		this.moveableEntity.update(dt);
		this.render();
	},

	render: function() {
		this.container.x = this.moveableEntity.x;
		this.container.y = this.moveableEntity.y;
	},

	getRoomTypeIn: function() {
		return roomHandler.getRoomTypeIn({x: this.moveableEntity.x, y: this.moveableEntity.y})
	},

	goToRoom: function(room) {
		if (room != null) {
			var coords = room.getRandomCoordinates();
			this.moveableEntity.setNewDestination(coords);
		}
	},

	goToItem: function(item) {
		var coords = item.getCoords();
		this.moveableEntity.setNewDestination({
			x: coords.x,
			y: coords.y
		});
	},

	setSpeechBubble: function(text) {
		this.speechBubble = new ItemRenderer()
			.addRect("#FFF", 0, -50,60,20)
			.addText("Reading", "#000", 0, -50)
			.done()
		this.container.addChild(this.speechBubble);

	},

	clearSpeechBubble: function() {

	},

	renderInit: function(map,moveableEntity) {
		this.container = new ItemRenderer()
			.addRect(this.color,-15,-10,30,30)
			.addCircle("#D3AF8E",0,-10,10)
			.on("click", function(evt) {
			emitr.trigger("studentSelected", {container: this});
		}.bind(this)).done();

		//this.setSpeechBubble();

		this.container.x = moveableEntity.x;
		this.container.y = moveableEntity.y;
		personContainer.addChild(this.container)
		//map.setChildIndex(this.container,2);

	}
}