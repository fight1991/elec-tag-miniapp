// pages/subPages/order/components/filter.js
var app = getApp()
const { translateDic, getCarList } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSelect: {
      type: Boolean,
      value: false
    },
    serviceList: {
      type: Array,
      value: []
    },
  },
  observers: {
    'showSelect': function (value) {
      if (value) {
        this.initData()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    step: 1, // 1第一个抽屉, 2第二个抽屉
    plateNoActive: '',
    serviceList: [],
    plateNoList: [],
    dateType: 'start',
    startDate: null, // 开始日期yyyy-mm-dd
    endDate: null, // 结束日期yyyy-mm-dd
    selectTime: null, // 结束时间戳
    formatter(type, value) {
  　　if (type === 'year') {
    　　return `${value}年`;
  　　} else if (type === 'month') {
  　　  return `${value}月`
  　　} else if (type === 'day') {
    　　return `${value}日`
  　　} 
  　　return value;
　　},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initData () {
      this.jumpTo(1)
      wx.showLoading()
      Promise.all([this.getPlateNoList()]).then((res)=>{
        wx.hideLoading()
      })
    },
    //重置
    reset () {
      let list = this.data.serviceList.map(item => {
        return {
          ...item,
          isActive: false
        }
      })
      this.setData({
        startDate: null,
        endDate: null,
        plateNoActive: '',
        serviceList: [...list]
      })
    },
    //确定
    confirm () {
      let list = this.data.serviceList.filter(item => item.isActive)
      let obj= {
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        plateNoActive: this.data.plateNoActive,
        serviceSelectList: [...list]
      }
      this.triggerEvent('init', obj)
      this.hideMask()
    },
    //选择日期
    openPage (e) {
      let type = e.currentTarget.dataset.type
      let date = this.data[type+'Date']
      //将日期转为时间戳
      let time = date ? new Date(date).getTime() : new Date().getTime()
      this.data.dateType = type
      this.setData({
        selectTime: time
      })
      this.jumpTo(2)

    },
    // 取消选择日期
    cancelPicker () {
      this.jumpTo(1)
    },
    // 确定选择日期
    confirmPicker (e) {
      let date = app.utils.formatDate(e.detail)
      let type = this.data.dateType
      this.setData({
        [type+'Date']: date
      })
      this.jumpTo(1)
    },
    // 选择项目类型
    serviceSelect (e) {
      let index =  e.currentTarget.dataset.index
      let {isActive} = this.data.serviceList[index]
      this.data.serviceList[index].isActive = !isActive
      this.setData({
        serviceList: this.data.serviceList
      })
    },
    // 选择车牌
    plateNoSelect (e) {
      let item =  e.currentTarget.dataset.item
      this.setData({
        plateNoActive: item
      })
    },
    // 获取车牌
    async getPlateNoList () {
      let { result } = await getCarList()
      if (result) {
        // let elecArr = result.filter(item => {
        // return item.bindStatus === 'bind' || item.bindStatus === 'installed'
        // })
        let newArr = result.map(item => {
          return item.plateNo
        })
        this.setData({
          plateNoList: newArr
        })
      }
      return true
    },
    hideMask () {
      if (this.data.showSelect) {
        this.setData({
          showSelect: false
        })
      }
    },
    // 切换抽屉
    jumpTo (step) {
      if (!step) return
      if (this.data.step == step) return
      this.setData({
        step
      })
    },
    noop () {},
    
  }
})
