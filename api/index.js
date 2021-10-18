// 上传api注册
import * as uploadApi from './upload'
// 用户相关api注册
import * as usersApi from './user'
// 电子车牌相关
import * as elecApi from './elecBrand'
// 银行卡相关
import * as bankApi from './bank'
// 字典相关api
import * as dictApi from './dictionary'
// 商圈api
import * as circleApi from './circle'
// 优惠券api
import * as couponApi from './coupon'
export default {
  ...uploadApi, // 上传相关
  ...usersApi, // 用户相关
  ...elecApi, // 电子车牌相关
  ...bankApi, // 银行卡相关
  ...dictApi, // 字典相关
  ...circleApi, // 商圈相关
  ...couponApi // 优惠券相关
}
