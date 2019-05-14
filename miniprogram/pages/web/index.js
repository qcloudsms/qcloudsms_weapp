// pages/web/index.js
Page({
  data: {
    url: [
      'https://cloud.tencent.com/document/product/382/18071',
      'https://cloud.tencent.com/document/product/382/13444',
      'https://cloud.tencent.com/document/product/382/8414',
      'https://cloud.tencent.com/document/product/382/13297',
      'https://cloud.tencent.com/document/product/382/5804',
      'https://cloud.tencent.com/document/product/382/9559'
    ],
    coypLink: ''
  },
  onLoad: function (options) {
    let id = options.id || 0
    this.setData({
      coypLink: this.data.url[id]
    })

    // 设置页面导航条颜色 优化页面显示
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fff'
    })
  }
})