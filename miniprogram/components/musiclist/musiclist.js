// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },

  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示

    },
  },  

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      // currentTarget 和 taget的区别。本质是什么
      console.log(event.currentTarget.dataset.musicid)
      const ds = event.currentTarget.dataset;
      const musicid = ds.musicid;
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`
      })
    }
  }
})
