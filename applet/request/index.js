let baseUrl = "https://api.zbztb.cn/api/public/v1"
export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + params.url,
      method:params.method,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
};