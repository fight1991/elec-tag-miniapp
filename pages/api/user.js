import config from '../../config/index'
// 公共平台api开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 用户登录
export const loginApi = (data) => {
  return wx.$post_business({
    url: '/user-center/loginByMobile',
    data
  })
}
// 查询权限编码
export const getUserPermission = (isLoading) => {
  return wx.$post_business({
    url: '/user-center/user/getUserViews',
    isLoading
  })
}
// 公共平台api结束>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 业务平台接口开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 用户完整信息查询
export const getUserTotalInfo = (isLoading) => {
  return wx.$post_business({
    url: '/user-center/user/getUserInfo',
    isLoading
  })
}

// 注销登录
export const logOut = (data) => {
  return wx.$post_business({
    url: '/user-center/logout',
    data
  })
}
// 更换手机号
export const changeMobile = (data) => {
  return wx.$post_business({
    url: '/user-center/user/changeMobile',
    data
  })
}
// 获取手机验证码
export const getCodeApi = (data) => {
  return wx.$post_business({
    url: '/user-center/code/getMobileAuthCode',
    data
  })
}
// 获取图片验证码
export const getImgCodeApi = (data) => {
  return wx.$post_business({
    url: '/user-center/util/getCheckCodeImage',
    data
  })
}

// 实名认证
export const verifyAuth = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/certification',
    data
  })
}
// 行驶证认证并申领电子车牌
export const verifyLicense = (data) => {
  return wx.$post_business({
    url: '/user-center/vehicleLicense/certification',
    data
  })
}

// 获取消息列表
export const getMessageListApi = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeList',
    data,
    page
  })
}
// 获取消息详情
export const getMessageDetailApi = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeDetail',
    data
  })
}


