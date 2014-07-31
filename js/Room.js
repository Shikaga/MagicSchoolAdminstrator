function Room(map,x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.type = "empty";
	this.renderInit(map,x,y,width,height);
	this.editable = true;
	this.render();
}

Room.prototype = {
	enableEdit: function() {
		if (this.editable) {
			this.editButton.visible = true;
		}
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

	setType: function(type) {
		this.type = type;
		this.setTypeColor();
		this.render();
		emitr.trigger("newRoom", {
			room: this
		})
		return this;
	},

	setTypeColor: function() {
		this.square.graphics.beginFill(RoomTypes[this.type].backgroundColor).drawRect(0,0,this.width,this.height);
		this.square.graphics.beginFill(RoomTypes[this.type].foregroundColor).drawRect(5,5,this.width-10,this.height-10);
	},

	render: function() {
		this.roomTypeText.text = RoomTypes[this.type].name;
		this.editText.text = "Edit " + RoomTypes[this.type].name;
	},

	renderInit: function(map,x,y,width,height) {
		var container = new createjs.Container();
		container.x = x;
		container.y = y;
		map.addChild(container);

		this.square = new createjs.Shape();
		this.setTypeColor();
		container.addChild(this.square);


		this.roomTypeText = new createjs.Text(null, "16px Arial", "#FFF");
		this.roomTypeText.x = 30;
		this.roomTypeText.y = 30;
		container.addChild(this.roomTypeText);

		this.editButton = new createjs.Container();
		var editRectangle = new createjs.Shape();
		editRectangle.graphics.beginFill("#333").drawRect(20,20,width-40,height-40);
		this.editText = new createjs.Text(null, "16px Arial", "#FFF");
		this.editText.x = 30;
		this.editText.y = 30;
		this.editButton.addChild(editRectangle);
		this.editButton.addChild(this.editText);
		container.addChild(this.editButton);
		this.editButton.visible = false;
		this.editButton.on("click", function(event) {
			console.log("EDIT CLICKED!")
			emitr.trigger("editRoom", {room:this});
		}.bind(this))
		}
}