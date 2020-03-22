// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playList: {
      type: Object
    }
  },

  /**
   * 组件的数据监听
   */
  observers: {
    // 监听播放量，对象的某个属性写法如下
    ['playList.playCount'](count) {
      this.setData({
        _count: this._tranNumber(count, 2) // _count： 防止setData 设置本身监听的数据字段，导致死循环
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   _count: 0 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 歌单歌曲列表
    toMuscilist() {
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playList.id}`,
      })
    },

    // 私有方法命名格式如下
    // 处理播放量函数，num: 需要处理的数据，point： 保留的小数点位数
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]; // 提取整数部分
      if(numStr.length < 6){
         return numStr;
      } else if(numStr.length >= 6 && numStr.length <= 8){
       // 万以上
       let decimals = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
       return parseFloat(parseInt(numStr / 10000) + '.' + decimals) + '万'; 
      } else if(numStr.length > 8){
        let decimals = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(numStr / 100000000) + '.' + decimals) + '亿';
      }

    }
  }
})
