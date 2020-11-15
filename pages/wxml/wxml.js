// pages/wxml/wxml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "你好小程序",
    firstname: 'kobe',
    age: 20,
    nowTime: new Date().toLocaleString(),
    isActive: false
  },
  onLoad() {
    setInterval(() => {
      this.setData({
        nowTime: new Date().toLocaleString()
      })
    }, 1000)
  },
  handleSwitchColor() {
    this.setData({
      isActive: !this.data.isActive
    })
  }
})