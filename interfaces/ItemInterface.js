/** @jsx React.DOM */
ItemInterface = React.createClass({
	getInitialState: function() {

		emitr.on("itemSelected", function(item) {
			this.setState({
				item: item,
				visible: true
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
		var owner = "NONE";
		if (this.state.item) {	
			if (this.state.item.owner) {
				owner = this.state.item.owner.getName();
			}
		}
		if (this.state.visible) {
			studentInterface = (<div>
				<h1>Item</h1>
				<div>Type: {this.state.item.type.id}</div>
				<div>Owner: {owner}</div>
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