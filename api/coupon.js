/***********优惠券相关api */
//活动banner列表
export const getCouponBanner = (data) => {
  return wx.$post_business({
    url: '/ec-coupon/activity/getPagedActivityExt',
    data
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