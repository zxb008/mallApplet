// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
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
    this.getOrderList(e.detail.id)
  },
  getOrderList(type){
    request({
      url:'/my/orders/all',
      data:{type}
    }).then((res)=>{
      if (res) {
        this.setData({
          orderList:res.orders.map(item=>({...item,"create_time_cn":(new Date(item.create_time*1000).toLocaleString())}))
        })
      }else{
        console.log(res);
      }
    },(error)=>{
      console.log(error);
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
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return ;
    }
    //然后根据页面栈来得到传递给这个页面的参数
    const Pages = getCurrentPages();
    const currPage = Pages[Pages.length - 1];
    const { type } = currPage.options
    this.setTabTrue(Number(type))
    this.getOrderList(type)
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