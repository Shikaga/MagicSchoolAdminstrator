function Student(map,x,y) {
	this.person = new Person(map,x,y,60, "red", "Student", this)
	this.person.container.on("mousedown", function(evt) {
		emitr.trigger("studentSelected", this);
	}.bind(this));

	this.dorm = null;
	this.group = null;
	this.currentActivity = new RelaxActivity(this);
	this.bed = null;
	this.occupiedItem = null;

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
	},

	dropItem: function(item) {
		if (this.bed == item) {
			this.bed = null;
		}
		if (this.occupiedItem) {
			this.occupiedItem.looseOwner();
			this.occupiedItem = null;
		}
	},

	acquireItem: function(item) {
		debugger;
	},

	occupyItem: function(item) {
		this.dropItem();
		this.occupiedItem = item;
		this.occupiedItem.gainOwner(this);
		this.goToItem(item);
	},

	goToItem: function(item) {
		this.person.goToItem(item);
	},

	isInRoom: function(room) {
		return this.person.isInRoom(room);
	},

	goToRoom: function(room) {
		this.dropItem();
		this.person.goToRoom(room);
	},

	getName: function() {
		return this.person.name;
	},

	wanderInRoom: function(room) {
		this.person.wanderInRoom(room);
	},

	getRoomIn: function() {
		return this.person.getRoomIn();
	}
}

Student.implements(ItemHolder);
Student.implements(PersonHood);