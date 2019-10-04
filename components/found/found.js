// components/found/found.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
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
      showModal: false,
      modalList: {
        showMore: true,
      },
      tag: [
        {
          tagId: '1',
          tagName: '全部'
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
        {
          tagId:'5',
          tagName:'水杯'
        },
      ],
      tagIdArr: []
    },

  /**
   * 组件的方法列表
   */
  methods: {
   
  }
})
