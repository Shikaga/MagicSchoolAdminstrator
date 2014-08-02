/** @jsx React.DOM */
ItemsInterface = React.createClass({
	getInitialState: function() {

		emitr.on("showItemsMenu", function(data) {
			this.setState({
				visible: true,
				objectSelected: "chair"
			})
		}.bind(this))

		return {
			visible: false
		}
	},

	close: function() {
		this.setState({
			visible: false
		})
	},

	render: function() {
		var studentInterface;
		if (this.state.visible) {
			studentInterface = (<div>
				<h1>Items</h1>
				<button onClick={this.close}>Close</button>
			</div>)
		}

		if (this.state.visible) {
			return studentInterface;
		} else {
			return <div></div>
		}
	}
})