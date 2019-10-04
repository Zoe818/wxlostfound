//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lists: [{
        type: 'video'
      },
      {
        type: 'image'
      }
    ],
    // 弹窗
    showModal: true,
    modalList: {
      showMore: true,
    },
    tag: [
      {
        tagId:'1',
        tagName:'全部'
      },
      {
        tagId: '2',
        tagName: '校园卡'
      },
      {
        tagId: '3',
        tagName: '银行卡'
      },
      {
        tagId: '4',
        tagName: '身份证'
      },
    ],
    tagIdArr:[],
    tabIndex:'1'
  },
  /**
   * 关闭弹窗
   */
  handleCloseModal() {
    const modalList = this.data.modalList
    for (let key in modalList) {
      modalList[key] = false
    }
    this.setData({
      showModal: false,
      modalList
    })
  },
  /**
   * 更多组件点击了标签
   */
  handleTapTag(e) {
    const tag = this.data.tag
    const tagCopy = JSON.parse(JSON.stringify(tag))
    const tagId = e.detail.tagId
    tag.forEach(item => {
      delete item.selected
      if (item.tagId == tagId){
        item.selected = true
      }
    })
    this.setData({
      tag
    })
  },
  /**
  * 更多组件点击了重置
  */
  handReset() {
    const tag = this.data.tag
    const tagCopy = JSON.parse(JSON.stringify(tag))
    tag.forEach(item => {
      delete item.selected
    })
    this.setData({
      needPageScroll: true,
      tag

    })

  },
   /**
  * 切换tab
  */
  tabSelect(e){
    this.setData({
      tabIndex:e.detail
    })
  },
  onLoad: function() {

  }
})