// pages/main/components/cardShow.js
var app = getApp()
const { getCarList } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  pageLifetimes: {
    show: function () {
      if (app.isLogin()) {
        this.getList()
      } else {
        this.setData({
          list: []
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    bgData: {
      delivery: app.utils.imgTobase64('/pages/image/swiper-bg.png'),
      bind: app.utils.imgTobase64('/pages/image/swiper-bg.png'),
      installed: app.utils.imgTobase64('/pages/image/swiper-bg.png'),
      scrap: app.utils.imgTobase64('/pages/image/unbind-bg.png')
    },
    statusText: {
      delivery: '未绑定',
      bind: '待安装',
      installed: '已安装',
      scrap: '已报废'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取电子车牌信息
    async getList () {
      let { result } = await getCarList()
      if (result) {
        this.setData({
          list: result
        })
        let elecArr = result.filter(item => {
         return item.bindStatus === 'bind' || item.bindStatus === 'installed'
        })
        if(elecArr.length) {
          app.globalData.elecShow = true
        }
        this.triggerEvent('getCarNum', result.length)
      }
    },
    // 跳转到用户信息页面
    goToUserInfoPage () {
      if (!app.isLogin()) {
        app.utils.openCheckLogin()
        return
      }
      wx.navigateTo({
        url: '/pages/subPages/verifyInfo/index',
      })
    },
  }
})
