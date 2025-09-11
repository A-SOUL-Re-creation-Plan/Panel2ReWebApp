import { Router } from "express";
import dynamic_config from "../dynamic_config.json" assert { type: "json" };
import requests from "../utils/requests.js";
import ResultResp from "../results/index.js";
import { SignParamsWbi, copyright_dict } from "../utils/bilibili.js";
import axios from "axios";

const router = Router();

router.get("/dynamic", async (req, res) => {
  const fetchInfo = async (config) => {
    var uid_list = [];
    for (const u of config) {
      uid_list.push(u.bili_uid);
    }
    var uid_string = uid_list
      .map((i) => {
        return i;
      })
      .join(",");
    try {
      let request = await requests.get("/account/v1/user/cards", {
        params: { uids: uid_string },
        baseURL: "https://api.vc.bilibili.com",
      });
      return await request.data.data.sort((a, b) => {
        return a.mid - b.mid;
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
  try {
    axios
      .get("/x/passport-login/web/qrcode/generate", {
        baseURL: "https://passport.bilibili.com",
      })
      .then((_) => {
        let data = _.data;
        data.data.time = Date.now();
        res.send(ResultResp.OK(data.data));
      });
  } catch (error) {
    res.status(500).send(ResultResp.FAILED(error.message));
  }
});

router.get("/qrcode/pool", async (req, res) => {
  try {
    let qrcode_key = req.query.key;
    axios
      .get("/x/passport-login/web/qrcode/poll", {
        baseURL: "https://passport.bilibili.com",
        params: { qrcode_key: qrcode_key },
      })
      .then((_) => {
        let data = _.data.data;
        if (data.code == 0) {
          let cookieString = "";
          let cookies = _.headers["set-cookie"];
          for (let cookie of cookies) {
            cookieString += `${cookie.split("; ")[0]}; `;
          }
          data.cookies = cookieString;
        }
        res.send(ResultResp.OK(data));
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

export default router;
