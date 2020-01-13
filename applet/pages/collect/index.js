// pages/goods_list/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collects:[],
    id: 1,
    tabsList: [
      {
        id: 1,
        label: '收藏店铺',
        active: true
      },
      {
        id: 2,
        label: '收藏商品',
        active: false
      },
      {
        id: 3,
        label: '关注商品',
        active: false
      },
      {
        id: 4,
        label: '我的足迹',
        active: false
      }
    ]
  },
  navigatorGoodDetail(e){
    wx.navigateTo({
      url: '/pages/goods_detail/index?gid='+e.currentTarget.dataset.gid,
    })
  },
  setTabTrue(id){
    let { tabsList } = this.data;
    tabsList.forEach(item => {
      if (item.id === id) {
        item.active = true
      } else {
        item.active = false
      }
    });
    this.setData({
      tabsList,
      id
    })
  },
  setTab(e) {
    this.setTabTrue(e.detail.id)
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
    const collects = wx.getStorageSync('collects') || [];
    this.setData({
      collects
    })
    const Pages = getCurrentPages();
    const currPage = Pages[Pages.length - 1];
    const { type } = currPage.options
    this.setTabTrue(Number(type))
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