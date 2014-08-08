function LessonOrganiser() {
	this.activities = [];
}

LessonOrganiser.prototype = {
	registerClassActivity: function(classActivity) {
		this.activities.push(classActivity);
	},
	update: function(dt) {
		this.activities.forEach(function(activity) {
			if (activity.student.group.getRoomToBeIn(clock.getTime().hours)) {
				if (activity.classroom == null) {
					activity.classroom = activity.student.group.getRoomToBeIn(clock.getTime().hours);
				}
				if (activity.teacher == null) {
					activity.teacher = this.getFreeTeacher();
				}
				activity.teacher.goToRoom(activity.classroom);
				activity.classTime = true;
			} else {
				activity.teacher = null;
				activity.classroom = null;
				activity.classTime = false;
			}
		}.bind(this));
	}, 
	getFreeTeacher: function() {
		return teacher;
	}
}