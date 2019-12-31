// components/cartShop/cartShop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propItem:{
      type: Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e){
      this.triggerEvent('check', {gid:e.currentTarget.dataset.gid})
    },
    add(e){
      this.triggerEvent('add', {gid:e.currentTarget.dataset.gid})
    },
    reduce(e){
      this.triggerEvent('reduce', {gid:e.currentTarget.dataset.gid})
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
   
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    
  },
})
