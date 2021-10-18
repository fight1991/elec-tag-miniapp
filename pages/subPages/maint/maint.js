// pages/subPages/wash/wash.js
var app = getApp()
const { washList, maintList, washBtnList, translateDic, addCoupon } = app.api
const listApi = {
  wash: washList,
  maint: maintList
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distanceOption: [
      { label: '3km', value: 3 },
      { label: '5km', value: 5 },
      { label: '10km', value: 10 },
      { label: '15km', value: 15},
      { label: '不限', value: '-1'}
    ],
    otherOption: [
      { label: '距离最近', value: 'distance'},
      { label: '价格最低', value: 'price'}
    ],
    carTypeOption: [],
    carType: '',
    distance: 3,
    other: 'distance',
    pageFlag: 'wash', // wash洗车 miant维修保养
    pageTitle: {
      wash: '洗车美容',
      maint: '维修保养'
    },
    bannerId: 2201,//洗车2101 维保2201
    washBtnList: [],
    upkeepType: '', // 洗车类型
    activeTab: '', // 洗车当前tab
    currentPlace: '', // 位置信息
    city: '', // 城市名
    pois: [], // 当前位置的周边信息
    latitude: '',
    longitude: '',
    tagText: {},
    couponItem: {},
    tipVisible: false, //温馨提示
    // 下拉刷新
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let { pageFlag } = options
    wx.setNavigationBarTitle({
      title: this.data.pageTitle[pageFlag]
    })
    if (pageFlag == 'wash') {
      this.getWashBtnList()
      this.setData({
        bannerId: 2101
      })
    }
    //车辆类型
    let carType = await translateDic('goodsVehicleType')
    let arr = Object.keys(carType).map(function(key){
      return { value: key, label: carType[key] };
    });
    this.setData({
      pageFlag,
      carTypeOption: arr,
      carType: 'car',
      tagText: await translateDic('orgServiceTag'),
    })
    
    await this.initPoisData()
    await this.initList()
    // app.listenPosition(({ latitude, longitude, address }) => {
    //   this.data.latitude = latitude
    //   this.data.longitude = longitude
    //   // 获取附近的停车场
    //   this.initList()
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  //一口价弹窗
  openTip (e) {
    this.setData({
      tipVisible: true,
      couponItem: { ...e.currentTarget.dataset.citem }
    })
  },
  goShopInfo (e) {
    let { orgId, distance } = e.currentTarget.dataset.item
    let { latitude, longitude, carType, pageFlag } = this.data
    wx.navigateTo({
      url: `./shopInfo?distance=${distance}&latitude=${latitude}&longitude=${longitude}&goodsVehicleType=${carType}&orgId=${orgId}&pageFlag=${pageFlag}`,
    })
  },
  //确认领取
  async onConfirm () {
    let { orgId, goodsId } = this.data.couponItem
    let { couponId: couponConfigId } = this.data.couponItem.couponList[0]
    let { result } = await addCoupon({
      orgId,
      goodsId,
      couponConfigId
    })
    if (result) {
      // 调用获取验证码api成功后, 开启倒计时
      utils.showToast.success('领取成功', () => {
        this.initList()
      })
    }
  },
  // 获取洗车按钮列表
  async getWashBtnList () {
    let { result } = await washBtnList()
    if (result) {
      this.setData({
        washBtnList: result
      })
    }
  },
  // 洗车筛选按钮
  washTabBtn (e) {
    let current = e.target.dataset.type
    if (current === this.data.activeTab) {
      current = ''
    }
    this.setData({
      activeTab: current
    })
    this.data.upkeepType = current
    this.initList()
  },
  // 初始化附件位置
  initPoisData () {
    let { title, city, pois, latitude, longitude } = app.currentPos
    this.data.pois = pois
    this.setData({
      currentPlace:title,
      city,
      pois,
      latitude,
      longitude
    })
  },
  // 城市选择
  placeSearch () {
    wx.navigateTo({
      url: '/pages/subPages/citySelector/citySelector',
    })
  },
  // 筛选按钮
  selectBtn () {
    this.initList()
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, pageFlag, latitude, longitude, distance, other, upkeepType, carType} = this.data
    pageIndex ++
    let { result, page } = await listApi[pageFlag]({
      data: {
        latitude,
        longitude,
        radius: distance,
        sortType: other,
        upkeepType,
        goodsVehicleType: pageFlag==='wash' ? carType : ''
      },
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result) {
      callback && callback(result || [], page)
    }
    this.loading = false
    this.setData({
      collapse: false
    })
  },
  // 上拉加载
  upperList () {
    if (!this.data.hasMore) return
    let { pageIndex, list } = this.data
    this.getList(pageIndex, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: [...list, ...resList],
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },
  // 下拉刷新
  initList () {
    this.getList(0, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: resList,
        total,
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },
})