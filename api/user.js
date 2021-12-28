// 公共平台api开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 用户登录
export const loginApi = (data) => {
  return wx.$post_business({
    url: '/user-center/member-login/loginByMobile',
    data
  })
}
// 微信一键登录
export const loginApiByWechat = (data) => {
  return wx.$post_business({
    url: '/user-center/member-login/loginByWechat',
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
export const getUserTotalInfo = (other = true) => {
  return wx.$post_business({
    url: '/user-center/member-user/getUserInfo',
    other
  })
}

// 注销登录
export const logOut = (data) => {
  return wx.$post_business({
    url: '/user-center/member-login/logout',
    data
  })
}

//获取未读消息
export const noticeCount = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeCount',
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
    url: '/user-center/code/getCheckCodeImage',
    data
  })
}
// 获取验证码--个人设置用
export const getShortCode = (data) => {
  return wx.$post_business({
    url: '/user-center/code/getAuthCode',
    data
  })
}
// 校验验证码
export const checkCode = (data) => {
  return wx.$post_business({
    url: '/user-center/code/check',
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
// 获取停车场推送消息开关
export const getParkNoticeSwitch = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/getParkNoticeSwitch',
    data
  })
}
// 更新停车场推送消息开关
export const updateParkNoticeSwitch = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/updateParkNoticeSwitch',
    data
  })
}
// 上传身份认证图片
// 身份认证-上传头像 身份证正反面
export const verifyPersonApi = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/uploadPic',
    data
  })
}
// 获取网点列表
export const point_list = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/branch/list',
    data,
    page
  })
}
// 订单管理
// 订单列表
export const orderList = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/trade/getTradeList',
    data,
    page
  })
}
// 订单详情
export const orderDetail = (data, isLoading) => {
  return wx.$post_business({
    url: '/user-center/trade/getTrade',
    data,
    isLoading
  })
}
// 个人设置 -- 设置交易密码
export const tradePw = (data) => {
  return wx.$post_business({
    url: '/user-center/user-setting/setPassword',
    data
  })
}
// 设置选择常用油标号
export const oilNum = (data) => {
  return wx.$post_business({
    url: '/user-center/user-setting/setCommonOilType',
    data
  })
}
// 个人设置 -- 设置免密额度
export const tradePay = (data) => {
  return wx.$post_business({
    url: '/user-center/user-setting/setQuickPay',
    data
  })
}