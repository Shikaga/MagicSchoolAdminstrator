ItemRender = function(text) {
	this.container = new createjs.Container();
	this.addText(text);
}

ItemRender.prototype = {
	addCircle: function(color,x,y,radius) {
		var shape = new createjs.Shape();
		this.container.addChild(shape);
		shape.graphics.beginFill(color).drawCircle(x,y,radius)
		return this;
	},
	addRect: function(color,x,y,width,height) {
		var shape = new createjs.Shape();
		this.container.addChild(shape);
		shape.graphics.beginFill(color).drawRect(x,y,width,height);
		return this;
	},
	addText: function(text) {
		var text = new createjs.Text(text, "16px Arial", "#FFF")
		this.container.addChild(text);
		text.x = 20;
		text.y = -10;
		return this;
	},
	done: function() {
		return this.container;
	}
}

DormItems = {
	"bed": {
		name: "Bed",
		owner: null,
		getContainer: function() {
			return new ItemRender(this.name).addRect('#000',0,0,30,60).done()
		}
	}
}