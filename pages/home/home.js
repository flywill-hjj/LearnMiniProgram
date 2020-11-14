//getApp()获取app()产生的示例对象
// const app = getApp()
// const name = app.globalData.name
// const age = app.globalData.age

//注册一个页面
//页面也要自己的生命周期
Page({
  //---------2初始化数据-------------
  data: {
    message: '哈哈哈',
    list: []
  },

  //---------1监听页面的生命周期函数-----------
  //页面被加载处理
  onLoad() {
    console.log('onLoad');
    wx.request({
      url: 'http://152.136.185.210:8000/api/w6/recommend',
      success: (res) => {
        console.log(res);
        const data = res.data.data.list;
        this.setData({
          list: data
        })
      }
    })
  },
  //页面显示出来时
  onShow() {
    console.log('onShow');
  },
  //页面初次渲染完成时
  onReady() {
    console.log('onReady');
  },
  //页面隐藏起来时
  onHide() {
    console.log('onHide');
  },
  onUnload() {
    console.log('onUnload');
  },

  //---------3.监听wxml中相关的一些事情-----------
  handleGetUserInfo(event) {
    console.log(event);
  },


  //---------4.监听其他事件------------------
  //监听页面的滚动
  onPageScroll(obj){
    // console.log(obj);
  },
  //监听我们的页面滚动到底部
  onReachBottom(){
    console.log('页面滚动到底部');
  },
  onPullDownRefresh(){
    console.log('下拉刷新');
  }
})




//编程范式：
//1.命令式编程：原生操作DOM
//2.声明式编程：Vue/React/Angular