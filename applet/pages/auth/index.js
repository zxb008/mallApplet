// pages/auth/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //得到用户的信息来获取token
  handleGetUserInfo(e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    wx.login({
      success: (res) => {
        if (res.code) {
          const { code } = res
          const params = { encryptedData, rawData, iv, signature, code }
          request({
            url:"/users/wxlogin",
            data: params,
            method: "post"
          }).then(
            (res) => {
              const { token } = res
              wx.setStorageSync('token', token)
              wx.navigateBack({
                delta: 1 // 回退前 delta(默认为1) 页面
              })
            }
          )
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})