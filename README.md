# mallApplet
商城小程序

## 技术栈
colorUI + es6 + 原生小程序
## 实现功能
### 首页
* 搜索组件
* 图片轮播
* 分类导航
### 搜索
* 防抖实现
* 重置搜索记录
### 分类
* 搜索组件
* 左右联动
* 商品信息展示
### 商品列表
* 搜索组件
* 商品项组件
* 下拉加载
* 上拉刷新
* tab切换组件
### 商品详情
* 图片轮播，点击图片，大图滑动
* 商品信息展示
* 收藏功能
* 加入购物车
### 购物车
* 选购商品项组件
* 全选，非全选的判断
* 增加或者减少商品的数量，自动计算数量和价格
* 获取地址
* 删除选购商品
* 提交订单
* 支付
### 个人中心
* 登录
* 收藏商品
* 我的订单
### 收藏/订单页面
* tab组件
* 收藏商品/订单的展示
## 代码优化
### 使用Promise，同时把加载提示一起封装
```javascript
let baseUrl = "https://api.zbztb.cn/api/public/v1"
let requestCount = 0
export const request = (params) => {
  let header = {...params.header}
  if (params.url.includes('/my/')) {
    header["Authorization"] = wx.getStorageSync('token')
  }
  requestCount++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header:header,
      url: baseUrl + params.url,
      // method:params.method,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        requestCount--
        if (requestCount === 0) {
          wx.hideLoading()
        }
      }
    })
  })
};
```
### 使用Promise，把一些小程序中获取地址，授权的api也进行封装
```javascript
const wxGetSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success (res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
const wxOpenSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success (res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
const wxAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success (res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
export {
  wxGetSetting,
  wxAddress,
  wxOpenSetting
}
```
