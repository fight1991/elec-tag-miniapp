// pages/components/currentPosition/currentPosition.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // defaultData（父页面传递的数据）
    currentPlace: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: '#fff'
    },
    iconSize: {
      type: String,
      value: '40rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    placeSearch () {
      this.triggerEvent('placeSearch') 
    }
  }
})
