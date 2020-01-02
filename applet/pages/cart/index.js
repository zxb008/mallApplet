// pages/cart/index.js
import {
  wxGetSetting,
  wxAddress,
  wxOpenSetting
} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    carts: [],
    allchecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  //获取地址
  getAddress() {
    wxGetSetting().then((result1) => {
      const scopeAddress = result1.authSetting['scope.address']

      if (scopeAddress === false) {
        wxOpenSetting();
      }
      // undefined 和 true 的两种情况下，尝试获取地址
      //仔细思考undefined会出现什么情况呢？
      wxAddress().then((result2) => {
        wx.setStorageSync('address', result2)
      }, (error2) => {
        console.log(error2);
      })
    })
  },
  //因为有很多的方法中会重复判断，是否全选同时计算总的价格和数量
  setAllCheckPriceNum(carts) {
    // //1.判断是否要全选(需要注意的是空数组的every方法返回的是true)
    // const allchecked = carts.length ? carts.every(item => item.checked === true) : false
    // //2.计算价格和数量
    // let totalPrice = 0
    // let totalNum = 0
    // carts.forEach(element => {
    // if (element.checked) {
    //   totalNum += element.num;
    //   totalPrice += element.goods_price * element.num
    // }
    // });
    // this.setData({
    //   allchecked,
    //   totalPrice,
    //   totalNum
    // })
    //优化
    //1.判断是否要全选(需要注意的是空数组的every方法返回的是true)
    let allchecked = true
    //2.计算价格和数量
    let totalPrice = 0
    let totalNum = 0
    carts.forEach(element => {
      if (element.checked) {
        totalNum += element.num;
        totalPrice += element.goods_price * element.num
      } else {
        allchecked = false
      }
    });
    allchecked = carts.length !== 0 ? allchecked : false
    this.setData({
      allchecked,
      totalPrice,
      totalNum
    })
  },
  itemCheck(e) {
    // console.log(e.detail.gid);
    //点击商品项的复选框，子组件传过来了这个商品的id
    //1.把缓存中的cart中对应的商品的checked取反
    let { carts } = this.data
    carts.map(item => {
      if (item.goods_id === e.detail.gid) {
        item.checked = !item.checked
      }
    })
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts)
    //2.这时候需要重新计算总数量和价格以及是否勾上全选
    this.setAllCheckPriceNum(carts)
  },
  itemReduce(e) {
    // console.log(e.detail.gid);
    //点击商品项的复选框，子组件传过来了这个商品的id
    let { carts } = this.data
    carts.map(item => {
      if (item.goods_id === e.detail.gid) {
        if (item.num > 1) {
          item.num--
          carts = carts.filter(item => item.num > 0)
          this.setData({
            carts
          })
          wx.setStorageSync('carts', carts)
          //2.这时候需要重新计算总数量和价格以及是否勾上全选
          this.setAllCheckPriceNum(carts)
        } else if (item.num === 1) {
          wx.showModal({
            title: '提示',
            content: '你确定删除这个商品吗？',
            success: (res) => {
              if (res.confirm) {
                //点击确定
                item.num--
                carts = carts.filter(item => item.num > 0)
                this.setData({
                  carts
                })
                wx.setStorageSync('carts', carts)
                //2.这时候需要重新计算总数量和价格以及是否勾上全选
                this.setAllCheckPriceNum(carts)
              } else if (res.cancel) {
                //点击取消
                // item.num = 1
              }
            }
          })
        }
      }
    })
    // carts = carts.filter(item => item.num > 0)
    // this.setData({
    //   carts
    // })
    // wx.setStorageSync('carts', carts)
    // //2.这时候需要重新计算总数量和价格以及是否勾上全选
    // this.setAllCheckPriceNum(carts)
  },
  itemAdd(e) {
    // console.log(e.detail.gid);
    //点击商品项的复选框，子组件传过来了这个商品的id
    let { carts } = this.data
    carts.map(item => {
      if (item.goods_id === e.detail.gid) {
        item.num++
      }
    })
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts)
    //2.这时候需要重新计算总数量和价格以及是否勾上全选
    this.setAllCheckPriceNum(carts)
  },
  //点击全选
  allCheck() {
    let { carts } = this.data
    if (this.data.allchecked) {
      //全选的被勾上了，点击以后。。。
      carts.map(item => {
        item.checked = false
      })
    } else {
      carts.map(item => {
        item.checked = true
      })
    }
    this.setData({
      carts
    })
    wx.setStorageSync('carts', carts)
    //2.这时候需要重新计算总数量和价格以及是否勾上全选
    this.setAllCheckPriceNum(carts)
  },
  pay(){
    if (this.data.address) {
      wx.showToast({
        title: '你还没有获取地址呢！'
      })
      return false;
    }
    if (this.data.totalNum) {
      wx.showToast({
        title: '购物车空空如也！'
      })
      return false;
    }
    wx.navigateTo({
      url: '/page/pay/index'
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
    //得到地址信息 得到购物车信息
    const address = wx.getStorageSync('address')
    const carts = wx.getStorageSync('carts') || []
    this.setData({
      address,
      carts
    })
    //这时候需要重新计算总数量和价格以及是否勾上全选
    this.setAllCheckPriceNum(carts)
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