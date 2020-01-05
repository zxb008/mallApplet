// pages/cart/index.js
import {
  wxGetSetting,
  wxAddress,
  wxOpenSetting
} from '../../utils/index'
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    oreders: [],
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
  pay() {
    const token = wx.getStorageSync('token')
    //1.判断是否有token(token是判断用户是否是处于登录状态)
    // 1.1无token，需要跳转到授权页面进行授权,
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return ;
    }
    //1.2有token
    //2.把token放入请求头,订单数据放入请求参数中，调用创建订单接口,获取订单编号
    //优化请求方法，把header放进去
    // const header = {Authorization:token} 
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address
    let goods = []
    const {oreders} = this.data
    oreders.forEach(item=>
      goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      })
      )
      const params = {order_price,consignee_addr,goods}
      request({
        url:'/my/orders/create',
        method:'POST',
        data:params,
        // header
      }).then((res=>{
        const order_number = res.order_number
        //3.得到订单编号参数，调用预支付的接口来获取微信支付参数
        request({
          url:'/my/orders/req_unifiedorder',
          method:'POST',
          data:{order_number},
          // header
        }).then((res)=>{
           //4.调用微信支付的接口
           wx.requestPayment({
            timeStamp: res.pay.timeStamp,
            nonceStr: res.pay.nonceStr,
            package: res.pay.package,
            signType: 'MD5',
            paySign:res.pay.paySign,
            success: (res)=> {},
            fail (res) { },
            complete:()=>{
              //无论是否支付成功，查看订单的支付状态
              request({
                url:'/my/orders/chkOrder',
                method:'POST',
                data:{order_number},
                // header
              }).then((res)=>{
                if (res === '支付成功') {
                  wx.showToast({
                    title: res,
                    icon:"none"
                  })
                  //支付成功以后
                  //清除订单缓存oreders
                  wx.removeStorageSync("oreders")
                  //清除缓存中carts中checked==true的商品
                  let carts = wx.getStorageSync('carts')
                  carts = carts.filter(item=>{
                    !item.checked
                  })
                  wx.setStorageSync('carts', carts)
                  wx.navigateTo({
                    url: '/pages/order/index'
                  })
                } else {
                  wx.showToast({
                    title: '支付失败',
                    icon:"none"
                  })
                }
              })
            }
          })
        })

      }))
   
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
    const oreders = wx.getStorageSync('oreders') || []
    let totalNum = 0 , totalPrice = 0;
    oreders.forEach(element => {
      totalNum += element.num;
      totalPrice += element.goods_price * element.num
    });
    this.setData({
      address,
      oreders,
      totalNum,
      totalPrice
    })
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