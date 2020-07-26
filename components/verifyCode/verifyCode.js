// components/verifyCode.js
Component({

    options: {
        multipleSlots: true
    },
    
    /**
     * 组件的属性列表
     */
    properties: {
    },

    /**
     * 组件的初始数据
     */
    data: {
        count:60,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onGetAuthCodes(){
            let that=this;
            if(that.data.count==60){
                that.setData({
                    count:that.data.count-1
                })
                let t1 = setInterval(function(){
                    that.setData({
                        count:that.data.count-1
                    })
                    if(that.data.count==0){
                        that.setData({
                            count:60
                        })
                        clearInterval(t1)
                    }
                },1000)
            }
        },
        getAuthCode(e){
            // console.log(e.detail)
            this.triggerEvent('getAuthCode',{code:e.detail})
            // this.triggerEvent('getAuthCode',{code:e.detail.value})
        }
    }
})