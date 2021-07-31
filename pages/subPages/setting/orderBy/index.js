const app = getApp()
const { sequenceList, updateSequenceList } = app.api
let listData = [
	{
		dragId: "item0",
		title: "招商银行",
		description: "",
		images: "/pages/image/user_static_logo.png",
		fixed: false
	},
	{
		dragId: "item1",
		title: "中国农业银行",
		description: "",
		images: "/pages/image/user_static_logo.png",
		fixed: false
	},
	{
		dragId: "item2",
		title: "中信银行",
		description: "",
		images: "/pages/image/user_static_logo.png",
		fixed: false
	},
	{
		dragId: "item3",
		title: "交通银行",
		description: "",
		images: "/pages/image/user_static_logo.png",
		fixed: false
	},
	{
		dragId: "item4",
		title: "交通银行",
		description: "",
		images: "/pages/image/user_static_logo.png",
		fixed: false
	}
];

Page({
	data: {
		listData: [],
		pageMetaScrollTop: 0
	},
	onLoad() {
		this.drag = this.selectComponent('#drag');
		// 模仿异步加载数据
		setTimeout(() => {
			this.setData({
				listData: listData
			});
			this.drag.init();
		}, 100)
	},
	// 排序结束
	sortEnd(e) {
		this.setData({
			listData: e.detail.listData
		});
	},
	scroll(e) {
		this.setData({
			pageMetaScrollTop: e.detail.scrollTop
		})
	},
	// 获取列表
	async getList () {
		let { result } = await sequenceList()
		if (result && result.length > 0) {
			let tempList = result.map(v => ({
				dragId: v.bankCardNo,
				title: v.bankName,
				description: '',
				images: v.logoUrl,
			}))
			this.setData({
				
			})
		}
	},
	// 更新列表
	async updateList (list) {
		let { result } = await updateSequenceList(list)
		if (result) {

		}
	}
})
