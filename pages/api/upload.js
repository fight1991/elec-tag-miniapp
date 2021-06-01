// 文件上传相关api
// 每次上传之前都要获取上传的凭证
export const upload_token = () => {
  return wx.$post_business({
    url: '/user-center/token/getUploadToken',
    loadingText: '请求上传...'
  })
}
// 私有上传
export const upload_private = (uploadToken, filePath) => {
  var app = getApp()
  var accountId = app.globalData.userInfo.accountId
  return wx.$upload({
    url: '/service-oss/upload/uploadPrivate',
    data: {
      uploadToken,
      filePath,
      accountId
    }
  })
}
// 共享上传
export const upload_public = (uploadToken, filePath) => {
  return wx.$upload({
    url: '/service-oss/upload/uploadPublic',
    data: {
      uploadToken,
      filePath
    }
  })
}
// 获取文件token 并上传图片得到文件服务器中的地址
export const upload_func_private = async (filePath) => {
  let { result: token } = await upload_token()
  if (!token || other) return null
  let { result: res2 } = await upload_private(token, filePath)
  if (!res2) return null  
  return res2
}
export const upload_func_public = async (filePath) => {
  let { result: token, other } = await upload_token()
  if (!token || other) return null
  let { result: res2 } = await upload_public(token, filePath)
  if (!res2) return null
  return res2
}