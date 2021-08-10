// pages/components/mobile_code_login/mobile_code_login.js
var app = getApp()
const utils = app.utils
const { bindBankCard, bankCardCode } = app.api
// 手机号验证码登录组件
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
    confirmDialogVisible: false,
    mobile: '',
    authCode: '', // 验证码
    accountId: '',
    isEditCode: false, // 按钮禁用
    codeText: '获取验证码',
    timerId: 0,
    codeTime: 60,
    isClick: false,
    isAgree: true
  },
  lifetimes: {
    attached: function (e) {
      this.myDialog = this.selectComponent('#myDialog')
    },
    detached: function (e) {
      this.data.timerId && clearInterval(this.data.timerId)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击同意按钮
    switchAgree () {
      let { isAgree } = this.data
      this.setData({
        isAgree: !isAgree
      })
    },
    // 提交按钮
    submitBtn () {
      let { mobile, authCode, isAgree } = this.data
      if (!mobile) {
        app.messageBox.common('请输入手机号')
        return
      }
      var reg = /^1[3456789]\d{9}$/
      if (!reg.test(mobile)) {
        app.messageBox.common('请输入正确格式的手机号')
        return
      }
      if (!authCode) {
        app.messageBox.common('请输入验证码')
        return
      }
      if (!isAgree) {
        app.messageBox.common('请勾选支付协议')
        return
      }
      this.bindCard()
    },
    // 绑定银行卡
    async bindCard () {
      let { accountId, authCode } = this.data
      let { uid } = app.globalData.userInfo
      let { result } = await bindBankCard({
        accountId,
        authCode,
        uid
      })
      if (result) {
        wx.navigateBack({
          delta: 2
        })
      }
    },
    // 获取验证码
    async getCode () {
      if (this.data.timerId) return
      if (!utils.checkPhone(this.data.mobile)) return
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      if (!prevPage) return
      let { result } = await bankCardCode({
        ...prevPage.data.formData,
        mobile: this.data.mobile
      })
      if (result) {
        // 调用获取验证码api成功后, 开启倒计时
        utils.showToast.success('发送成功', () => {
          this.setData({
            isEditCode: true
          })
          this.computedTime()
        })
        this.data.accountId = result
      }
    },
    // 显示dialog
    showDialog () {
      // 校验手机号是否正确
      var isPass = utils.checkPhone(this.data.mobile)
      if (!isPass) return
      if (this.data.timerId > 0) return
      this.myDialog.show()
    },
    // 是否可以输入验证码
    checkImgCodeStatus (status) {
      // status为true时代表验证码发送成功
      // 开始倒计时
      if (status) {
        this.setData({
          isEditCode: true
        })
        this.computedTime()
      }
    },
    // 倒计时
    computedTime () {
      let { codeTime, timerId } = this.data
      if (timerId > 0) return
      this.setData({
        codeText: codeTime + ' 秒'
      })
      var seconds = codeTime
      var timerIdTemp = setInterval(() => {
        seconds--
        this.setData({
          codeText: utils.addZero(seconds, codeTime) + ' 秒'
        })
        if (seconds < 0) {
          this.setData({
            codeText: '获取验证码'
          })
          clearInterval(timerIdTemp)
          this.data.timerId = 0
        }
      }, 1000)
      this.data.timerId = timerIdTemp
    }
  }
})
