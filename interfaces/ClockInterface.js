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

	render: function() {
			return <div>{this.state.time}</div>
	}
})