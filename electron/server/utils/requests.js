import axios from "axios";
import { app as electron } from "electron";
import path from 'node:path';
import { biliHeaders } from './bilibili.js';
import { readFileSync } from "node:fs";

const instance = axios.create({
  baseURL: "https://api.bilibili.com"
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if(response.data.code == -352){
      throw ("REQUEST_BLOCKED_BY_BILIBILI")
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const refreshCookie = async()=>{
  var confDir = path.join(electron.getPath("userData"),'biliup.json');
  var confData = JSON.parse(readFileSync(confDir, 'utf-8'));
  var cookieString = "";
  for(let i=0;i<confData.cookie_info.cookies.length;i++){
    cookieString += `${confData.cookie_info.cookies[i].name}=${confData.cookie_info.cookies[i].value}; `;
  }
  axios.get('https://api.bilibili.com/x/web-interface/nav/stat',{headers: {
    'Cookie': cookieString
  }}).then((_)=>{
    if(_.data.code == 0){
      instance.defaults.headers.common=biliHeaders;
      instance.defaults.headers.common['Cookie']=cookieString;
    }
  })
}

export default instance;
export { refreshCookie };
