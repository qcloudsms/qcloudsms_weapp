//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '',
    pageHeight: '',
    phoneStatus: false,
    verifyStatus: false,
    loginStatus: false,
    verifyButtonText: '获取',
    phone: '',
    verify: '',
    second: 60,
    verifyCount: 0
  },

  onLoad: function () {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      pageHeight: app.globalData.pageHeight
    })
  },

  hindleInputPhone: function (e) {
    let phone = e.detail.value
    if (phone.length === 11) {
      if (this.checkPhone(phone)) {
        wx.hideKeyboard()
        this.setData({
          phone: phone
        })
        this.showVerifyButton()
      } else {
        wx.showToast({
          title: '手机号格式异常',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      this.setData({
        phone: phone,
        phoneStatus: false
      })
    }
  },

  hindleSendVerify: function () {
    console.log('获取验证码')
    let self = this
    self.setData({
      phoneStatus: false
    })
    wx.cloud.callFunction({
      name: 'sendsms',
      data: {
        phone: this.data.phone
      },
      success: res => {
        console.log(res)
        if (res.result) {
          wx.showToast({
            title: res.result.msg,
            icon: 'none',
            duration: 1500,
          })
          if (res.result.code === 0) {
            this.setData({
              phoneStatus: false,
              verifyStatus: true,
              verifyCount: this.verifyCount + 1,
              verify: ''
            })
            this.timer()
          } else {
            self.setData({
              phoneStatus: true
            })
          }
        } else {
          wx.showToast({
            title: '验证码发送失败',
            icon: 'none',
            duration: 1500
          })
          self.setData({
            phoneStatus: true
          })
        }
      }
    })
  },

  handleInputVerify: function (e) {
    let verify = e.detail.value
    if (verify.length === 6) {
      this.setData({
        verify: verify,
        loginStatus: true
      })
      wx.hideKeyboard()
    }

  },

  handleLogin: function () {
    let self = this
    self.setData({
      loginStatus: false
    })
    let phone = this.data.phone
    let verify = this.data.verify
    wx.cloud.callFunction({
      name: 'checksms',
      data: {
        phone,
        verify
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: res.result.msg,
          icon: 'none',
          duration: 1500
        })
        if (res.result.code === 0) {
          wx.reLaunch({
            url: '../cloud/index',
          })
        } else {
          self.setData({
            loginStatus: true
          })
        }
      }
    })
  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            verifyButtonText: `${this.data.second - 1}  s`,
            second: this.data.second - 1,
          })
          if (this.data.second <= 0) {
            if (this.checkPhone(this.data.phone)) {
              this.setData({
                second: 60,
                verifyButtonText: '获取',
                phoneStatus: true
              })
            } else {
              this.setData({
                second: 60,
                verifyButtonText: '获取',
                phoneStatus: false,
                verifyStatus: false
              })
            }
            resolve(setTimer)
          }
        }, 1000
      )
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  showVerifyButton: function () {
    if (this.data.verifyButtonText === '获取') {
      this.setData({
        phoneStatus: true
      })
    }
  },

  checkPhone: function (phone) {
    let str = /^1\d{10}$/
    if (str.test(phone)) {
      return true
    } else {
      return false
    }
  }
})
