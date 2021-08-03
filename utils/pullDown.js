export default {
  constructPullData () {
    return {
      scroll: {
        pagination: {
          page: 1,
          totalPage: 10,
          limit: 10,
          length: 100
        },
        empty: {
          img: 'http://coolui.coolwl.cn/assets/mescroll-empty.png'
        },
        refresh: {
          type: 'default',
          style: 'black',
          background: "#000"
        },
        loadmore: {
          type: 'default',
          icon: 'http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif',
          background: '#f2f2f2',
          // backgroundImage: 'http://coolui.coolwl.cn/assets/bg.jpg',
          title: {
            show: true,
            text: '加载中',
            color: "#999",
            shadow: 5
          }
        }
      },
    }
  }
}