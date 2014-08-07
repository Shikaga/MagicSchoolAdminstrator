/** @jsx React.DOM */
StudentInterface = React.createClass({
	getInitialState: function() {

		emitr.on("studentSelected", function(student) {
			this.setState({
				student:student
			})
		}.bind(this))

		return {
			student: null
		}
	},

	close: function() {
		this.setState({
			student: null
		})
	},

	render: function() {

		var studentInterface;
		if (this.state.student) {
			var activities = [];
			this.state.student.activities.forEach(function(activity) {
				activities.push(<div>{activity.description} : {activity.getPriority()} : {activity.state}</div>)
			})
			studentInterface = (<div>
				<h1>Student: {this.state.student.person.name}</h1>
				<button onClick={this.close}>Close</button>
				<h2>Activities</h2>
				<div>Current: {this.state.student.currentActivity.description}</div>
				<div>{activities}</div>
			</div>)
		}

		if (this.state.student !== null) {
			return studentInterface;
		} else {
			return <div></div>
		}
	}
})