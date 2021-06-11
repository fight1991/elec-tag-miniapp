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
      this.getList()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    bgData: {
      apply: app.utils.imgTobase64('/pages/image/swiper-bg.png'),
      bind: app.utils.imgTobase64('/pages/image/swiper-bg.png'),
      unbind: app.utils.imgTobase64('/pages/image/unbind-bg.png')
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
      }
    },
    // 跳转到用户信息页面
    goToUserInfoPage () {
      wx.navigateTo({
        url: '/pages/verifyInfo/index',
      })
    },
  }
})
