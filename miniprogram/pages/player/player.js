// miniprogram/pages/player/player.js
// 不需展示到页面的数据可定义在外层，减少setData带来的性能消耗
let musiclist = [];

// 当前正在播放的歌曲
let nowPlayingIndex = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    nowPlayingIndex = options.index;
    musiclist = wx.getStorageSync('musiclist');
    
    wx.setNavigationBarTitle({
      title: musiclist[nowPlayingIndex].name,
    })
    this.setData({
      picUrl : musiclist[nowPlayingIndex].al.picUrl
    })
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