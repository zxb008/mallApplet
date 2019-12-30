// pages/cart/index.js
import {
  wxGetSetting,
  wxAddress,
  wxOpenSetting
} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null
  },
  getAddress() {
    wxGetSetting().then((result1) => {
      const scopeAddress = result1.authSetting['scope.address']
     
      if (scopeAddress === false) {
        wxOpenSetting();
      }
      // undefined 和 true 的两种情况下，尝试获取地址
      //仔细思考undefined会出现什么情况呢？
      
      wxAddress().then((result2) => {
        wx.setStorageSync('address', result2)
      },(error2)=>{
        console.log(error2);
      })
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
    const address = wx.getStorageSync('address')
    console.log(address);
    this.setData({
      address
    })
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