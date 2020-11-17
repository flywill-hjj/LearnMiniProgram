// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counter: 0,
    isShow: true
  },
  handleChangeShow() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  increment(event) {
    console.log(event.detail.name);
    console.log(event.detail.age);

    this.setData({
      counter: this.data.counter + 1
    })
  },
  tabControlClick(event) {
    // console.log(event);
  },
  handleIncrementCpn() {
    //最终目的:修改my-sel中的counter
    //1.获取组件对象
    const my_sel = this.selectComponent("#sel-id");

    //2.通过setData修改组件中的数据(不合理)
    // my_sel.setData({
    //   counter : my_sel.data.counter + 1
    // })

    //3.通过方法对数据进行修改
    my_sel.incrementCounter(1)
  }
})