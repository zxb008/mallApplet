// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    id: 1,
    tabsList: [
      {
        id: 1,
        label: '全部',
        active: true
      },
      {
        id: 2,
        label: '待付款',
        active: false
      },
      {
        id: 3,
        label: '待收货',
        active: false
      },
      {
        id: 4,
        label: '退款/退货',
        active: false
      }
    ]
  },
  setTab(e) {
    let { tabsList } = this.data;
    tabsList.forEach(item => {
      if (item.id === e.detail.id) {
        item.active = true
      } else {
        item.active = false
      }
    });
    this.setData({
      tabsList,
      id: e.detail.id
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid;
    this.getGoodList()
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
    this.setData({
      goodList:[]
    })
    this.params.pagenum = 1
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.params.pagenum++;
    if (this.params.pagenum > this.totalPage) {
      wx.showToast({
        title: '人家也是有底线的!!!',
        icon: 'none',
        image:'../../images/cry.png',
        mask:true,
        duration: 2000
      })
    }else{
      this.getGoodList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})