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
        label: '综合',
        active: true
      },
      {
        id: 2,
        label: '销量',
        active: false
      },
      {
        id: 3,
        label: '价格',
        active: false
      },
      {
        id: 4,
        label: '口碑',
        active: false
      }
    ]
  },
  setTab(e) {
    // for (let i = 0; i <  this.data.tabList.length; i++) {
    //   this.data.tabList[i].active = false
    // }
    // this.data.tabList[e.detail.id-1].active = true
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
  totalPage:1,
  params : {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //跳转页面
  navigatorGoodDetail(e){
    wx.navigateTo({
      url: '/pages/goods_detail/index?gid='+e.currentTarget.dataset.gid,
    })
  },
  //获取商品列表
  getGoodList() {
    request({
      url: '/goods/search',
      data: this.params
    }).then((result => {
      this.totalPage = Math.ceil(result.total/this.params.pagesize)
      // let goodList = this.data.goodList.concat(result.goods)
      this.setData({
        goodList:[...this.data.goodList,...result.goods]
      })
      wx.stopPullDownRefresh()
    }))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid || "";
    this.params.query = options.query || "";
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