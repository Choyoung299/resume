// pages/prescribe/prescribe.js
const app = getApp();
const api = app.globalData.api;
const regeneratorRuntime = app.globalData.regeneratorRuntime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [], //图片存放位置
  },
  uploadImg: function () { //上传图片
    var that = this;
    wx.chooseImage({ //用户拍照或选择图片
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // api.showLoading();
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        var imgList=that.data.imgUrl
        imgList.push(tempFilePaths)
        that.setData({
          imgUrl: imgList,
        })
        console.log(tempFilePaths)
        // api.imgSecCheck(tempFilePaths[0]).then(function (res) {
        //     res = JSON.parse(res)
        //     if (res.code == '200001') {
        //         api.showModal('您尚未登录，是否前去登录？', '../../../login/login', '../../../tabBar/recycle/recycle')
        //         return
        //     }
        //     if (res.code == "000001") {
        //         api.hideLoading();
        //         api.showToast('图片违规，请重新选择！')
        //         return
        //     } else if (res.code == "000000") {
        //         api.showLoading('上传中');
        //         wx.uploadFile({ //上传图片
        //             url: api.BASE_URL + api.IMAGEUPLOAD,
        //             header: {
        //                 'content-type': 'multipart / form - data',
        //                 'token': app.globalData.token
        //             },
        //             filePath: tempFilePaths[0],
        //             name: 'file',
        //             formData: {
        //                 'user': 'test'
        //             },
        //             success(res) {
        //                 api.hideLoading();
        //                 api.showToast('上传成功');
        //                 var arr = that.data.imgUrl;
        //                 var res = res.data;
        //                 res = JSON.parse(res)
        //                 console.log(res.url)
        //                 arr.push(res.url)
        //                 that.setData({
        //                     imgUrl: arr,
        //                 })
        //             }
        //         })
        //     } else {
        //         api.hideLoading();
        //         api.showToast(res.description)
        //     }
        // })
      }
    })
  },
  delPhoto: function (e) { //删除上传的图片
    var that = this;
    var arr = that.data.imgUrl;
    var index = e.currentTarget.dataset.photoindex;
    arr.splice(index, 1)
    that.setData({
      imgUrl: arr
    })
  },
  lookPhoto(e){
    let that = this;
    let index = e.currentTarget.dataset.photoindex;
    console.log(that.data.imgUrl)
    wx.previewImage({
      current: that.data.imgUrl[index], // 当前显示图片的http链接
      urls: that.data.imgUrl // 需要预览的图片http链接列表
    })
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