Component({
	properties: {
		columns: {
			type: Number,
			value: 1
		},
		itemData: {
			type: Object,
			value: {}
		},
		noBorder: {
			type: Boolean,
			value: false
		}
	},
	methods: {
		itemClick(e) {
			this.triggerEvent('click', {
				test: "这是一个来自 drag-item 的测试信息"
			});
		}
	},
	ready() {
	}
})
