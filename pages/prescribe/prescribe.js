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
        symptomsMsg: '',//症状简述
        medicine: 0,//服药方式，0内服/1外服
        tisane: 0,//是否代煎药，0代煎/1不代煎
        medicineNum: Number,//药帖数
        showDirectionsMedicine: false,//服药方式弹窗
        directionsMedicineArr: ['一天1次', '一天2次', '一天3次', '遵医嘱'],//服药方式数组
        directionsMedicineIndex: 0,//服药方式索引
        showTakeSomeicineTime: false,//服药时间弹窗
        takeSomeicineTimeArr: ['饭后半小时用', '饭前半小时用', '空腹服用', '睡前服用', '晨起服用', '其他'],//服药时间数组
        takeSomeicineTimeIndex: 0,//服药时间索引
        showCpoePopup: false,//服药禁忌弹窗
        cpoeArr: [
            { name: '无', check: false, id: 0 },
            { name: '忌油腻', check: false, id: 1 },
            { name: '忌辛辣', check: false, id: 2 },
            { name: '忌生冷', check: false, id: 3 },
            { name: '忌烟酒', check: false, id: 4 },
            { name: '忌发物', check: false, id: 5 },
            { name: '忌荤腥', check: false, id: 6 },
            { name: '忌刺激性食物', check: false, id: 7 },
            { name: '忌光敏性食物', check: false, id: 8 }
        ],//服药禁忌数组
        checkCpoeArr: [],//选中的服药禁忌
        cpoeMsg: '',//医嘱
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
                var imgList = that.data.imgUrl
                imgList.push(tempFilePaths)
                that.setData({
                    imgUrl: imgList,
                })
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
    delPhoto: function (e) { //删除上传图片
        var that = this;
        var arr = that.data.imgUrl;
        var index = e.currentTarget.dataset.photoindex;
        arr.splice(index, 1)
        that.setData({
            imgUrl: arr
        })
    },
    lookPhoto(e) {//查看上传的图片
        let that = this;
        let index = e.currentTarget.dataset.photoindex;
        wx.previewImage({
            current: that.data.imgUrl[index], // 当前显示图片的http链接
            urls: that.data.imgUrl // 需要预览的图片http链接列表
        })
    },
    cutMedicine(e) {//切换用药方式，内服/外服
        this.setData({
            medicine: e.currentTarget.dataset.index
        })
    },
    cutTisane(e) {//切换煎药方式，代煎/不代煎
        this.setData({
            tisane: e.currentTarget.dataset.index
        })
    },
    getMedicineNum(e) {//获取药帖数量
        this.setData({
            medicineNum: e.detail.value
        })
    },
    onClose() {//隐藏弹出框
        this.setData({
            showDirectionsMedicine: false,
            showTakeSomeicineTime: false,
            showCpoePopup: false
        })
    },
    showDirectionsMedicine() {//显示服药方式弹窗
        this.setData({
            showDirectionsMedicine: this.data.showDirectionsMedicine == false ? true : false
        })
    },
    getDirectionsMedicine(e) {//获取服药方式
        this.setData({
            directionsMedicineIndex: e.currentTarget.dataset.index,
            showDirectionsMedicine: false
        })
    },
    showTakeSomeicineTime() {//显示服药时间弹窗
        this.setData({
            showTakeSomeicineTime: this.data.showTakeSomeicineTime == false ? true : false
        })
    },
    getTakeSomeicineTime(e) {//获取服药时间
        this.setData({
            takeSomeicineTimeIndex: e.currentTarget.dataset.index,
            showTakeSomeicineTime: false
        })
    },
    showCpoePopup(e) {//显示服药禁忌弹窗
        this.setData({
            showCpoePopup: this.data.showCpoePopup == false ? true : false
        })
    },
    selectCpoe(e) {//选择服药禁忌
        var index = e.currentTarget.dataset.index;
        var arr = this.data.cpoeArr;
        arr[index].check = arr[index].check == false ? true : false
        this.setData({
            cpoeArr: arr
        })
    },
    onConfirmCpoe(e) {//确认选择的服药禁忌
        let list = this.data.cpoeArr;
        let newList = [];
        list.map(function (item) {
            if (item.check == true) {
                newList.push(item)
            }
        })
        this.setData({
            checkCpoeArr: newList,
            showCpoePopup: false
        })
    },
    getCpoeMsg(e) {//获取输入的医嘱
        this.setData({
            cpoeMsg: e.detail
        })
    },
    getSymptomsMsg(e) {//获取症状简述
        this.setData({
            symptomsMsg: e.detail
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