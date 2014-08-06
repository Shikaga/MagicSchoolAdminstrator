function Student(map,x,y) {
	this.person = new Person(map,x,y,60, "red", "Student", this)

	this.dorm = null;
	this.group = null;
	this.currentActivity = new RelaxActivity(this);
	this.bed = null;

	this.activities = [
		new LibraryActivity(this),
		new ClassActivity(this),
		new SleepActivity(this),
 		this.currentActivity
	];

	this.drive = 10;

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


		emitr.on("minutesPass", function(dt) {
			this.update(dt);
		}.bind(this))
	}
}