/** @jsx React.DOM */
ClockInterface = React.createClass({
	getInitialState: function() {

		emitr.on("newClock", function(clock) {
			this.setState({
				time:clock
			})
		}.bind(this))

		return {
			time: "-:-"
		}
	},

	addHour: function() {
		emitr.trigger('addHour');
	},

	render: function() {
			return <div>
				<div>{this.state.time}</div>
				<button onClick={this.addHour}>Add Hour</button>
			</div>
	}
})