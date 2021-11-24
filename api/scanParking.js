// 银行卡详情
export const enter = (data) => {
  return wx.$post_business({
    url: '/vehicle-parking/scan_park/enter',
    data
  })
}