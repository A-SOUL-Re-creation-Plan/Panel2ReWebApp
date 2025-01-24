import { app, BrowserWindow, ipcMain, protocol, net, dialog, webContents } from "electron";
import path from "path";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { serviceInit, servicePort } from "./server/index.js";
import { refreshCookie } from "./server/utils/requests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appData = app.getPath("userData");

protocol.registerSchemesAsPrivileged([
  {
    scheme: "resonance",
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      stream: true,
      allowServiceWorkers: true,
    },
  },
]);

app.setAppLogsPath([app.getPath('userData')]);

app.whenReady().then(async() => {

  const token = Math.random().toString(36).slice(-18).toUpperCase();

  protocol.handle("resonance", (request) => {
    const { host, pathname, search } = new URL(request.url);
    if (host == "ui") {
      if (pathname == "/") {
        const url = "../dist/index.html";
        return net.fetch(path.join(__dirname, url), {
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
      const assetsURL = path.join(__dirname, "../dist");
      const filePath = path.join(assetsURL, pathname);
      return net.fetch(filePath);
    } else if (host == "api") {
      var target = `http://localhost:${servicePort}` + pathname;
      if (search) {
        target += search;
      }
      var newHeaders = new Headers(request.headers);
      newHeaders.append('token',token)
      return net.fetch(target, {
        method: request.method,
        headers: newHeaders,
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
  refreshCookie().then(()=>{
    serviceInit(token);
  });
  const win = new BrowserWindow({
    title: "Panel2Re",
    width: 1280,
    height: 800,
    frame: false,
    icon: path.join(__dirname, "../public/favicon.ico"),
    titleBarStyle: "customButtonsOnHover",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  }else{
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
  ipcMain.on("cookie-reload-request", function async(){
    addCookie().then((_) => {
      fs.cp(
        _.filePaths[0],
        path.join(appData,'biliup.json'),
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
  });
  win.webContents.setWindowOpenHandler(( handler ) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        width: 1440,
        height: 900,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../public/favicon.ico"),
        title: "Panel2Re @A-SOUL_Recreation_Plan",
      },
    };
  });
  win.webContents.on("will-navigate", (details, url) => {
    if(!url.includes("resonance://")){
      details.preventDefault()
    }
  })
});

export { app }