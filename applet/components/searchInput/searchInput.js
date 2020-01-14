// components/searchInput/searchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:null
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      const userInfo = wx.getStorageSync('userInfo') || null;
      if (userInfo) {
        this.setData({
          userInfo
        })
      }
    },
    moved: function () { },
    detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleNav(){
      wx.navigateTo({
        url: '/pages/search/index'
      })
    }
  }
})
