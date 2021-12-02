
// 扫码初始化
export const scanInit = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/scan-park/init',
    data
  })
}
// 入场
export const enterScan = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/scan-park/enter',
    data
  })
}
// 出场
export const outScan = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/scan-park/exit',
    data
  })
}
// 出场支付
export const outScanPay = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/scan-park/pay',
    data
  })
}
