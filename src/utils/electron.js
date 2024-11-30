import isElectron from "is-electron";
const winStatusCheck = (ref) => {
  try{
    const winMax = window.electron.maxMonitor(() => {
      ref.value = true;
    });
    const winUnMax = window.electron.unmaxMonitor(() => {
      ref.value = false;
    });
    console.log("env: electron")
  }catch{
    console.log("env: browser")
  }
}
const miniWindow = () => {
    if (isElectron) {
      window.electron.mini();
    } else {
      console.log("Running in browser, not supported!");
    }
};
const maxWindow = () => {
    if (isElectron) {
      window.electron.max();
    } else {
      console.log("Running in browser, not supported!");
    }
};
const unmaxWindow = () => {
    if (isElectron) {
      window.electron.unmax();
    } else {
      console.log("Running in browser, not supported!");
    }
};
const closeWindow = () => {
    if (isElectron) {
      window.electron.close();
    } else {
      console.log("Running in browser, not supported!");
    }
}
export { closeWindow, miniWindow, maxWindow, unmaxWindow, winStatusCheck };