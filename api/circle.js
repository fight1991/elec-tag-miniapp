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
// 附近的停车场 -列表
export const parkingList = ({ data, page }) => {
  return wx.$post_business({
    url: '/vehicle-parking/parking/getParkingList',
    data,
    page
  })
}
// 附近的停车场 -详情
export const parkingDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/parking/getParking',
    data
  })
}
// 停车记录-停车记录单
export const recordList = ({ data, page }) => {
  return wx.$post_business({
    url: '/vehicle-parking/parking-order/getParkingOrderList',
    data,
    page
  })
}
// 停车记录-停车记录单详情
export const recordDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/parking-order/getParkingOrder',
    data
  })
}
// 洗车 - 商户详情
export const washShopDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/car-wash/getOrg',
    data
  })
}
// 洗车 - 商户商品详情
export const washGoodsDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/car-wash/getOrgGoods',
    data
  })
}
// 洗车 - 列表
export const washList = ({ data, page }) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/car-wash/getOrgList',
    data,
    page
  })
}
// 维保 - 商户详情
export const maintShopDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/upkeep/getUpkeep',
    data
  })
}
// 维保 - 商户商品详情
export const maintGoodsDetail = (data) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/upkeep/getUpkeepGoods',
    data
  })
}
// 维保 - 列表
export const maintList = ({ data, page }) => {
  return wx.$post_business({
    url: '/vehicle-upkeep/upkeep/getUpkeepList',
    data,
    page
  })
}