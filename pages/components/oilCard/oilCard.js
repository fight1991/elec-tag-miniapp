// pages/components/oilCard/oilCard.js
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

  }
})