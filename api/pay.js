// 支付相关
// 查找符合条件的卡券列表
export const getPayCouponList = ({ data, page }) => {
  return wx.$post_business({
    url: '/ec-coupon/trade-coupon/getPagedCouponList',
    data,
    page
  })
}

// 确认支付
export const addPay = (data) => {
  return wx.$post_business({
    url: '/user-center/trade/addPay',
    data,
  })
}
// 获取账户是否冻结
export const getFreezeStatus = (data) => {
  return wx.$post_business({
    url: '/user-center/trade/getFreezeStatus',
    data,
    responseType: 'boolean'
  })
}
// 测试环境支付时输短信验证码
export const payByBackSMS = (data) => {
  return wx.$post_business({
    url: '/user-center/trade/payByBackSMS',
    data
  })
}
// 锁定优惠券
export const lockCoupon = (data) => {
  return wx.$post_business({
    url: '/user-center/trade/lockCoupon',
    data,
  })
}