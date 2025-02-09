/*
  contextBridgeを使用することで、
  安全にメインプロセスのデータをレンダラープロセスに渡すことができる
  ※contextBridge：分離されたコンテキスト間に、安全、双方向で同期されたブリッジを作成する
*/
const { contextBridge, ipcRenderer } = require('electron')

/*
  versionsというオブジェクトをwindowグローバルに登録
*/
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
})