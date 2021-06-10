// pages/elecPlate/carBaseInfo/carBaseInfo.js
var app = getApp()
const { getCarInfo } = app.api

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    licenseInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
   // 获取车辆信息
    async getCarInfo (id) {
      let { result } = await getCarInfo(id)
      if (result) {
        this.setData({
          licenseInfo: result
        })
      }
    },
  }
})
