// pages/components/businessCard/businessCard.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '-'
    },
    subTitle: {
      type: String,
      value: '-'
    },
    subTitleRight: {
      type: String,
      value: '-'
    },
    src: {
      type: String,
      value: '/pages/image/default.png'
    },
    oldPrice: {
      type: String,
      value: '-'
    },
    newPrice: {
      type: String,
      value: '-'
    },
    oilInfo: {
      type: Boolean,
      value: true
    },
    lat: {
      type: Number,
      value: 0
    },
    lng: {
      type: Number,
      value: 0
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
    // 导航按钮
    navigatorBtn () {
      let { lat: latitude, lng: longitude, subTitle, title } = this.data
      wx.openLocation({
        latitude,
        longitude,
        name: title,
        address: subTitle
      })
    },
  }
})
