// pages/category/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContainList:[],
    cates:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    this.getCates()
  },
  getCates(){
    request({
      url:'/categories',
      method:'GET'
    }).then((result) => {
      this.setData({
        cates: result
      })
      //下面这样写是错误的，除非是在data同级定义了一个  cates:[],但是这种定义的方式是无法渲染到页面上去的，只能在js的逻辑层使用
      // console.log(this.cates);
      let leftMenuList = this.data.cates.map(item=>item.cat_name)
      let  rightContainList = this.data.cates[0].children
      //赋值给left的菜单和右边的内容区
      this.setData({
        leftMenuList,
        rightContainList
      })
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