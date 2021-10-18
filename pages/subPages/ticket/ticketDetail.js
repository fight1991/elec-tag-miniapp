// pages/subPages/ticket/ticketDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTitle: {
            get: '优惠券',
            use: '我的卡券'
        },
        params:{
            pageOrigin: 'use', // get领券 use立即使用
            couponId: '',
            orgId: '',
            goodsId: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
     onLoad: async function (options) {
        let { pageOrigin, couponId, orgId='', goodsId='' } = options
        console.log('options', pageOrigin, couponId);
        
        wx.setNavigationBarTitle({
          title: this.data.pageTitle[pageOrigin]
        })
        let obj = this.data.params
        obj.pageOrigin = pageOrigin
        obj.couponId = couponId
        obj.orgId = orgId
        obj.goodsId = goodsId
        this.setData({
            params: obj
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})