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

	goToRoom: function(room) {
		var coords = room.getRandomCoordinates();
		this.moveableEntity.setNewDestination(coords);
	},

	goToItem: function(item) {
		this.moveableEntity.setNewDestination({
			x: item.room.x + item.container.x,
			y: item.room.y + item.container.y
		});
	},

	renderInit: function(map,moveableEntity) {
		var container = new createjs.Container();
		this.container = container;
		container.x = moveableEntity.x;
		container.y = moveableEntity.y;
		map.addChild(container)

		var circle = new createjs.Shape();
		circle.graphics.beginFill(this.color).drawCircle(0, 0, 10);
		container.addChild(circle);

		var text = new createjs.Text(this.name, "16px Arial", "#000");
		text.x = 15;
		text.y = -8;
		container.addChild(text);

		circle.on("click", function(evt) {
			emitr.trigger("studentSelected", {container: this});
		}.bind(this))
	}
}