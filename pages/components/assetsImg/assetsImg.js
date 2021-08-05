// pages/components/assetsImg/assetsImg.js
// 静态图片服务器域名
import config from '../../../config/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: 'aspectFit'
    },
    name: {
      type: String,
      value: 'empty'
    },
    module: {
      type: String,
      value: 'trading-area' // 商圈
    },
    width: {
      type: String,
      value: '300rpx'
    },
    height: {
      type: String,
      value: 'auto'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    host: config.assetsHost,
    public: '/file/public/resource/electronic-car-license/'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
