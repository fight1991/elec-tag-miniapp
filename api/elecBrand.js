
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

// 行驶证ocr识别
export const licenseOcr = (data) => {
  return wx.$post_business({
    url: '/user-center/ocr/vehicleLicense',
    data,
    loadingText: '识别中'
  })
}
// 获取车辆信息
export const getCarInfo = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/vehicle/getInfo',
    data
  })
}
// 获取车辆列表
export const getCarList = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/vehicle/list',
    data
  })
}
// 获取未绑定电子车牌的车牌列表
export const getUnbindList = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/vehicle/plateNoList',
    data
  })
}
// 移除车辆
export const deleteCar = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/vehicle/remove',
    data
  })
}
// 行驶证认证并申领电子车牌
export const verifyLicense = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/vehicle/certification',
    data
  })
}
// 选择安装方式
export const selectInstallType = (data) => {
  return wx.$post_business({
    url: '/vehicle-management/evi/installation',
    data
  })
}
