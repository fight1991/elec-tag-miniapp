// pages/main/components/cardShow.js
var app = getApp()
const { evi_info } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  lifetimes: {
    attached: function () {
      this.getElecBrandInfo()
      this.setData({
        mobile: app.globalData.userInfo.mobile
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    mobile: '',
    isAuth: false, // 是否已实名
    carInfo: {
      plateNo: '',
      model: '', // 品牌型号
      bindStatus: '', // 电子车牌绑定状态 未申领notApply、已申领apply、已绑定bind、已解绑unbind
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取电子车牌信息
    async getElecBrandInfo () {
      let { result } = await evi_info()
      if (result) {
        this.setData({
          carInfo: result[0]
        })
        app.globalData.elecBrandInfo = result[0]
      }
    },
  }
})
