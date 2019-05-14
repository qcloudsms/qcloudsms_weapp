//app.js
App({
  onLaunch: function (path) {
    let query = ''
    let redirect_url = ''

    // 判断基础库是否支持云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // Color UI Custom 
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.pageHeight = e.windowHeight - custom.bottom - custom.top + e.statusBarHeight
      }
    })

    // 解析URL中是否带有参数，若有则拼接成字符串
    for (let i in path.query) {
      if (i) {
        query = `${query}${i}=${path.query[i]}&`
      }
    }
    if (query) {
      redirect_url = `${path.path}?${query}`
    } else {
      redirect_url = path.path
    }

    // 判断用户登录态， 可有多种判断，此仅为例子
    if (!wx.getStorageSync('openId')) {
      // 倘若该用户未登录则跳转到登录页， 并且带上登录成功之后的返回地址
      wx.reLaunch({
        url: '/pages/login/index?redirect_url=' + encodeURIComponent(`/${redirect_url}`)
      })
      return
    }
  },
  globalData: {
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  }
})
