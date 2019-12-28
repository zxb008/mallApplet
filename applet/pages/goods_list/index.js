// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
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
      id:e.detail.id
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