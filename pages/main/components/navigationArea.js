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
        navInfo:{
            navBarHeight: 60, // 导航栏高度
            menuRight: 8, // 胶囊距右方间距（方保持左、右间距一致）
            menuBotton: 4, // 胶囊距底部间距（保持底部间距一致）
            menuHeight: 32, // 胶囊高度（自定义内容可与胶囊高度保证一致）
        },
    },
    lifetimes: {
        attached: function () {
            let info = JSON.parse(wx.getStorageSync('navInfo'))
            info.navBarHeight = info.navBarHeight
            info.menuRight = info.menuRight
            info.menuBotton = info.menuBotton
            info.menuHeight = info.menuHeight
            this.setData({
                navInfo: info
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