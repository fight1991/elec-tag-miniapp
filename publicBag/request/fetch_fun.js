import { setUrlParams } from '../utils/util'
// 显示loading
export const showLoading = (text = '') => {
  wx.showLoading({
    title: text,
    mask: true
  })
}
// 隐藏loading
export const closeLoading = () => {
  wx.hideLoading()
}
// 处理业务分支
export const HandleBranch = (_res, other) => {
  switch (_res.code) {
    case '0000': // 成功
      return { result: _res.data || true, page: _res.page }
    case '0001': // 业务报错, 如查询失败等...
      if (other) {
        wx.showToast({
          title: _res.message,
          duration: 1500,
          icon:'none'
        })
      }
      return { other: _res.data || true}
    case '0002': // token失效
      if (!wx.tokenTimer) {
        wx.removeStorageSync('token')
        let app = getApp()
        app.globalData.userInfo = {}
        wx.showToast({
          title: _res.message,
          duration: 1500,
          icon:'none'
        })
        let pages = getCurrentPages()
        let curretPages = pages[pages.length - 1]
        let route = curretPages.route
        let params = setUrlParams(curretPages.options)
        let redirect = '/' + route
        if (params) {
          redirect = '/' + route + '?' + params
        }
        app.redirect = redirect
        wx.tokenTimer = setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/signIn'
          })
          wx.tokenTimer && clearTimeout(wx.tokenTimer)
          wx.tokenTimer = null
        }, 500)
      }
      return { result: null }
    default:
      wx.showToast({
        title: _res.message || '返回数据格式错误',
        duration: 1500,
        icon:'none'
      })
      return {result: null}
  }
}
// 处理文件上传的业务分支(废弃)
// const HandleBranchFile = _res => {
//   switch (_res.code) {
//     case '0000': // 成功
//       return { result: _res.data || true }
//     default:
//       wx.showToast({
//         title: '上传失败, 请稍后重试',
//         duration: 1500,
//         icon:'none'
//       })
//       return {result: null}
//   }
// }
