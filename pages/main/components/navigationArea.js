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
        navBarHeight: app.navHeight,
        menuRight: app.menuRight,
        menuBotton: app.menuBotton,
        menuHeight: app.menuHeight,
    },
    attached: function() {

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