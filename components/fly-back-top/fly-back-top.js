// components/fly-back-top/fly-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBackTop() {
      //回到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    }
  }
})