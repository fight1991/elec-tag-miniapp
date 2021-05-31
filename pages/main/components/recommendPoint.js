// pages/main/components/recommendPoint.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pointName: {
      type: String,
      value: ''
    },
    pointDis: {
      type: String,
      value: ''
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
    goBtn () {
      this.triggerEvent('goBtn')
    }
  }
})
