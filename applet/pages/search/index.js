// pages/search/index.js
import { request } from '../../request/index'
import { debounce } from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    value:""
  },
  timer:-1,
  clearContain() {
    this.setData({
      goods: [],
      value:""
    })
  },
  handNav(e) {
    wx.navigateTo({
      url: '/pages/goods_detail/index?gid=' + e.currentTarget.dataset.gid,
    })
  },
  getGoods(query) {
    request({
      url: '/goods/qsearch',
      data: {
        query
      }
    }).then((res) => {
      this.setData({
        goods: res
      })
    })
  },
  handleSearch(e) {
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        goods: []
      })
      return;
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.getGoods(value)
    },2500)
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