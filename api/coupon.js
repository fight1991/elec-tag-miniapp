/***********优惠券相关api */
//活动banner列表
export const getCouponBanner = ({ data, page }) => {
  return wx.$post_business({
    url: '/ec-coupon/activity/getPagedActivityExt',
    data,
    page
  })
}
//我的卡券列表
export const getCouponList = ({ data, page }) => {
  return wx.$post_business({
    url: '/ec-coupon/coupon/getPagedCouponList',
    data,
    page
  })
}
//卡券详情
export const couponDetail = (data) => {
  return wx.$post_business({
    url: '/ec-coupon/coupon/getCoupon',
    data
  })
}
//从banner点击卡券详情
export const getCouponDetail = (data) => {
  return wx.$post_business({
    url: '/ec-coupon/activity/getCouponDetail',
    data
  })
}
//卡券领取
export const addCoupon = (data) => {
  return wx.$post_business({
    url: '/ec-coupon/coupon/addCoupon',
    data
  })
}