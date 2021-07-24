// pages/components/drag/drap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    kelong: {
      top: 0,
      xt: '',
      name: '',
      subname: ''
    },
    replace: {
      xt: '',
      name: '',
      subname: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dragStart: function(e) {
      var that = this
      var kelong = that.data.kelong
      var i = e.currentTarget.dataset.index
      kelong.xt = this.data.optionList[i].xt
      kelong.name = this.data.optionList[i].name
      kelong.subname = this.data.optionList[i].subname
  
      var query = wx.createSelectorQuery();
      //选择id
      query.select('.listbox').boundingClientRect(function(rect) {
        // console.log(rect.top)
        kelong.top = e.changedTouches[0].clientY - rect.top - 30
        that.setData({
          kelong: kelong,
          showkelong: true
        })
      }).exec();
    },
    dragMove: function(e) {
      var that = this
      var i = e.currentTarget.dataset.index
      var query = wx.createSelectorQuery();
      var kelong = that.data.kelong
      var listnum = that.data.optionList.length
      var optionList = that.data.optionList
      query.select('.listbox').boundingClientRect(function(rect) {
        kelong.top = e.changedTouches[0].clientY - rect.top - 30
        if(kelong.top < -60) {
          kelong.top = -60
        } else if (kelong.top > rect.height) {
          kelong.top = rect.height - 60
        }
        that.setData({
          kelong: kelong,
        })
      }).exec();
    },
    dragEnd: function(e) {
      var that = this
      var i = e.currentTarget.dataset.index
      var query = wx.createSelectorQuery();
      var kelong = that.data.kelong
      var listnum = that.data.optionList.length
      var optionList = that.data.optionList
      query.select('.listbox').boundingClientRect(function (rect) {
        kelong.top = e.changedTouches[0].clientY - rect.top - 30
        if(kelong.top<-20){
          wx.showModal({
            title: '删除提示',
            content: '确定要删除此条记录？',
            confirmColor:'#e4463b'
          })
        }
        var target = parseInt(kelong.top / 60)
        var replace = that.data.replace
        if (target >= 0) {
          replace.xt = optionList[target].xt
          replace.name = optionList[target].name
          replace.subname = optionList[target].subname
          optionList[target].xt = optionList[i].xt
          optionList[target].name = optionList[i].name
          optionList[target].subname = optionList[i].subname
          optionList[i].xt = replace.xt
          optionList[i].name = replace.name
          optionList[i].subname = replace.subname
        }
        that.setData({
          optionList: optionList,
          showkelong:false
        })
      }).exec();
    }
  }
})
