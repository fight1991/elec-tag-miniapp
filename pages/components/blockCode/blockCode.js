// pages/components/blockCode/blockCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blockNum: {
      type: Number,
      value: 4
    }
  },
  observers: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    isFocus: true,
    value: ''
  },
  lifetimes: {
    attached () {

    }
  },
  pageLifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    blockBtn (e) {
      this.setData({
        isFocus: true
      })
    },
    inputChange (e) {
      let value = e.detail.value.trim()
      this.setData({
        value: value
      })
      if (value.length == this.data.blockNum) {
        this.triggerEvent('done', value)
      }
    }
  }
})
