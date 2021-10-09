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
    gridIcon: [{
      id: 'id1',
      label: '无感加油',
      icon: '/pages/image/businessCircle/oil.png',
      pageKey: 'refuel' // 加油
    }, {
      id: 'id2',
      label: '维修保养',
      icon: '/pages/image/businessCircle/maintenance.png',
      pageKey: 'maint' // 维保
    }, {
      id: 'id3',
      label: '洗车美容',
      icon: '/pages/image/businessCircle/wash.png',
      pageKey: 'wash'
    }, {
      id: 'id4',
      label: '智慧停车',
      icon: '/pages/image/businessCircle/parking.png',
      pageKey: 'parking'
    }]
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
