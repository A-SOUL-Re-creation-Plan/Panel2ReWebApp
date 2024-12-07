const { app, BrowserWindow, ipcMain, protocol, net, dialog, remote } = require("electron");
const path = require("path");
const child_process = require("child_process");
const iconv = require("iconv-lite");
const fs = require('fs')

const api = child_process.execFile(path.join(__dirname, "./app.exe"), {
  cwd: app.getPath("userData"),
  encoding: "gbk",
},(stderr)=>{
  fs.access(
    path.join(app.getPath("userData"), "dynamic_config.json"),
    fs.constants.R_OK,
    (err) => {
      if (err) {
        fs.cp(
          path.join(__dirname, "./dynamic_config.json"),
          path.join(app.getPath("userData"), "dynamic_config.json"),
          (_) => {}
        );
      }
    }
  );
});

async function addCookie(){
  const res = dialog.showOpenDialog({
    properties: ["openFile"],
    title: "选择Cookies文件",
    filters: [{ name: "biliup 用户数据文件", extensions: ["json"] }],
    defaultPath: path.join(app.getPath("appData"),'biliup/users')
  })
  if(res.canceled){
    Promise.reject()
  }
  return res
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: "resonance",
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true, // Add this if you want to use fetch with this protocol.
      stream: true,
    },
  },
]);

app.setAppLogsPath([app.getPath('userData')]);
app.on('before-quit',()=>{
  const kill = require('tree-kill')
  kill(api.pid,(err)=>{
    console.log(err ? "kill api service failed" : "kill api service success")
  });
})
app.whenReady().then(async() => {
  fs.access(
    path.join(app.getPath("userData"), "biliup.json"),
    fs.constants.R_OK,
    async (err) => {
      if (err) {
        await addCookie()
          .then((_) => {
            fs.cp(
              _.filePaths[0],
              path.join(app.getPath("userData"),'biliup.json'),
              (error)=>{
                if(error){
                  dialog.showErrorBox("ERROR","复制出错")
                }else{
                  dialog.showMessageBox({message: "复制成功，程序将重启"})
                  app.relaunch();
                  app.quit();
                }
              }
            )
          })
          .catch((_) => {
            app.quit();
          });
      } else {
        protocol.handle("resonance", (request) => {
          const { host, pathname, search } = new URL(request.url);
          if (host == "ui") {
            if (pathname == "/") {
              const url = "../dist/index.html";
              return net.fetch(path.join(__dirname, url));
            }
            const assetsURL = path.join(__dirname, "../dist");
            const filePath = path.join(assetsURL, pathname);
            return net.fetch(filePath);
          } else if (host == "api") {
            var target = "http://localhost:3007" + pathname;
            if (search) {
              target += search;
            }
            return net.fetch(target, {
              method: request.method,
              headers: request.headers,
              body: request.body,
              credentials: request.credentials,
              duplex: "half",
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy,
              mode: request.mode,
              cache: request.cache,
              integrity: request.integrity,
            });
          }
        });
        const win = new BrowserWindow({
          title: "Panel2Re",
          width: 1280,
          height: 720,
          frame: false,
          icon: path.join(__dirname, "../public/favicon.ico"),
          titleBarStyle: "customButtonsOnHover",
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
          },
        });

        // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
        if (process.env.VITE_DEV_SERVER_URL) {
          win.loadURL(process.env.VITE_DEV_SERVER_URL);
          win.webContents.openDevTools({ mode: "detach" });
        } else {
          win.loadURL("resonance://ui/");
        }
        win.show();

        ipcMain.on("window-close", function () {
          win.close();
        });
        ipcMain.on("window-minimize", function () {
          win.minimize();
        });
        ipcMain.on("window-maximize", function () {
          win.maximize();
        });
        ipcMain.on("window-unmaximize", function () {
          win.restore();
        });
        win.on("maximize", function () {
          win.webContents.send("main-window-max");
        });
        win.on("unmaximize", function () {
          win.webContents.send("main-window-unmax");
        });

        win.webContents.setWindowOpenHandler(({ url }) => {
          return {
            action: "allow",
            overrideBrowserWindowOptions: {
              width: 1440,
              height: 900,
              autoHideMenuBar: true,
              icon: path.join(__dirname, "../public/favicon.ico"),
              title: "Panel2Re Preview Window",
            },
          };
        });
      }
    }
  );
});
