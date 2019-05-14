// /pages/login/index.js
Page({
    data: {
        redirect_url: '',
        modal_show: false,
        loadModal: false
    },

    handleBackIndex() {
        wx.reLaunch({
            url: '/pages/index/index'
        })
    },

    handleLogin(res) {
        console.log(res)
        let self = this
        if (res.detail.userInfo) {
            wx.setStorageSync('avatarUrl', res.detail.userInfo.avatarUrl)
            wx.setStorageSync('nickName', res.detail.userInfo.nickName)
            self.setData({
                loadModal: true
            })
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    console.log('[云函数] [login] user openid: ', res.result.openid)
                    wx.setStorageSync('openId', res.result.openid)
                    self.setData({
                        loadModal: false
                    })

                    // 登录成功后的操作， 一般是回到原页面继续流程
                    if (self.data.redirect_url) {
                        wx.reLaunch({
                            url: self.data.redirect_url
                        })
                    } else {
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                }
            })
        } else {
            this.setData({
                modal_show: true
            })
        }
    },

    handleModal() {
        this.setData({
            modal_show: false
        })
    },

    onLoad: function (options) {
        let self = this
        self.setData({
            redirect_url: decodeURIComponent(options.redirect_url)
        })
    }
})