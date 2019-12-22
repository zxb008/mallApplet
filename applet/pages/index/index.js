import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur:0,
    swiperList:[],
    navigationList:[],
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //得到轮播图数据
    this.getSwiper()
    //得到导航信息
    this.getNavigation()
    //得到楼层信息
    this.getFloor()
  },
  getSwiper(){
    request({
      url:'/home/swiperdata',
      method:'GET'
    }).then((result)=>{
      this.setData({
        swiperList: result.reverse()
      })
    })
  },
  getNavigation(){
    request({
      url: '/home/catitems',
      method: 'GET'
    }).then((result) => {
      this.setData({
        navigationList: result
      })
    })
  },
  getFloor(){
    request({
      url:'/home/floordata',
      method:'GET'
    }).then((result)=>{
      this.setData({
        floorList: result.reverse()
      })
     
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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