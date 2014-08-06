function Student(map,x,y) {
	this.person = new Person(map,x,y,60, "red", "Student", this)

	this.dorm = null;
	this.group = null;
	this.currentActivity = new RelaxActivity(this);
	this.bed = null;

	this.activities = [
		new LibraryStateHandler(this),
		new SleepActivity(this),
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
	},

	sortActivities: function() {
		this.activities.sort(function(left, right) {
			return left.getPriority() < right.getPriority();
		})
	},


	setGroup: function(group) {
		this.group = group;
	},

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