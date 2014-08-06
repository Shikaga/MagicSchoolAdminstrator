function Student(map,x,y) {
	this.person = new Person(map,x,y,60, "red", "Student", this)

	this.dorm = null;
	this.group = null;
	this.currentActivity = new RelaxActivity(this);
	this.bed = null;

	this.activities = [
		new LibraryStateHandler(this),
 		this.currentActivity
	];
	this.sortActivities();


	this.drive = 10;

	this.libraryState = new LibraryStateHandler(this);

	this.setListeners();
}

Student.prototype = {
	update: function(dt) {
		this.sortActivities();
		this.person.update(dt);

		if (this.activities[0] !== this.currentActivity) {
			this.currentActivity.tryCancel();
			if (this.currentActivity.isComplete()) {
				this.currentActivity = this.activities[0];
			}
		}
		this.activities[0].update(dt);
		//if (this.inLibrary()) {
		//	this.libraryState.update(dt);
		//}
	},

	sortActivities: function() {
		this.activities.sort(function(left, right) {
			return left.getPriority() < right.getPriority();
		})
	},

	activityComplete: function() {
		//this.currentActivity = null;
		//this.useFreeTime();
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
		//if (this.inLibrary()) {
		//	console.log("???")
			this.currentActivity = this.libraryState;
		//	this.doLibraryWork();
		//} else {
		//	this.person.goToRoom(roomHandler.getRoom("library"));
		//}
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

/*	useFreeTime: function() {
		if (this.tiredness > 1000) {
			this.goToBed();
		} else {
			if (this.drive > 20) {
				this.study();
			} else {
				this.relax();
			}
		}
		
	},

	relax: function() {
		this.currentActivity = new RelaxActivity(this);
	},

	study: function() {
		if (roomHandler.getRoom("library")) {// There is a nearby library
			this.goToLibrary();
		} else {
			console.log("I can't study!");
			this.relax();
		}
	},*/

	setListeners: function() {
		emitr.on("newRoom", function(data) {
			//Do I now have a room that I need?
		}.bind(this))

		/*emitr.on("newClock", function(clock) {
			var hour = Number.parseFloat(clock.split(":")[0]);
			var activity = this.group.getCurrentActivity(hour);
			//if (activity !== this.currentActivity) {
				//New Activity!
			//	this.currentActivity = activity;
			if (activity == "freetime") {
				this.useFreeTime();
			} else if (activity == "class") {
				console.log("CLASS!")
				var room = this.group.getRoomToBeIn(hour);
				if (room != null) {
					this.person.goToRoom(room);
				}	
			}
			//}
			//
		}.bind(this));*/

		emitr.on("minutesPass", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}