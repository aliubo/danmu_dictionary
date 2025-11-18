const { app, BrowserWindow } = require('electron')

debugAttr = {
    width: 700,
    height: 900,

    frame: true,
    focusable: true,
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,

    transparent: true,
    alwaysOnTop: true,
    frame: false,
    focusable: false,

    //resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },

    //...debugAttr,
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()
})


