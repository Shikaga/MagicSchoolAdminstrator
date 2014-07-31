function Clock() {
	this.setListeners();
	this.millisecondsPassed = 8 * 60 * 60 * 1000 //TODO: Will this overflow?
	this.clock = null
	this.setClock();
}

Clock.prototype = {
	update: function(dtMillisconds) {
		var gameTime = dtMillisconds * 60 * 2; //2 game minutes for every real second (12 minute days)
		if (!this.paused) {
			this.updateClock(gameTime);
			emitr.trigger("timePasses", gameTime/1000)
		}
	},
	updateClock: function(gameTime) {
		this.millisecondsPassed += gameTime;
		this.setClock();
	},
	setClock: function() {
		var date = new Date(this.millisecondsPassed);
		var newClock = date.getHours() + ":" + date.getMinutes();
		if (newClock !== this.clock) {
			emitr.trigger("newClock", newClock);
		}
		this.clock = newClock;
	},
	pauseClock: function() {
		this.paused = true;
	},
	resumeClock: function() {
		this.paused = false;
	},
	setListeners: function() {
		emitr.on("pauseClock", function() {
			this.pauseClock();
		}.bind(this))
		emitr.on("resumeClock", function() {
			this.resumeClock();
		}.bind(this))
	}
}