const TOKEN = 'token';

App({
  //对象：小程序关闭掉
  globalData: {
    token: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //1.先从缓存中取出我们的token
    const token = wx.getStorageSync(TOKEN);

    //2.判断token是否有值
    if (token && token.length != 0) { //已经有token,验证token是否过期
      this.check_token(token) //验证token是否过期
    } else { //没有token，进行登录操作
      this.login()
    }

    //登录操作

  },
  check_token(token) {
    console.log('执行了验证token的操作');
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'POST',
      header: {
        token
      },
      success: (res) => {
        if (!res.data.errCode) {
          console.log('token有效');
          this.globalData.token = token
        } else {
          this.login();
        }
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  login() {
    console.log('验证登录的操作');
    wx.login({
      //code只有只有5分钟的有效期
      success: (res) => {
        //1.获取code
        const code = res.code

        //2.将code发送给我们的服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'POST',
          data: {
            code
          },
          success: (res) => {
            console.log(res);
            //1取出token
            const token = res.data.token
            //2.将token保持在globaData中
            this.globalData.token = token;
            //3.进行本地存储
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  }
})