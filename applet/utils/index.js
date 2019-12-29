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