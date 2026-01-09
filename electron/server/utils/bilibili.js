import md5 from "md5";
import requests from "./requests.js";

const biliHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
  Referer: "https://www.bilibili.com/",
  Origin: "http://www.bilibili.com",
  Pregma: "no-cache",
  "Cache-Control": "max-age=0",
  "Upgrade-Insecure-Requests": "1",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  Connection: "keep-alive",
};

const biliHDAppKey = {
  signKey: "4409e2ce8ffd12b8",
  signSec: "59b43e04ad6965f34319062b478f83dd",
};

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61,
  26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36,
  20, 34, 44, 52,
];

const getMixinKey = (orig) =>
  mixinKeyEncTab
    .map((n) => orig[n])
    .join("")
    .slice(0, 32);

function encWbi(params, img_key, sub_key) {
  const mixin_key = getMixinKey(img_key + sub_key),
    curr_time = Math.round(Date.now() / 1000),
    chr_filter = /[!'()*]/g;

  Object.assign(params, { wts: curr_time });
  let paramsString = params;
  const query = Object.keys(paramsString)
    .sort()
    .map((key) => {
      const value = paramsString[key].toString().replace(chr_filter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  const wbi_sign = md5(query + mixin_key); // 计算 w_rid

  return Object.assign(params, { w_rid: wbi_sign });
}

async function getWbiKeys() {
  const request = await requests.get("/x/web-interface/nav");
  const res = await request.data;
  const {
    data: {
      wbi_img: { img_url, sub_url },
    },
  } = await res;

  return {
    img_key: img_url.slice(
      img_url.lastIndexOf("/") + 1,
      img_url.lastIndexOf(".")
    ),
    sub_key: sub_url.slice(
      sub_url.lastIndexOf("/") + 1,
      sub_url.lastIndexOf(".")
    ),
  };
}

async function SignParamsWbi(params) {
  const web_keys = await getWbiKeys();
  const img_key = web_keys.img_key,
    sub_key = web_keys.sub_key;
  const query = encWbi(params, img_key, sub_key);
  return query;
}

function appSign(params, appkey, appsec) {
  params.appkey = appkey;
  const searchParams = new URLSearchParams(params);
  searchParams.sort();
  return {
    ...params,
    sign: md5(searchParams.toString() + appsec),
  };
}

const copyright_dict = { 1: "原创", 2: "转载" };
const state_dict = {
  1: "橙色通过",
  0: "开放浏览",
  "-1": "待审核",
  "-2": "稿件被退回",
  "-3": "网警锁定",
  "-4": "被锁定（撞车）",
  "-9": "等待转码",
  "-10": "延迟审核",
  "-16": "转码失败",
  "-100": "用户删除",
  "-30": "修改已提交",
  "-6": "修改已提交",
};
const live_status_dict = { 0: "未开播", 1: "直播中", 2: "轮播中" };

export { biliHeaders, SignParamsWbi, biliHDAppKey, appSign };
export { copyright_dict, state_dict, live_status_dict };
