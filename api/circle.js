/***********商圈相关api */
// 加油站详情
export const oilDetail = (data) => {
  return wx.$post_business({
    url: '/energy-supply/oil/getOil',
    data
  })
}
// 加油站列表
export const oilList = ({ data, page }) => {
  return wx.$post_business({
    url: '/energy-supply/oil/getOilList',
    data,
    page
  })
}