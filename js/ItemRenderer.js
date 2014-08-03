function ItemRenderer(text) {
	this.container = new createjs.Container();
	this.clickShapes = [];
	this.events = [];

	if (text) {
		this.addText(text);
	}
}

ItemRenderer .prototype = {
	addCircle: function(color,x,y,radius) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill(color).drawCircle(x,y,radius)
		this.clickShapes.push(shape);

		this.container.addChild(shape);
		return this;
	},
	addRect: function(color,x,y,width,height) {
		var shape = new createjs.Shape();
		shape.graphics.beginFill(color).drawRect(x,y,width,height);
		this.clickShapes.push(shape);

		this.container.addChild(shape);
		return this;
	},
	addText: function(text, color, x, y) {
		if (color == null) {
			color = "#FFF"
		}
		if (x == null) {
			x = 20;
		}
		if (y == null) {
			y = -10;
		}
		var text = new createjs.Text(text, "16px Arial", color)
		this.container.addChild(text);
		text.x = x
		text.y = y
		return this;
	},
	on: function(event, func) {
		this.events.push({
			event: event,
			func: func
		})
		return this;
	},

	done: function() {
		this.events.forEach(function(event) {
			this.clickShapes.forEach(function(shape) {
				shape.on(event.event, event.func);
			})
		}.bind(this))
		return this.container;
	}
}