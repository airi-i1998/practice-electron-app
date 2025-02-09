/*
  electronのモジュールをインポート
  app: アプリのライフサイクル管理（起動・終了など）
  BrowserWindow: アプリのウィンドウを作成するクラス、アプリが完全に準備されたあとでしか作成できない
  →appモジュール,readyイベントを待つ必要がある
*/

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// ウェブページを新しいBrowserWindowインスタンスの読み込み
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload.jsをレンダラープロセスに適用→window.versionsにアクセス可能になる
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  // win.loadURL('https://www.google.com')
}

//
/*
  app.whenReady():Promiseを返すメソッド
  then()を使用してアプリが準備完了したタイミングでcreateWindow()を実行
*/
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})