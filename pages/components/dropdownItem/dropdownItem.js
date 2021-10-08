import notify from './notify'
Component({
  relations: {
    '../dropdownMenu/dropdownMenu': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: [
        {label: '3km', value: 3},
        {label: '5km', value: 5},
        {label: '10km', value: 10},
        {label: '15km', value: 15},
        {label: '不限', value: 'none'}
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMask: false
  },
  lifetimes: {
    attached () {
      console.log('子组件钩子函数')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    send () {
      notify.send(Date.now())
    },
    maskTap () {
      this.setData({
        showMask: !this.data.showMask
      })
    },
    // 下方筛选项 
    tabClick (e) {
      this.setData({
        showMask: !this.data.showMask
      })
    },
    // 隐藏模态框
    hiddenMask () {
      this.setData({
        showMask: false
      })
    },
    itemsTap () {
      this.hiddenMask()
    },
  }
})
