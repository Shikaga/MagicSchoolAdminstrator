function Timetable() {
	this.timetable = {};
	this.syllabus = {
		theoryOfMagic: {
			id: "theoryOfMagic",
			name: "Theory of Magic",
			type: "lesson"
		}, 
		visionProjection: {
			id: "visionProjection",
			name: "Vision Projection",
			type: "lesson"
		}, 
		potionMaking: {
			id: "potionMaking",
			name: "Potion Making",
			type: "lesson"
		}, 
		fairieSummoning: {
			id: "fairieSummoning",
			name: "Fairie Summoning",
			type: "lesson"
		}, 
		latin: {
			id: "latin",
			name: "Latin",
			type: "lesson"
		}, 
		philosophy: {
			id: "philosophy",
			name: "Philosophy",
			type: "lesson"
		}, 
		freetime: {
			id: "freetime",
			name: "Free Time",
			type: "freetime"
		}, 
		bedtime: {
			id: "bedtime",
			name: "Bedtime",
			type: "bedtime"
		}
	};
	this.initTimetable();
	this.setListeners();
}

Timetable.prototype = {
	initTimetable: function() {
		for (var i=0; i < 24; i++) {
			this.timetable[i] = this.syllabus.freetime
		}
		//this.timetable[9] = this.syllabus.theoryOfMagic;
		//this.timetable[11] = this.syllabus.latin;

		for (var i=0; i < 6; i++) {
			this.timetable[i] = this.syllabus.bedtime;
		}

		for (var i=22; i < 24; i++) {
			this.timetable[i] = this.syllabus.bedtime;
		}
	}, 

	setListeners: function() {
		emitr.on("editTimetable", function() {
			emitr.trigger("showTimetable", {timetable: this})
		}.bind(this))
	}
}