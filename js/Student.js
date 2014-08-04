function LibraryStateHandler(student) {
	this.student = student;
	this.state = "IDLE";
	this.timeReading = 0;
}

LibraryStateHandler.prototype = {
	update: function(dt) {
		switch(this.state) {
			case "IDLE":
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
				if (this.timeReading > 1000) {
					this.timeReading = 0;
					this.state = "IDLE"
				}
				break;
		}
	},

	goToBookshelf: function() {
		var bookshelf = roomHandler.getBookshelf();
		if (bookshelf) {
			this.student.person.goToItem(bookshelf);
			this.state = "GETTING BOOK";
		} else {
			debugger;
		}
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
			this.student.person.goToItem(chair);
			this.state = "GOING TO CHAIR";
		}
	}
}

function Student(map,x,y) {
	this.person = new Person(map,x,y,1, "red", "Student")

	this.dorm = null;
	this.group = null;
	this.currentActivity = null;
	this.bed = null;

	this.libraryState = new LibraryStateHandler(this);

	this.setListeners();
}

Student.prototype = {
	update: function(dt) {
		this.person.update(dt);
		if (this.inLibrary()) {
			this.libraryState.update(dt);
		}
	},

	setGroup: function(group) {
		this.group = group;
	},

	goToBed: function() {
		if (this.bed == null) {
			this.findBed();
		} 
		if (this.bed !== null) {
			this.person.goToItem(this.bed);
		} else {
			//console.log("There is no bed to go to!");
		}
	},

	inLibrary: function() {
		return (this.person.getRoomTypeIn().id == "library") 
	},

	doLibraryWork: function() {
		//Do nothing!
	},

	goToLibrary: function() {
		if (this.inLibrary()) {
			this.doLibraryWork();
		} else {
			this.person.goToRoom(roomHandler.getRoom("library"));
		}
	},

	findBed: function() {
		var bed = roomHandler.getFreeBed();
		if (bed == null) {
			//console.log("I can't find a bed!")
		} else {
			this.bed = bed;
			this.bed.owner = this;
		}
	},

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			//Do I now have a room that I need?
		}.bind(this))

		emitr.on("newClock", function(clock) {
			var hour = Number.parseFloat(clock.split(":")[0]);
			var activity = this.group.getCurrentActivity(hour);
			//if (activity !== this.currentActivity) {
				//New Activity!
			//	this.currentActivity = activity;
			if (activity == "freetime") {
				//this.goToBed();
				this.goToLibrary();
			} else if (activity == "class") {
				console.log("CLASS!")
				var room = this.group.getRoomToBeIn(hour);
				if (room != null) {
					this.person.goToRoom(room);
				}	
			}
			//}
			//
		}.bind(this));

		emitr.on("timePasses", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}