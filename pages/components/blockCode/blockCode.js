// pages/components/blockCode/blockCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //验证码个数
    blockNum:{
      type: Number,
      value: 4
    },
    //验证码类型
    codeType:{
      type:String,
      value:'block'
    },
  },
  observers: {
    errorType: function(newValue) {
      if (newValue === true) {
        this.setData({
          inputText: '',
          inputCode: '',
          isFucus: true
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeIndex:0, //激活的方块
    inputText:'',  //输入的验证码
    isFucus:true,  //是否自动聚焦
    inputCode:'',  //输入的值
    errorType:false //错误提示
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCodeInput(event){
      console.log(event)
      let value = event.detail.value
      let { blockNum, activeIndex} = this.data
      this.setData({
        errorType: false,
        inputText: value.split(''),
        activeIndex: this.data.inputText.length
      })
      if(activeIndex == blockNum){
        this.setData({
          isFucus: false,
        })
        this.triggerEvent('verificationCode', value)
      }
    }
  }
})
