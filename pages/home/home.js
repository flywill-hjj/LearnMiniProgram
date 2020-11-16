// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    score: 45,
    movies:['海王','海贼王','海尔兄弟','海盗船']
  },
  handleSwitchShow() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  handleIncrenment(){
    this.setData({
      score: this.data.score + 6
    })
  }
})