Component({
	properties: {
		// 容器高度
		height: {
			type: String,
			value: '100vh'
		},
		// 加载中
		loading: {
			type: Boolean,
			value: false,
			observer: 'loadingEnd',
		},
		hasMore: {
			type: Boolean,
			value: true,
		},
		// 当前列表长度
		listCount: {
			type: Number,
			value: 0,
		},
		// 下拉刷新的高度
		refreshSize: {
			type: Number,
			value: 90
		},
		// 顶部高度
		topSize: {
			type: Number,
			value: 0,
		},
		// 底部高度
		bottomSize: {
			type: Number,
			value: 0,
		},
		// 颜色
		color: {
			type: String,
			value: ""
		},
    // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
    enableBackToTop: {
      type: Boolean,
      value: false
    }
	},
	data: {
		/* 未渲染数据 */
		mode: 'refresh', // refresh 和 more 两种模式
		successShow: false, // 显示success
		successTran: false, // 过度success
		refreshStatus: 1, // 1: 下拉刷新, 2: 松开更新, 3: 加载中, 4: 加载完成
		move: -65, // movable-view 偏移量
		scrollHeight1: 0, // refresh view 高度负值
		scrollHeight2: 0, // refresh view - success view 高度负值
		timer: null,

		/* 渲染数据 */
		scrollTop: 0,
		overOnePage: false
	},
	methods: {
		/**
		 * 处理 bindscrolltolower 失效情况
		 */
		scroll(e) {
			// 可以触发滚动表示超过一屏
			this.setData({
				overOnePage: true
			});
			clearTimeout(this.data.timer);
			this.setData({
				timer: setTimeout(() => {
					this.setData({
						scrollTop: e.detail.scrollTop
					})
				}, 100)
			});
		},
		/**
		 * movable-view 滚动监听
		 */
		change(e) {
			let refreshStatus = this.data.refreshStatus,
				diff = e.detail.y;

			if (refreshStatus >= 3) return;

			if (diff > -10) {
				this.setData({
					refreshStatus: 2
				});
			} else {
				this.setData({
					refreshStatus: 1
				});
			}
		},
		/**
		 * movable-view 触摸结束事件
		 */
		touchend() {
			let refreshStatus = this.data.refreshStatus;

			if (refreshStatus >= 3) return;

			if (refreshStatus === 2) {
				wx.vibrateShort();
				this.setData({
					refreshStatus: 3,
					move: 0
				});
				this.triggerEvent('refresh');
			} else if (refreshStatus === 1) {
				this.setData({
					move: this.data.scrollHeight1
				});
			}
		},
		/**
		 * 加载更多
		 */
		more() {
			this.triggerEvent('more')
		},
		/**
		 * 监听 loading 字段变化, 来处理下拉刷新对应的状态变化
		 */
		loadingEnd(newVal, oldVal) {
			console.log(newVal)
			if (oldVal === true && newVal === false) {
				// setTimeout(() => {
				// 	this.setData({
				// 		successShow: true,
				// 		refreshStatus: 4,
				// 		move: this.data.scrollHeight2
				// 	});
				// 	setTimeout(() => {
				// 		this.setData({
				// 			successTran: true,
				// 			move: this.data.scrollHeight1
				// 		});
				// 		setTimeout(() => {
				// 			this.setData({
				// 				refreshStatus: 1,
				// 				successShow: false,
				// 				successTran: false,
				// 				move: this.data.scrollHeight1
				// 			});
				// 		}, 350)
				// 	}, 1500)
				// }, 600)
				this.setData({
					refreshStatus: 1,
					move: this.data.scrollHeight1
				})
			} else {
				if (this.data.refreshStatus !== 3) {
					this.setData({
						refreshStatus: 3,
						move: 0
					});
				}
			}
		},
		/**
		 * 初始化scroll组件参数, 动态获取 下拉刷新区域 和 success 的高度
		 */
		init() {
			let {windowWidth} = wx.getSystemInfoSync();
			let successHeight = (windowWidth || 375) / 750 * 70;

			this.createSelectorQuery().select("#refresh").boundingClientRect((res) => {
				console.log(successHeight, res.height)
				this.setData({
					scrollHeight1: -res.height,
					scrollHeight2: successHeight - res.height
				});
			}).exec();
		},
	},
	ready() {
		this.init();
	}
});
