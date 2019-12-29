// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    goods_detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  params: {
    goods_id: null
  },
  imageList:[],
  getGoodDetail() {
    request({
      url: '/goods/detail',
      data: this.params
    }).then((result) => {
      this.imageList = result.pics
      result.goods_introduce = result.goods_introduce.replace(/\.webp/g, '.jpg')
      this.setData({
        goods_detail: result
      })
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  handlePrevireImage(e) {
    const urls = this.imageList.map(item => item.pics_mid_url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  navigatorCart(e){
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  onLoad: function (options) {
    this.params.goods_id = options.gid
    this.getGoodDetail()
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