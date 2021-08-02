const app = getApp()
const { sequenceList, updateSequenceList } = app.api
Page({
	data: {
		listData: [],
		pageMetaScrollTop: 0
	},
	onLoad () {
		this.drag = this.selectComponent('#drag');
	},
	onShow () {
		this.getList()
	},
	// 排序结束
	async sortEnd (e) {
		let list = e.detail.listData
		if (list.length == 1) return
		let { result } = await updateSequenceList(list)
		if (result) {
			this.setData({
				listData: e.detail.listData
			})
		}
	},
	scroll(e) {
		this.setData({
			pageMetaScrollTop: e.detail.scrollTop
		})
	},
	// 获取列表
	async getList () {
		let { result } = await sequenceList()
		if (result) {
			if (result.length > 0) {
				let tempList = result.map(v => ({
					...v,
					dragId: v.bankCardNo,
					title: v.bankName,
					description: '',
					images: v.logoUrl,
				}))
				this.setData({
					listData: tempList
				})
				this.drag.init()
			} else {
				app.utils.openConfirm({
					content: '您还未绑定银行卡',
					confirmText: '去绑定',
					confirm: () => {
						wx.navigateTo({
							url: '/pages/subPages/card/card',
						})
					},
					cancel: () => {
						wx.navigateBack({
							delta: 1
						})
					}
				})
			}
		}
	},
	// 更新列表
	async updateList (list) {
		let { result } = await updateSequenceList(list)
		if (result) {

		}
	}
})
