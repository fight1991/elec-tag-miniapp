# ele_bicycle
汽车电子标识发卡系统微信小程序项目
# 说明
> 1. 在app.json中注册全局的自定义组件 usingComponents
# 分包原则
> 1. 按照业务功能划分
> 2. tabBar入口页面无需分包, 放在app主包, 以外的页面放在subPages
# 目录说明
+ api -- 公共api
+ config -- api域名
+ pages -- 页面文件夹
  + main -- tabBar首页
  + circle -- tabBar商圈
  + my -- tabBar我的
  + subPages -- tabBar中的子页面放置位置
  + index -- 初始化入口页面
  + login -- 登录页面
  + components -- 公共组件
  + image -- 图片静态资源
  + style -- 公共样式
  + wxs -- wxml中引用的方法
+ utils -- 公共方法/工具文件夹
  + fetch_all.js 处理批量请求
  + fetch_fun.js 网络请求公共方法
  + fetch_upload.js 上传相关请求
  + fetch.js 网络请求
  + fetchInit 网络请求实例化
  + messageBox.js 微信toast框封装 app.messageBox.common('hello world')
  + util.js 日期格式化等其它通用工具
  + weapp-qrcode.js 小程序端生成二维码
  + WxValidate.js 校验工具
+ app.js 入口文件
  ` 将api, 网络请求方法绑定到app上, 通过getApp()得到实例 `
+ app.json app配置文件
+ app.wxss 全局样式

# 常用全局组件
+ upload 上传
+ mask 遮罩
+ nodata 暂无数据
+ iconfont 字体图标
+ fixBtn 固定在页面最下方按钮
+ commonBtn 普通按钮
+ searchInput 搜索框
# 官方扩展组件
` 根据实际业务要求, 参考官方扩展组件https://developers.weixin.qq.com/miniprogram/dev/extended/ `
