// pages/components/blockCode/blockCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blockNum: {
      type: Number,
      value: 4
    }
  },
  observers: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    isFocus: [],
    templateFocus: [],
    values: {
      0: ' ',
      1: ' ',
      2: ' ',
      3: ' '
    },
    isShow: false
  },
  lifetimes: {
    attached () {
      this.data.templateFocus = new Array(this.data.blockNum).fill(false)
      let temp = [...this.data.templateFocus]
      temp[0] = true
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    keyboard (e) {
      console.log('键盘', e)
    },
    blockBtn (e) {
      console.log(e)
      let index = e.target.id *1
      let { blockNum, isFocus, values } = this.data
      if (index == (this.data.blockNum - 1)) {
        let temp = [...isFocus]
        temp[index] = true
        let tempV = values[index]
        this.setData({
          isFocus: temp,
          ['values.' + index]: tempV
        })
      }
    },
    inputChange (e) {
      /*
        1. 正常输入值后, 跳转到下一个输入框
        2. 默认需要添加一个空字符串, 否则捕捉不到键盘上的删除按钮
       */
      let { value, keyCode } = e.detail
      let index = e.target.id *1
      let { blockNum } = this.data
      if (value.trim()) { // 说明正在输入值
        let temp = [...this.data.templateFocus]
        let nextIndex = index + 1
        if (nextIndex < blockNum) {
          temp[nextIndex] = true
        } else {
          temp[index] = true
        }
        this.setData({
          isFocus: temp
        })
      }
      // 点击了删除按钮, keyCode==8
      if (keyCode == 8) {
        let temp = [...this.data.templateFocus]
        if (index == 0) {
          temp[index] = true
          this.setData({
            ['values.' + index]: ' ',
            isFocus: temp
          })
          return
        }
        if (index == (blockNum - 1)) {
          temp[index] = true
          if (value) {
            this.setData({
              ['values.' + index]: ' ',
              isFocus: temp
            })
          } else {
            temp[index - 1] = true
            this.setData({
              ['values.' + index]: ' ',
              ['values.' + (index - 1)]: ' ',
              isFocus: temp
            })
          }
          return
        }
        temp[index - 1] = true
        this.setData({
          ['values.' + index]: ' ',
          ['values.' + (index - 1)]: ' ',
          isFocus: temp
        })
      }
      this.data.values[index] = value
    }
  }
})
