const BASE_URL = 'https://app.zijinqianbao.com/app';

// request get 请求
const get = (url, param, token) => {
    //特殊接口需区分有无传token，设置token参数为false(或者直接不传第三个参数)时传入token，token为true则不传入token
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            method: 'GET',
            data: param,
            header: token ? {
                'Content-Type': 'application/json'
            } : {
                'Content-Type': 'application/json',
                'token': getApp().globalData.token
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                console.log(err)
                reject(err)
            }
        })
    })
}

// request post 请求
const post = (url, param, token) => {
    //特殊接口需区分有无传token，设置token参数为false(或者直接不传第三个参数)时传入token，设置token参数为true则不传入token
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            method: 'POST',
            data: param,
            header: token ? {
                'Content-type': 'application/x-www-form-urlencoded'
            } : {
                'Content-type': 'application/x-www-form-urlencoded',
                'token': getApp().globalData.token
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                console.log(err)
                reject(err)
            }
        })
    })
}


//下载图片
const downloadFile = (url) => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success(res) {
                if (res.statusCode === 200) {
                    resolve(res)
                }
            },
            fail(err) {
                console.log(err)
                reject(err)
            }
        })
    })
}



// 检查token是否过期/登录是否失效
const checkToken = () => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + '/user/getUserInfo.do',
            header: {
                'Content-Type': 'application/json',
                'imei': getApp().globalData.imei,
                'token': getApp().globalData.token
            },
            method: 'GET',
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}


// 文字内容安全监测 msgSecCheck
const msgSecCheck = (param) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + '/smallProgram/checkContent.do',
            method: 'POST',
            data: {
                content: param
            },
            header: {
                'Content-type': 'application/x-www-form-urlencoded',
                'imei': getApp().globalData.imei,
                'token': getApp().globalData.token
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// 图片内容安全监测 imgSecCheck
const imgSecCheck = (param) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({ //上传图片检测
            url: BASE_URL + '/smallProgram/checkPic.do',
            header: {
                'content-type': 'multipart / form - data',
                'token': getApp().globalData.token,
                'imei': getApp().globalData.imei
            },
            filePath: param,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// loading加载提示
const showLoading = (tipsText) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: tipsText || '加载中',
            mask: true,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// 关闭loading
const hideLoading = () => {
    return new Promise((resolve) => {
        wx.hideLoading()
        resolve()
    })
}

// showToast提示
const showToast = (title, icon, time, mask) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title ? title : '请求失败',
            icon: icon ? icon : 'none',
            duration: time ? time : 2000,
            mask: mask ? mask : true,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}


//通用showModal
const showModal = (content, confirmUrl, cancelUrl) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            content: content ? content : '',
            success(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: confirmUrl ? confirmUrl : '',
                    })
                } else if (res.cancel) {
                    if (cancelUrl) {
                        wx.switchTab({
                            url: cancelUrl
                        })
                    }
                }
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = {
    get,
    post,
    showToast,
    showModal,
    showLoading,
    hideLoading,
    msgSecCheck,
    imgSecCheck,
    checkToken,
    BASE_URL,
    downloadFile
}