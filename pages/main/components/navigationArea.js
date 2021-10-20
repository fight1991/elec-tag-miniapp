const app = getApp()
Component({
    properties: {
        // defaultData（父页面传递的数据）
        currentPlace: {
            type: String,
            value: ''
        }
    },
    data: {
        navTop: 0
    },
    lifetimes: {
        attached: function () {
            let { navTop } = app.getSafeData()
            this.setData({
                navTop
            })
        },
    },
    methods: {
        // 城市选择
        placeSearch () {
            wx.navigateTo({
            url: '/pages/subPages/citySelector/citySelector',
            })
        },
    }
})