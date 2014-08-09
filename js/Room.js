function Room(map,objectPlacer,x,y,width,height) {
	this.op = objectPlacer;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.type = RoomTypes.empty;
	this.renderInit(map,x,y,width,height);
	this.editable = true;
	this.state = "normal";

	this.items = [];


	this.render();
}

Room.prototype = {
	enableEdit: function() {
		if (this.editable) {
			this.editButton.visible = true;
		}
	},

	addItem: function(item) {
		this.items.push(item);
	},

	containsCoords: function(coords) {
		if (coords.x < this.x) return false;
		if (coords.x > this.x + this.width) return false;
		if (coords.y < this.y) return false;
		if (coords.y > this.y + this.height) return false;
		return true;
	},

	getRandomCoordinates: function() {
		return {
			x: Math.random() * (this.width-50) + this.x + 25,
			y: Math.random() * (this.height-50) + this.y + 25
		}
	},

	disableEdit: function() {
		this.editButton.visible = false;
	},

	enableSelected: function() {
		this.op.setRoom(this);
		this.state = "selected";
		this.render();
		emitr.trigger("editRoom", {room:this})
	},

	disableSelected: function() {
		this.op.clearRoom();
		this.state = "normal";
		this.render();
	},

	setType: function(type) {
		this.type = type;
		this.setTypeColor();
		this.render();
		emitr.trigger("newRoom", {
			room: this
		})
		this.op.setRoom(this);
		return this;
	},

	setTypeColor: function() {
		this.square.graphics.beginFill(this.type.backgroundColor).drawRect(0,0,this.width,this.height);
		this.square.graphics.beginFill(this.type.foregroundColor).drawRect(5,5,this.width-10,this.height-10);
	},

	render: function() {
		switch (this.state) {
			case "normal":
				this.roomTypeText.text = this.type.name;
				break;
			case "selected":
				this.roomTypeText.text = "Edit " + this.type.name;
				break;
		}
		this.editText.text = "Edit " + this.type.name;
	},

	renderInit: function(map,x,y,width,height) {
		this.container = new createjs.Container();
		this.container.x = x;
		this.container.y = y;
		roomContainer.addChild(this.container);

		this.square = new createjs.Shape();
		this.setTypeColor();
		this.container.addChild(this.square);


		this.roomTypeText = new createjs.Text(null, "16px Arial", "#FFF");
		this.roomTypeText.x = 30;
		this.roomTypeText.y = 30;
		this.container.addChild(this.roomTypeText);

		this.editButton = new createjs.Container();
		var editRectangle = new createjs.Shape();
		editRectangle.graphics.beginFill("#333").drawRect(20,20,width-40,height-40);
		this.editText = new createjs.Text(null, "16px Arial", "#FFF");
		this.editText.x = 30;
		this.editText.y = 30;
		this.editButton.addChild(editRectangle);
		this.editButton.addChild(this.editText);
		this.container.addChild(this.editButton);
		this.editButton.visible = false;
		this.editButton.on("click", function(event) {
			emitr.trigger("selectRoom", {room:this});
		}.bind(this))
	},

	dropItem: function(dropItem) {
		this.items = this.items.filter(function(item) {return item !== dropItem})
	},

	acquireItem: function(item) {
		debugger;
	}
}


Room.implements(ItemHolder);