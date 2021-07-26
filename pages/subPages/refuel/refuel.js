// pages/subPages/refuel/refuel.js
Page({

  /**
   * 页面的初始数据
   */
  options: {
    multipleSlots: true
  },
  data: {
    showMask: false,
    currentTabName: 'distance', // 当前选择的tab
    searchStr: '', // 搜索的关键词
    tabValue: {
      distance: '3km',
      oil: '92#',
      other: '距离最近'
    },
    tabs: { // tab渲染项
      distance: [
        {label: '3km', value: 3},
        {label: '5km', value: 5},
        {label: '10km', value: 10},
        {label: '15km', value: 15},
        {label: '不限', value: 'none'}
      ],
      oil: [
        {label: '92#', value: 92},
        {label: '95#', value: 95},
        {label: '98#', value: 98},
        {label: '0#', value: 0}
      ],
      other: [
        {label: '距离最近', value: 'near'},
        {label: '价格最低', value: 'low'},
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 筛选条件按钮
  selectBtn (e) {
    let currentTab = e.target.dataset.tab
    this.setData({
      showMask: true,
      currentTabName: currentTab
    })
  },
  // 下方筛选项 
  tagTap (e) {
    let index = e.currentTarget.id
    let { currentTabName: currTab, tabs } = this.data
    this.setData({
      ['tabValue.' + [currTab]]: tabs[currTab][index]['label'],
      showMask: false
    })
  },
  // 点击模态框
  maskTap () {
    this.setData({
      showMask: false
    })
  },
  itemsTap () {},
  // 导航按钮
  navigatorBtn () {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})