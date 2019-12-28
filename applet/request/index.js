let baseUrl = "https://api.zbztb.cn/api/public/v1"
let requestCount = 0
export const request = (params) => {
  requestCount++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
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