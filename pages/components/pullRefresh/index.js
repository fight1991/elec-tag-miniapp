// pages/components/pullRefresh/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isRefresh: { // 下拉刷新展开/收起
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '50vh'
    },
    hasMore: {
      type: Boolean,
      value: true
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  observers: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉
    onRefresh() {
      this.triggerEvent('pullDown')
    },
    // 上滑到底
    upper (e) {
      this.triggerEvent('reachBottom')
    }
  }
})
