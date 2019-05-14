// pages/cloud/index.js
const app = getApp()

Page({
  data: {
    pageHeight: '',
    copyId: 0
  },
  onLoad: function () {
    this.setData({
      pageHeight: app.globalData.pageHeight
    })
  },

  CopyLink(e) {
    let id = e.currentTarget.dataset.id || this.data.copyId
    this.setData({
      copyId: id
    })
    wx.navigateTo({
      url: '/pages/web/index?id=' + id
    })
  },
})