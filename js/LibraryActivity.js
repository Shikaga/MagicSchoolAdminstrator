function LibraryActivity(student) {
	this.description = "Study in Library";
	this.student = student;
	this.state = "IDLE";
	this.timeReading = 0;
	this.inertia = 0;
}

LibraryActivity.prototype = {
	update: function(dt) {
		this.reduceInertia(dt);
		switch(this.state) {
			case "IDLE":
				this.inertia = 20;
				this.goToBookshelf()
				break;
			case "GETTING BOOK": 
				if (this.ifArrived(roomHandler.getBookshelf())) {
					this.goToChair();
				}
				break;
			case "GOING TO CHAIR":
				if (this.ifArrived(roomHandler.getChair())) {
					this.timeReading = 0;
					this.state = "READING"
				}
				break
			case "READING":
				this.timeReading += dt;
				this.student.drive -= dt;
				if (this.timeReading > 20) {
					this.timeReading = 0;
					this.state = "IDLE"
				}
				break;
		}
	},

	reduceInertia: function(dt) {
		this.inertia -= dt;
		if (this.inertia < 0) {
			this.inertia  = 0;
		}
	},

	goToBookshelf: function() {
		var bookshelf = roomHandler.getBookshelf();
		if (bookshelf) {
			this.student.person.goToItem(bookshelf);
			this.state = "GETTING BOOK";
		} else {
			//debugger;
		}
	},

	leaveLibrary: function() {
		this.student.activityComplete();
		this.state = "NONE";
	},

	ifArrived: function(item) {
		if (item) {
			var coords = item.getCoords();
			if (coords.x == this.student.person.moveableEntity.x && 
				coords.y == this.student.person.moveableEntity.y) {
				return true;
			}
		}
		return false;
	},

	goToChair: function() {
		var chair = roomHandler.getChair();
		if (chair) {
			chair.owner = this.student;
			this.occupiedChair = chair;
			this.student.occupiedItem = chair;
			this.student.person.goToItem(chair);
			this.state = "GOING TO CHAIR";
		} else {

		}
	},

	getPriority: function() {
		if (roomHandler.getRoom("library")) {
			return this.student.drive + this.inertia;
		} else {
			return -1000000;
		}
	},

	tryCancel: function() {
		if (this.occupiedChair) {
			this.student.dropItem(this.occupiedChair);
			this.occupiedChair.owner = null;
		}
		this.state = "IDLE";
	},

	isComplete: function() {
		return this.state == "IDLE";
	}
}



LibraryActivity.implements(Activity);