/** @jsx React.DOM */
StudentInterface = React.createClass({
	getInitialState: function() {

		emitr.on("studentSelected", function(data) {
			this.setState({
				student:data.student
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
			studentInterface = (<div>
				<h1>Student: {this.state.student.name}</h1>
				<button onClick={this.close}>Close</button>
			</div>)
		}

		if (this.state.student !== null) {
			return studentInterface;
		} else {
			return <div></div>
		}
	}
})