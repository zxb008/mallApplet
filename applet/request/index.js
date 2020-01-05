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