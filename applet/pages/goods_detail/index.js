// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollect:false,
    modalName: null,
    goods_detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  params: {
    goods_id: null
  },
  imageList: [],
  handleCollect(){
    let isCollect = false;
    let collects = wx.getStorageSync('collects') || []
    let index = collects.findIndex(item=>item.goods_id === this.data.goods_detail.goods_id)
    if (index !== -1) {
      //已经收藏过该商品，那么应该删除
      collects.splice(index,index)
      wx.showToast({
        title: '取消成功',
        icon: 'none',
        duration: 2000
      })
      isCollect = false;
    } else {
      //没有收藏过该商品，添加
      collects.push(this.data.goods_detail)
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration: 2000
      })
      isCollect = true;
    }
    this.setData({
      isCollect
    })
    wx.setStorageSync('collects', collects)
  },
  getGoodDetail() {
    request({
      url: '/goods/detail',
      data: this.params
    }).then((result) => {
      this.imageList = result.pics
      result.goods_introduce = result.goods_introduce.replace(/\.webp/g, '.jpg')
      let collects = wx.getStorageSync('collects') || []
      let isCollect = collects.some(item => item.goods_id === result.goods_id)
      this.setData({
        goods_detail: result,
        isCollect
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
  navigatorCart(e) {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  addShop() {
    //添加购物车，购物车肯定是一个对象数组
    let carts = wx.getStorageSync('carts') || []
    let index = carts.findIndex(cart => cart.goods_id === this.data.goods_detail.goods_id)
    if (index !== -1) {
      carts[index].num++
      this.setData({
        goods_detail: carts[index]
      })
    } else {
      let { goods_detail } = this.data
      goods_detail.num = 1
      goods_detail.checked = true
      this.setData({
        goods_detail
      })
      carts.push(goods_detail)
    }
    wx.setStorageSync('carts', carts)
  },
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
    const Pages = getCurrentPages();
    const currPage = Pages[Pages.length - 1];
    const { gid } = currPage.options;
    let carts = wx.getStorageSync('carts') || []
    let index = carts.findIndex(cart => cart.goods_id === Number(gid))
    if (index !== -1) {
      let collects = wx.getStorageSync('collects') || []
      let isCollect = collects.some(item => item.goods_id === carts[index].goods_id)
      this.setData({
        goods_detail: carts[index],
        isCollect
      })

    } else {
      this.params.goods_id = gid
      this.getGoodDetail()
    }

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