import { Router } from "express";
import dynamic_config from "../dynamic_config.json" assert { type: "json" };
import requests from "../utils/requests.js";
import ResultResp from "../results/index.js";
import {
  SignParamsWbi,
  appSign,
  biliHDAppKey,
  copyright_dict,
} from "../utils/bilibili.js";
import axios from "axios";

const router = Router();

router.get("/dynamic", async (req, res) => {
  const fetchInfo = async (config) => {
    var uid_list = [];
    for (const u of config) {
      uid_list.push({
        uid: u.bili_uid,
        id: u.id,
      });
    }
    var uid_string = uid_list
      .map((i) => {
        return i.uid;
      })
      .join(",");
    try {
      let request = await requests.get("/account/v1/user/cards", {
        params: { uids: uid_string },
        baseURL: "https://api.vc.bilibili.com",
      });
      return await request.data.data
        .map((v) => {
          return {
            ...v,
            id: uid_list.find((tmp) => tmp.uid == v.mid).id,
          };
        })
        .sort((a, b) => {
          return a.id - b.id;
        });
    } catch (error) {
      return {};
    }
  };

  try {
    res.send(ResultResp.OK(await fetchInfo(dynamic_config)));
  } catch (error) {
    res.status(500).send(ResultResp.FAILED());
  }
});

router.get("/dynamics", async (req, res) => {
  try {
    var uid = req.query.uid;
    var offset = req.query.offset ? req.query.offset : "";
    var uid_list = [];
    for (const u of dynamic_config) {
      uid_list.push(u.bili_uid);
    }
    if (!uid_list.includes(uid)) {
      res.status(403).send(ResultResp(-403, "ERR_NOT_A-SOUL_RELATED"));
    }
    requests
      .get("/x/polymer/web-dynamic/v1/feed/space", {
        params: await SignParamsWbi({
          host_mid: uid,
          offset: offset,
          features:
            "itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,forwardListHidden,decorationCard,commentsNewVersion,onlyfansAssetsV2,ugcDelete,onlyfansQaCard",
        }),
      })
      .then((_) => {
        res.send(ResultResp.OK(_.data.data));
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/member/archives", async (req, res) => {
  try {
    requests
      .get("/x/web/archives", {
        params: {
          status: req.query.status,
          pn: req.query.pn,
          ps: req.query.ps,
        },
        baseURL: "https://member.bilibili.com",
      })
      .then((_) => {
        let status = _.data.data.class;
        let arc_items = [];
        if (_.data.data.arc_audits) {
          for (let i of _.data.data.arc_audits) {
            let archive = i.Archive;
            for (let [idx, v] of i.Videos.entries()) {
              if (v.reject_reason != "") {
                archive.reject_reason += `\nP${idx + 1}-${v.reject_reason}`;
              }
            }
            archive.copyright = copyright_dict[archive.copyright];
            arc_items.push(archive);
          }
        }
        res.send(
          ResultResp.OK({
            page: _.data.data.page,
            archives: arc_items,
            status: _.data.data.class,
          })
        );
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/member/archives/xcode_msg", async (req, res) => {
  try {
    requests
      .get("/x/web/archive/failcode", {
        params: {
          bvid: req.query.bvid,
        },
        baseURL: "https://member.bilibili.com",
      })
      .then((_) => {
        let data = _.data.data.videos;
        let data_string = "unknown";
        if (data) {
          data_string = "";
          for (let val of data) {
            data_string += `P${val.index_order}: ${val.xcode_fail_msg} (${val.cid})\n`;
          }
        }
        res.send(
          ResultResp.OK({
            msg: data_string,
          })
        );
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/qrcode/fetch", async (req, res) => {
  const form = new URLSearchParams(
    appSign(
      {
        ts: (parseInt(new Date().getTime().toString()) / 1000).toFixed(0),
        local_id: 0,
      },
      biliHDAppKey.signKey,
      biliHDAppKey.signSec
    )
  );
  try {
    requests
      .post("/x/passport-tv-login/qrcode/auth_code", form, {
        baseURL: "https://passport.bilibili.com",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((_) => {
        let data = _.data;
        if (data.code == 0) {
          data.data.time = parseInt(new Date().getTime().toString());
          res.send(ResultResp.OK(data.data));
        } else {
          res.status(500).send(JSON.stringify(data));
        }
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/qrcode/pool", async (req, res) => {
  try {
    let auth_code = req.query.key;
    const form = new URLSearchParams(
      appSign(
        {
          ts: Date.now(),
          local_id: 0,
          auth_code,
        },
        biliHDAppKey.signKey,
        biliHDAppKey.signSec
      )
    );
    requests
      .post("/x/passport-tv-login/qrcode/poll", form, {
        baseURL: "https://passport.bilibili.com",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((_) => {
        let data = _.data.data;
        if (_.data.code == 0) {
          data.cookies = data.cookie_info.cookies
            .map((v) => {
              return `${v.name}=${v.value}; `;
            })
            .join("");
        }
        res.send(data ? ResultResp.OK(data) : _.data);
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/pm", async (req, res) => {
  try {
    let session_list = (
      await requests.get("/session_svr/v1/session_svr/get_sessions", {
        baseURL: "https://api.vc.bilibili.com",
        params: {
          begin_ts: "",
          size: 30,
          mobi_app: "web",
          session_type: 1,
          group_fold: 1,
          unfollow_fold: 0,
          sort_rule: 2,
        },
      })
    ).data.data.session_list;
    let talkers_ids = session_list.map((_) => _.talker_id);
    let talkers_info = (
      await requests.get("/account/v1/user/cards", {
        baseURL: "https://api.vc.bilibili.com",
        params: {
          uids: talkers_ids.join(","),
        },
      })
    ).data.data;
    for (const i in session_list) {
      let id = session_list[i].talker_id;
      if (id === 844424930131966) {
        session_list[i].account_info = {
          mid: 844424930131966,
          face: "https://message.biliimg.com/bfs/im/489a63efadfb202366c2f88853d2217b5ddc7a13.png",
          name: "UP主小助手",
        };
      } else {
        if (session_list[i].account_info) {
          let acc_info = session_list[i].account_info;
          delete session_list[i].account_info;
          session_list[i].account_info = {
            mid: -1,
            face: acc_info.pic_url,
            name: acc_info.name,
          };
        } else {
          let target = talkers_info.find(
            (_) => _.mid === session_list[i].talker_id
          );
          session_list[i].account_info = target;
        }
      }
    }
    res.send(ResultResp.OK(session_list));
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/unread", async (req, res) => {
  try {
    let data = (
      await requests.get("/session_svr/v1/session_svr/single_unread", {
        baseURL: "https://api.vc.bilibili.com",
        params: {
          build: 0,
          mobi_app: "web",
          unread_type: 0,
          show_unfollow_list: 1,
        },
      })
    ).data.data;
    let count_keys = Object.keys(data);
    let total_count = 0;
    for (let i of count_keys) {
      total_count += data[i];
    }
    res.send(
      ResultResp.OK({
        total_count,
        ...data,
      })
    );
  } catch (e) {
    res.status(500).send(ResultResp.FAILED(e.message));
  }
});

export default router;
