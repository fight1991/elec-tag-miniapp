import './publicBag/request/fetch' // 一般请求方法注册
import './publicBag/request/fetch_all' // 批量请求注册
import messageBox from './publicBag/plugin/messageBox' // 弹框注册
import initMapSdk from './publicBag/plugin/initMapSdk' // 地图sdk注册
import getSystemBarInfo from './publicBag/plugin/getSystemBarInfo' // 获取导航栏navbar高度信息
import getCurrentPosition from './publicBag/plugin/getCurrentPosition' // 获取经纬度信息
import resolveGeocoder from './publicBag/plugin/reverseGeocoder' // 解析经纬度信息
import getWechatCode from './publicBag/plugin/getWechatCode' // 获取微信code
import * as utils from './publicBag/utils/util' // 工具类注册
// 监听位置信息
import positionNotify from './notify/positionNotify'
// 全局分享函数
import share from './sharePage/index'
// api导入
import api from './api/index'
// store
import store from './store/index'
share()
App({
  onLaunch() {
    this.getSafeData()
  },
  utils, // 绑定公共方法
  api, // 绑定api
  messageBox, // 绑定全局弹框
  ...positionNotify, // 监听位置信息
  ...initMapSdk, // 初始化地图sdk
  ...getSystemBarInfo, // 获取导航栏高度信息
  ...getCurrentPosition, // 获取经纬度信息
  ...resolveGeocoder, // 解析经纬度
  ...getWechatCode, // 获取jscode信息
  ...store
})
