// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome To Here',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    
  },
  // 获取用户信息
getUser(e){
  var that=this
  wx.getUserProfile({
    desc: '正在获取', //不写不弹提示框
    success: function (res) {
      console.log("获取成功:", res)
    that.setData({
      userInfo:res.userInfo
    })
    },
    fail: function (err) {
      console.log("获取失败: ", err)
      // 提示信息
      wx.showToast({
        title: '请给予小程序授权！',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
  })
},
// 跳转登录页面
  Tologin(e) {
    wx.navigateTo({
      // 跳转链接
      url: '/pages/login/login?id=1',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.data)
  }
})
