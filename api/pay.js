// 支付相关
// 查找符合条件的卡券列表
export const getPayCouponList = ({ data, page }) => {
  return wx.$post_business({
    url: '/ec-coupon/trade-coupon/getPagedCouponList',
    data,
    page
  })
}