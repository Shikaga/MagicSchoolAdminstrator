		function ObjectPlacer(room) {
			this.room = room;
			this.circle = null;

			this.gridSize = 20;

			this.a = this.room.container.on("pressmove", function(event) {
				this.move(event.localX, event.localY);
			}.bind(this))

			this.b = this.room.container.on("mousedown", function(event) {
				this.newObject(event.localX, event.localY);
			}.bind(this))

			this.b = this.room.container.on("mouseup", function(event) {
				this.objectPlaced(event.localX, event.localY);
			}.bind(this))
		}

		ObjectPlacer.prototype.getGridPosition = function(x,y) {
			x = Math.max(x,20); x = Math.min(x,this.room.width-20);
			y = Math.max(y,20); y = Math.min(y,this.room.height-20);
			var xGrid = Math.round(x / this.gridSize) * this.gridSize;
			var yGrid = Math.round(y / this.gridSize) * this.gridSize;
			return {x: xGrid, y: yGrid};
		}

		ObjectPlacer.prototype.move = function(x,y) {
			var legalCoords = this.getGridPosition(x,y);
			if (legalCoords) {
				if (this.circle) {
					this.circle.x = legalCoords.x;
					this.circle.y = legalCoords.y;
				}
			}
		}

		ObjectPlacer.prototype.newObject = function(x,y) {
			var legalCoords = this.getGridPosition(x,y)
			if (legalCoords) {
				this.circle = new createjs.Shape();
				this.circle.graphics.beginFill("#000000").drawCircle(0, 0, 10);
				this.circle.x = x;
				this.circle.y = y;
				this.room.container.addChild(this.circle);
			}
		}

		ObjectPlacer.prototype.objectPlaced = function(x,y) {
			if (this.circle) {
				this.circle = null;
			}
		}