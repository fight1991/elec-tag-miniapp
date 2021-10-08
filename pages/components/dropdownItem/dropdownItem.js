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
    value: {
      type: String,
      value: ''
    },
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
  observers: {
    'value': function (value) {
      let item = this.options.find(v => v.value == value)
      this.setData({
        currentLabel: item.label
      })
    }
  },
  data: {
    showMask: false,
    height: 0,
    currentLabel: ''
  },
  lifetimes: {
    attached () {
      this.getDomPos()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    send () {
      notify.send(this.__wxExparserNodeId__)
    },
    // 获取元素当前位置
    getDomPos () {
      let that = this
      const query = this.createSelectorQuery()
      query.select('.select-item').boundingClientRect()
      query.exec(function(res){
        that.setData({
          height: res[0].bottom
        })
      })
    },
    maskTap () {
      this.setData({
        showMask: !this.data.showMask
      })
    },
    // 下方筛选项 
    tabClick (e) {
      this.send()
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
    itemsTap (e) {
      console.log(e)
      let index = e.target.id
      let { options } = this.data
      this.setData({
        currentLabel: options[index].label,
        value: options[index].value
      })
      this.triggerEvent('change', options[index])
      this.hiddenMask()
    },
  }
})
