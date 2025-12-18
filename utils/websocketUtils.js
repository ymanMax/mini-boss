// 模拟WebSocket连接，不再进行实际网络连接
const ws = {
  onConnect: {
    success: (callback) => {
      console.log('模拟WebSocket连接成功')
      if (callback) callback()
    },
    fail: (err) => {
      console.log('模拟WebSocket连接失败', err)
    }
  }
}