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
				this.goToLibrary();
				break;
			case "GO TO LIBRARY":
				this.goToLibrary();
				break
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
				break;
			case "WANDERING":
				this.wander();
				break;
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

	goToLibrary: function() {
		this.state = "GO TO LIBRARY";
		if (this.inLibrary()) {
			this.goToBookshelf()
		} else {
			var library = roomHandler.getRoom('library');
			this.student.goToRoom(library);
		}
	},

	inLibrary: function() {
		var room = this.student.getRoomIn();
		if (room.type.id == "library") {
			return true;
		}
		return false;
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

	wander: function() {
		if (this.isFreeChair()) {
			this.goToChair()
		} else {
			this.student.wanderInRoom(roomHandler.getRoom('library'));
		}
	},

	isFreeChair: function() {
		return (roomHandler.getChair() != null)
	},

	goToChair: function() {
		var chair = roomHandler.getChair();
		if (chair) {
			//chair.owner = this.student;
			// this.occupiedChair = chair;
			// this.student.occupiedItem = chair;
			// this.student.person.goToItem(chair);
			this.student.occupyItem(chair);
			this.state = "GOING TO CHAIR";
		} else {
			this.state = "WANDERING";
			this.wander();
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