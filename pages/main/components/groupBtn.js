// pages/main/components/groupBtn.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    bgImg: {
      car: app.utils.imgTobase64('/pages/image/index/car-bg.png'),
      plate: app.utils.imgTobase64('/pages/image/index/plate-bg.png'),
      scan: app.utils.imgTobase64('/pages/image/index/scan-bg.png')
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 车辆信息页面
    carInfoBtn () {
      if (!app.isLogin()) {
        app.utils.openCheckLogin()
        return
      }
      let { isAuth } = this.data
      if (isAuth) {
        wx.navigateTo({
          url: '/pages/subPages/carInfo/carList',
        })
      } else {
        wx.navigateTo({
          url: '/pages/subPages/verifyInfo/index',
        })
      }
    },
    // 打开扫码
    scanBtn () {
      if (!app.isLogin()) {
        app.utils.openCheckLogin()
        return
      }
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          // res.result
          let str = res.result
          if (str.indexOf('/RFID/') > -1) {
            wx.navigateTo({
              url: '/pages/subPages/scanBind/scanBind?plateNo=' + str,
            })
          } else {
            app.messageBox.common('无效的二维码')
          }
        
        }
      })
    },
    // 电子车牌按钮
    elecBrandBtn () {
      if (!app.isLogin()) {
        app.utils.openCheckLogin()
        return
      }
      if (this.data.carTotal > 2) {
        app.messageBox.common('您申请的电子车牌次数已达上限')
        return
      }
      wx.navigateTo({
        url: '/pages/subPages/verifyInfo/index',
      })
    },
    
  }
})