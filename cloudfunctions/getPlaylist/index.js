// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 需等待初始化完再执行其他任务，即此处init必须在前
const db = cloud.database()

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist') 

const MAX_LIMIT = 100 // 每次获取数据条数


// 云函数入口函数
exports.main = async (event, context) => {
  // 获取云服务器上的歌单数据
  // const list = await playlistCollection.get() 
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)  
  const tasks = []

  for(let i = 0; i< batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  // 云数据库获取到的数据在data中
  let list = {
    data: []
  }
  if(tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  // 获取远程服务器的歌单数据
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  // 去重后的数据
  const newList = []

  // 去重操作
  for (let i = 0, len1 = playlist.length; i < len1; i++ ){
    let flag = true // 歌单数据是否存在云数据库中，默认为true，不存在

    for (let j = 0, len2 = list.data.length; j < len2; j++ ) {      
      // 如果获取到的歌单数据已经存在云数据库当中
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    // 如果没有重复则push到新歌单数据中
    if(flag){
      newList.push(playlist[i])
    }
  }

  // 将获取的数据插入云数据库中
  for (let i = 0, len = newList.length; i < len; i++) {
    await playlistCollection.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        ...newList[i],
        createTime: db.serverDate()
      }
    })
      .then(res => {
        console.log('插入成功')
      })
      .catch(console.error('插入失败'))
  }
 
  return newList.length
}