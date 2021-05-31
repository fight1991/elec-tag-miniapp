
// 电子车牌申领
export const evi_apply = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/apply',
    data
  })
}
// 电子车牌 绑定电子车牌
export const evi_bind = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/bind',
    data
  })
}
// 电子车牌 获取信息
export const evi_info = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/getInfo',
    data
  })
}
// 电子车牌 获取照片
export const evi_getPic = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/getPic',
    data
  })
}
// 电子车牌 上传保存图片信息
export const evi_uploadPic = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/uploadPic',
    data
  })
}

// 获取网点列表
export const point_list = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/branch/list',
    data
  })
}