
// 根据8位卡号查询属于哪家银行
export const whichBank = (data) => {
  return wx.$post_business({
    url: '/user-center/bankCard/cardbinInfo',
    data
  })
}
// 银行卡详情
export const bankCardDetail = (data) => {
  return wx.$post_business({
    url: '/user-center/bankCard/cardDetail',
    data
  })
}
// 获取银行卡绑定验证码
export const bankCardCode = (data) => {
  return wx.$post_business({
    url: '/user-center/bankCard/create',
    data
  })
}
// 用户银行卡列表
export const bankCardList = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/bankCard/list',
    data,
    page
  })
}
// 解绑银行卡
export const bankCardUnbind = (data) => {
  return wx.$post_business({
    url: '/user-center/bankCard/unbind',
    data
  })
}

// 启用禁用银行
export const userDisabledBank = (data) => {
  return wx.$post_business({
    url: '/user-center/configBank/changeEnable',
    data
  })
}
// 查询支持的银行
export const supportBankList = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/configBank/list',
    data,
    page
  })
}
// 编辑银行卡
export const bankCardEdit = (data) => {
  return wx.$post_business({
    url: '/user-center/configBank/modify',
    data
  })
}
// OCR识别银行卡
export const OCR_bankCard = (data) => {
  return wx.$post_business({
    url: '/user-center/ocr/bankcard',
    data
  })
}
