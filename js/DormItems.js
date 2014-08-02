DormItems = {
	"bed": {
		name: "Bed",
		owner: null,
		getContainer: function() {
			return new ItemRenderer(this.name).addRect('#000',0,0,30,60).done()
		}
	}
}