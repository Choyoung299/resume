//app.js
const api = require('/utils/api.js')
const util = require('/utils/util.js')
App({
  onLaunch: function () {
    var that = this;
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log(menuButtonObject)
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop+2;
        this.globalData.windowHeight = res.windowHeight;
        console.log(this.globalData)
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    api,
    userInfo: null,
    token: null,
  }
})


// 直接替换原型链上的方法，方便使用
Number.prototype.toFixed = function (n) {
  // n为期望保留的位数，超过限定，报错！
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  // 获取数字
  const number = this;
  // 如果是NaN,或者数字过大，直接返回'NaN'或者类似'1e+21'的科学计数法字符串
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  // 默认保留整数
  if (typeof (n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }

  // 先获取字符串
  let result = number.toString();
  // 获取小数部分
  const arr = result.split('.');

  // 整数的情况，直接在后面加上对应个数的0即可
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  // 整数和小数
  const integer = arr[0];
  const decimal = arr[1];
  // 如果已经符合要求位数，直接返回
  if (decimal.length == n) {
    return result;
  }
  // 如果小于指定的位数，补上
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  // 如果到这里还没结束，说明原有小数位多于指定的n位
  // 先直接截取对应的位数
  result = integer + '.' + decimal.substr(0, n);
  // 获取后面的一位
  let last = decimal.substr(n, 1);
  if (/^\d(9){5,}[89]$/.test(decimal.substr(n))) {
    last += last + 1;
  }
  // 大于等于5统一进一位
  if (parseInt(last, 10) >= 5) {
    // 转换倍数，转换为整数后，再进行四舍五入
    const x = Math.pow(10, n);
    // 进一位后，转化还原为小数
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    // 再确认一遍
    result = result.toFixed(n);
  }

  return result;
};