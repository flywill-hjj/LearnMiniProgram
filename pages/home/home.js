// pages/home/home.js
const app = getApp()
app.globalData.token
Page({
  handleShowToast() {
    wx.showToast({
      title: '加载中',
      duration: 3000,
      icon: 'loading',
      mask: true,
      success: function () {
        console.log('展示弹窗成功');
      },
      fail: function () {
        console.log('展示弹窗失败');
      },
      complete: function () {
        console.log('接口调用结束的回调函数（调用成功、失败都会执行）');
      }
    })
  },
  handleShowMondal() {
    wx.showModal({
      title: '我是标题',
      content: '我是内容,哈哈哈',
      // showCancel: false,   //取消
      success: function (res) {
        console.log(res);
        if (res.cancel) {
          console.log('用户点击了取消按钮');
        }
        if (res.confirm) {
          console.log('用户点击了确定按钮');
        }
      },
      cancelText: '退出',
      cancelColor: 'red'
    })
  },
  handleShowLoading() {
    wx.showLoading({
      title: '加载ing',
      mask: true,
    })

    setTimeout(() => {
      //必须手动hideLoading才会让loading消失
      wx.hideLoading()
    }, 1000);
  },
  handleShowActionSheet() {
    wx.showActionSheet({
      itemList: ['相册', '拍照'],
      itemColor: 'red',
      success: function (res) {
        console.log(res);
      }
    })
  },
  onShareAppMessage: function (options) {
    return {
      title: '你好啊，李银河',
      path: '/pages/about/about',
      imageUrl: 'http://s3.mogucdn.com/mlcdn/c45406/170915_0a93207ci28kelh617k4hh62l65lb_640x960.jpg'
    }
  }
})