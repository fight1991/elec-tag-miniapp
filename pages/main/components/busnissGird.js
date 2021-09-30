// pages/main/components/busnissGird.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
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
  // 页面跳转
  routePage (e) {
    if (!app.isLogin()) {
      app.utils.openCheckLogin()
      return
    }
    let pageKey = e.currentTarget.dataset.page
    if (!pageKey) {
      //无pageKey为敬请期待
      app.messageBox.common('敬请期待')
      return
    }
    let pageArr = ['maint', 'wash'], pageFlag = ''
    if (pageArr.indexOf(pageKey) > -1) {
      pageFlag = pageKey
      pageKey = 'maint'
    }
    let url = `/pages/subPages/${pageKey}/${pageKey}?pageFlag=` + pageFlag
    wx.navigateTo({
      url
    })
  },
  }
})
