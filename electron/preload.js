const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electron", {
  unmax: () => ipcRenderer.send("window-unmaximize"),
  max: () => ipcRenderer.send("window-maximize"),
  mini: () => ipcRenderer.send("window-minimize"),
  close: () => ipcRenderer.send("window-close"),
  maxMonitor: (callback) => ipcRenderer.on("main-window-max", callback),
  unmaxMonitor: (callback) => ipcRenderer.on("main-window-unmax", callback),
});
