// pages/components/upload/upload.js
var app = getApp()
const {upload_func_private, upload_func_public} = app.api
const uploadApi = {
  private: upload_func_private,
  public: upload_func_public
}
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: { // 宽度
      type: String,
      value: '160rpx'
    },
    uploadType: {
      type: String,
      value: 'private'
    },
    height: { // 高度 默认为auto
      type: String,
      value: 'auto'
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    staticSrc: { // 默认图片
      type: String,
      value: '/pages/image/upload.png'
    },
    closeIcon: { // 是否显示删除图标
      type: Boolean,
      value: true
    },
    preview: {
      type: Boolean,
      value: false
    },
    imgSrc: { // 真实的图片地址
      type: String,
      value: ''
    },

  },
  observers: {},
  /**
   * 组件的初始数据
   */
  data: {
    tempSrc: '', // 临时地址
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图片按钮, 如果存在删除按钮则预览, 否则直接选择/上传文件
    chooseBtn (e) {
      let { tempSrc, imgSrc, preview } = this.data
      let imgURL = tempSrc || imgSrc
      // 开启预览模式
      // 或存在closeIcon按钮
      if (preview || (this.data.closeIcon && imgURL)) {
        wx.previewImage({
          urls: [imgURL]
        })
        return
      }
      wx.showActionSheet({
        itemList: ['拍照','从相册中选择'],
        success: (res) => {
          var type = 'album'
          if (res.tapIndex == 0) {
            type = 'camera'
          }
          this.chooseImg(type)
        }
      })
    },
    // 选取图片方式
    chooseImg (type) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: (res) => {
          this.uploadImg(res)
        }
      })
    },
    // 上传图片到服务器
    async uploadImg (res) {
      let tempPath = res.tempFilePaths[0]
      let url = await uploadApi[this.data.uploadType](tempPath)
      // 更新父组件传递过来的imgSrc值
      if (!url) {
        app.messageBox.common('上传失败, 请稍后再试')
        return
      }
      this.setData({
        tempSrc: tempPath, // 用来显示
        imgSrc: url // 后端所需的真实值
      })
      this.triggerEvent('getImgInfo', url)
    },
    // 删除已选的图片
    removeBg (e) {
      this.setData({
        imgSrc: '',
        tempSrc: ''
      })
      this.triggerEvent('getImgInfo', '')
    }
  }
})
