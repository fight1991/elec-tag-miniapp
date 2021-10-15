// pages/subPages/maint/components/washForm.js
var app = getApp()
const { translateDic } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataForm: {
      type: Object,
      value: {
        items: []
      }
    }
  },
  lifetimes: {
    attached: async function () {
      this.setData({
        carType: await translateDic('goodsVehicleType')
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    carType: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
