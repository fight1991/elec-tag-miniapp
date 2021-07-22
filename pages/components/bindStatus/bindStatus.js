// pages/components/bindStatus/bindStatus.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: String,
      value: 'delivery'
    },
    eviId: {
      type: String,
      value: ''
    },
    plateNo: {
      type: String,
      value: ''
    },
    vehicleId: {
      type: String,
      value: ''
    },
    showOp: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgObj: {
      delivery: app.utils.imgTobase64('/pages/image/bind-bg.png'), // 未绑定
      bind: app.utils.imgTobase64('/pages/image/bind-bg.png'), // 已绑定
      installed: app.utils.imgTobase64('/pages/image/bind-bg.png'), // 已安装
      scrap: app.utils.imgTobase64('/pages/image/bind-bg-disable.png') // 报废
    },
    statusText: {
      delivery: '未绑定电子车牌',
      bind: '待安装'
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSheet (e) {
      let id = e.currentTarget.id
      this.triggerEvent('showSheet', id)
    }
  }
})
