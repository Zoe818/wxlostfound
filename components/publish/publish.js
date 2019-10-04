const app = getApp();
Page({
    data: {
        formData: {
            'cat': "1",
            'bargain': "1"
        },
        mydialog: {
            title: '分类',
            content: '',
            buttons: [{text:'确定'}],
            show: false
        },
        mySwitchChecked: "checked",
        area: "请选择",
        areas: [
            ['校园卡', '1'],
            ['银行卡', '2'],
            ['身份证', '3'],
            ['学生证', '4'],
            ['驾驶证', '5'],
            ['升升门禁卡', '6'],
            ['钱包', '7'],
            ['书包', '8'],
            ['耳机', '9'],
            ['眼镜', '10'],
            ['雨伞', '11'],
            ['钥匙', '12'],
            ['衣服', '13'],
            ['书本', '14'],
            ['手机', '15'],
            ['水杯', '16'],
            ['充电宝', '17'],
            ['U盘', '18'],
            ['其他物品', '19']
        ],
        areaChecked: {
            '1': 'checked'
        },
        imgUrls: [],
        galleryShow: false,
        editorCtx: "",
        upurl: "",
        mypics: [],
        showAdd: true,
        showDelete: false,
    },
    methods: {
    },
    desInputChange: function(e) {
      this.data.formData.description = e.detail.html;
      this.setData({
          formData: this.data.formData
      })
    },
    formInputChange: function(e) {
        const {field} = e.currentTarget.dataset;
        this.setData({
            [`formData.${field}`]: e.detail.value
        });
        console.log(this.data.formData);
    },
    selectCat: function (e) {
        console.log(e);
        this.data.mydialog.show = true;
        this.setData({
            mydialog: this.data.mydialog
        })
    },
    areaChange: function (e) {

        let areaChecked2 = {};
        areaChecked2[e.detail.value] = "checked";

        this.data.formData.cat = e.detail.value;
        for (let i=0; i<this.data.areas.length; i++) {
            if (this.data.areas[i][1] == e.detail.value) {
                this.setData({
                    area: this.data.areas[i][0]
                });
                break;
            }
        }
        this.setData({
            areaChecked: areaChecked2,
            formData: this.data.formData
        })
    },
    dialogButtonTap: function (e) {
        console.log(e);
        this.data.mydialog.show = false;
        this.setData({
            mydialog: this.data.mydialog
        })
    },
    mySwitchChange: function (e) {
        console.log(e);
        if (e.detail.value) {
            this.data.formData.bargain = 1;
        } else {
            this.data.formData.bargain = 0;
        }
        this.setData({
            formData: this.data.formData
        })
    },
    picInputChange: function(e) {

    },
    formSubmit: function (e) {
        this.data.formData.pics = this.data.mypics;
        this.data.formData.openid = app.globalData.session.openid;
        console.log(e);
        console.log(this.data.formData);
        console.log(this.data.editorCtx.getContents());
        let formData = this.data.formData;
        let flag = 1;
        let errMsg = "出现未知错误";
        if (formData.name == null || formData.name == "") {
            errMsg = "物品名称不能为空";
            flag = 0;
        }
        if (formData.amount == null || formData.amount == "") {
            flag = 0; errMsg = "地点不能为空";
        }
      if (formData.place == null || formData.place == "") {
        flag = 0; errMsg = "校区不能为空";
      }
        if (formData.description == null || formData.description == "") {
            flag = 0; errMsg = "描述不能为空";
        }
      if (formData.phonenumber == null || formData.phonenumber == "") {
            flag = 0; errMsg = "电话号码不能为空";
        }
        if (formData.pics == null || formData.pics.length < 1) {
            flag = 0; errMsg = "至少上传一张图片";
        }
        if (flag == 0) {
            wx.showModal({
                title: '失败',
                content: errMsg,
                showCancel: false,
                success (res) {
                    if (res.confirm) {

                    }
                }
            });
        } else {
            console.log("准备发布");
            formData.pics = JSON.stringify(formData.pics);
            wx.request({
                url: app.globalData.serverUrl + "goods/publish",
                method: "POST",
                header: {
                    'content-type':'application/x-www-form-urlencoded'
                },
                data: formData,
                success (res) {
                    if (res.data.code == 0) {
                        console.log(res);
                        wx.showModal({
                            title: '成功',
                            content: '发布成功',
                            showCancel: false
                        })
                    }
                }
            })
        }

    },
    onLaunch: function(e) {
        wx.setNavigationBarTitle({
            title: '发布物品'
        })
    },
    onShow: function (e) {
        let that = this;
        if (! app.globalData.registered) {
            wx.navigateTo({  //当前页面对应的JS文件内 控制模板
                url: '../register/register'  //需要切换到的页面路劲，此处为相对路劲，id为传递的参数
            })
        }
        wx.request({
            url: app.globalData.serverUrl + "goods/upurl", //仅为示例，并非真实的接口地址
            method: "GET",
            success (res) {
                console.log(res);
                if (res.data.code == 0) {
                    that.setData({
                        upurl: res.data.data
                    })
                } else if (res.data.code == -1) {
                }
            }
        });
    },
    refreshPic: function(e) {

        let theHtml = "";
        let pics = this.data.mypics;

        if (pics.length >= 3) {
            this.setData({
                showAdd: false,
                showDelete: true
            })
        } else if (pics.length == 0) {
            this.setData({
                showAdd: true,
                showDelete: false
            })
        } else {
            this.setData({
                showAdd: true,
                showDelete: true
            })
        }

        let quality = 100;
        let width = 100;
        for (let i=0; i<pics.length; i++) {
            let theSrc = app.globalData.STATIC_CENTER_URL + "image/" + pics[i].guid + "-" + quality + "-" + width + "." + pics[i].extension;
            theHtml = theHtml + "<img src=" + theSrc + " >"
        }
        this.data.editorCtx.clear();
        this.data.editorCtx.setContents({
            html: theHtml
        })
    },
    deleteImg: function(e) {
      let that = this;
      if (this.data.mypics.length > 0) {
          this.data.mypics.pop();
          this.setData({
              mypics: this.data.mypics
          });
          this.refreshPic();
      }
    },
    selectImg: function (e) {
        let that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths);
                let supportImgExtension = ['jpg', 'jpeg', 'png'];
                for (let i=0; i<tempFilePaths.length; i++) {
                    let fileName = tempFilePaths[i];
                    let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
                    let flag = 0;
                    for (let k=0; k<supportImgExtension.length; k++) {
                        console.log("图片扩展名:" + fileExtension + ", 带比较扩展名:" + supportImgExtension[k]);
                        if (supportImgExtension[k] == fileExtension) {
                            flag = 1;
                            console.log("一致");
                            break;
                        }
                    }
                    if (flag == 0) {
                        console.log("出现非法图片");
                        wx.showModal({
                            title: '上传失败',
                            content: '照片类型目前仅支持jpg/jpeg/png格式',
                            showCancel: false,
                            success (res) {
                                if (res.confirm) {
                                }
                            }
                        })
                        return;
                    }
                }
                that.setData({
                    imgUrls: tempFilePaths
                });
                for (let i=0; i<that.data.imgUrls.length; i++) {
                    let fileName = that.data.imgUrls[i];
                    let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
                    wx.uploadFile({
                        url: app.globalData.STATIC_CENTER_URL + that.data.upurl + fileExtension,
                        filePath: that.data.imgUrls[i],
                        name: 'image',
                        success: function (res) {
                            console.log(res.data,'图片上传之后的数据')
                            var data = JSON.parse(res.data)
                            console.log(data.message)
                            if (data.error_code == 0) {
                                that.data.mypics.push({"guid": data.message, "extension": fileExtension});
                                that.setData({
                                   mypics: that.data.mypics
                                });
                                console.log(that.data.mypics);
                                that.refreshPic();
                                /*
                                that.data.editorCtx.insertImage({
                                    src: app.globalData.STATIC_CENTER_URL + "image/" + data.message + "-100-100." + fileExtension,
                                    success: function () {
                                        console.log('insert image success')
                                    }
                                })
                                 */
                            } else {
                                console.log("上传失败");
                            }
                        },
                        fail: function (e) {
                            console.log("图片上传失败")
                        }

                    });
                }
            }
        })
    },
    onEditorReady: function (e) {
        let that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.setData({
                editorCtx: res.context
            });
            console.log("设置context成功");
        }).exec(function (e) {
            console.log(that.data.editorCtx);
        });
    },
});