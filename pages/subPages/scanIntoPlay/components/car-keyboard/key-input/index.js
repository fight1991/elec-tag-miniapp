// pages/car-keyboard/key-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    plate: {
      type: String,
      observer: function (v) {
        // 对内容进行处理
        let innerPlate = this.data.innerPlate.map((_, index) => v[index] || '');
        this.setData({
          innerPlate
        });
      }
    },
    currentIndex: {
      type: Number
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    innerPlate: new Array(8)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickPlate (e) {
      this.triggerEvent('indexChange', {
        index: e.currentTarget.dataset.index
      });
    }
  }
});
