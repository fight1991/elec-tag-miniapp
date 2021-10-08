import notify from '../dropdownItem/notify'
Component({
  /**
   * 组件的属性列表
   */
  relations: {
    '../dropdownItem/dropdownItem': {
      type: 'child',
      linked: function (target) {}
    }
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    tabValue: {
      distance: '3km',
      oil: '92#',
      other: '距离最近'
    },
    showMask: false,
    currentTabName: 'distance', // 当前选择的tab
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
  lifetimes: {
    ready () {
      this.getAllChildNodes()
    },
    attached () {
      notify.stream((id) => {
        this.closeAllMask(id)
      })
    }
  },
  pageLifetimes: {
   
  },
  /**
   * 组件的方法列表
   */

  methods: {
    // 获取所有子节点
    getAllChildNodes () {
      this.nodes = this.getRelationNodes('../dropdownItem/dropdownItem')
      console.log(this.nodes)
    },
    closeAllMask (id) { // 接收广播
      this.nodes.forEach(instance => {
        // 其它模态框关闭
        if (instance.__wxExparserNodeId__ != id) {
          instance.hiddenMask()
        }
      })
    }
  }
})
