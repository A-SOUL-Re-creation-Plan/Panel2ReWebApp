import {
  app,
  BrowserWindow,
  ipcMain,
  protocol,
  net,
  dialog,
  webContents,
} from "electron";
import path from "path";
import { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import updater from "electron-updater";
import { serviceInit, servicePort } from "./server/index.js";
import { refreshCookie } from "./server/utils/requests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appData = app.getPath("userData");
const { autoUpdater } = updater;

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

app.setAppLogsPath([app.getPath("userData")]);

app.whenReady().then(async () => {
  const token = Math.random().toString(36).slice(-18).toUpperCase();

  protocol.handle("resonance", (request) => {
    const { host, pathname, search } = new URL(request.url);
    if (host == "ui") {
      if (pathname == "/") {
        const url = "../dist/index.html";
        return net.fetch(`file://${path.join(__dirname, url)}`, {
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
      return net.fetch(`file://${filePath}`);
    } else if (host == "api") {
      var target = `http://localhost:${servicePort}` + pathname;
      if (search) {
        target += search;
      }
      var newHeaders = new Headers(request.headers);
      newHeaders.append("token", token);
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
  refreshCookie().finally(() => {
    serviceInit(token);
  });

  const win = new BrowserWindow({
    title: "Panel2Re",
    width: 1280,
    height: 800,
    frame: false,
    icon: path.join(__dirname, "../public/favicon.png"),
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
  } else {
    win.loadURL("resonance://ui/");
    autoUpdater.checkForUpdatesAndNotify();
  }
  win.show();

  const addCookie = async () => {
    const data = await dialog.showOpenDialogSync({
      title: "加载Cookie...",
      defaultPath: app.getPath("appData") + "/biliup/users",
      filters: [{ extensions: ".json" }],
    });
    return data;
  };

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
  ipcMain.on("cookie-reload-request", async function () {
    const src = await addCookie();
    if (src !== undefined) {
      fs.cp(src[0], path.join(appData, "biliup.json"), (error) => {
        if (error) {
          dialog.showErrorBox("ERROR", `复制出错\n${error}`);
        } else {
          dialog.showMessageBox({ message: "复制成功，程序将重启" });
          setTimeout(() => {
            app.relaunch();
            app.exit();
          }, 2000);
        }
      });
    }
  });
  win.webContents.setWindowOpenHandler((handler) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        width: 1440,
        height: 900,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../public/favicon.png"),
        title: "Panel2Re @A-SOUL_Recreation_Plan",
      },
    };
  });
  win.webContents.on("will-navigate", (details, url) => {
    if (!url.includes("resonance://")) {
      details.preventDefault();
    }
  });
});

export { app };
