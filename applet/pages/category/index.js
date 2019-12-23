// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
// const regeneratorRuntime = require('../../lib/runtime/runtime')
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currIndex: 0,
    scrollTop: 0,
    leftMenuList: [],
    rightContainList: [],
    cates: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    const cates = wx.getStorageSync('cates')
    if (!cates.data) {
      //不存在
      this.getCates()
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates()
      } else {
        this.setData({
          cates: cates.data
        })
        let leftMenuList = this.data.cates.map(item => item.cat_name)
        let rightContainList = this.data.cates[0].children
        //赋值给left的菜单和右边的内容区
        this.setData({
          leftMenuList,
          rightContainList
        })
      }
    }

  },
  async getCates() {
    // request({
    //   url: '/categories',
    //   method: 'GET'
    // }).then((result) => {
    //   //存入缓存
    //   wx.setStorageSync('cates', { time: Date.now(), data: result })

    //   this.setData({
    //     cates: result
    //   })
    //   //下面这样写是错误的，除非是在data同级定义了一个  cates:[],但是这种定义的方式是无法渲染到页面上去的，只能在js的逻辑层使用
    //   // console.log(this.cates);
    //   let leftMenuList = this.data.cates.map(item => item.cat_name)
    //   let rightContainList = this.data.cates[0].children
    //   //赋值给left的菜单和右边的内容区
    //   this.setData({
    //     leftMenuList,
    //     rightContainList
    //   })
    // })
    const result = await request({
      url: '/categories',
      method: 'GET'
    })
    wx.setStorageSync('cates', { time: Date.now(), data: result })
    this.setData({
      cates: result
    })
    //下面这样写是错误的，除非是在data同级定义了一个  cates:[],但是这种定义的方式是无法渲染到页面上去的，只能在js的逻辑层使用
    // console.log(this.cates);
    let leftMenuList = this.data.cates.map(item => item.cat_name)
    let rightContainList = this.data.cates[0].children
    //赋值给left的菜单和右边的内容区
    this.setData({
      leftMenuList,
      rightContainList
    })
  },
  handActive(event) {
    this.setData({
      currIndex: event.currentTarget.dataset.currIndex
    })
    let rightContainList = this.data.cates[this.data.currIndex].children
    this.setData({
      rightContainList,
      scrollTop: 0
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