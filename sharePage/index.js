export default () => {
  //获取页面配置并进行页面分享配置
  var PageTmp = Page
  Page = function(pageConfig) {
    let view = Page
    //全局开启分享
    pageConfig = Object.assign({
      onShareAppMessage: function(e) {
        return {
          title: '航天吉光智行平台',
          path: '/pages/index/index',
          imageUrl: '/pages/image/share.png'
        }
      }
    }, pageConfig);
    //3. 配置页面模板
    PageTmp(pageConfig);
  }
}