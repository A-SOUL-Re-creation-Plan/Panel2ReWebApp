import { Router } from "express";
import bodyParser from "body-parser";
import path from 'node:path';
import multer from "multer";

import results from '../results/index.js'
import { refreshCookie } from "../utils/requests.js";
import requests from "../utils/requests.js";

import { app as electron } from '../../background.js'
import { rm } from "node:fs";

const router = Router();
const cookieStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(electron.getPath("userData")));
    },
    filename: (req, file, cb)=>{
        cb(null, 'biliup.json');
    }
})
const cookieUpload = multer({ storage: cookieStorage });

// router.use(jsonParser);

router.post("/login_cookie", cookieUpload.single("file"), (req, res) => {
  if (req.file.mimetype != "application/json") {
    res.statusCode = 403;
    res.json(results(-1, "INVALID_FILE"));
  } else {
    refreshCookie().then(()=>{
        res.json(results.OK());
    }).catch(()=>{
        res.statusCode = 500;
        res.json(results.AUTH_FAILED("COOKIE_ERROR"));
    });
  }
});

router.get('/info', (req,res)=>{
    requests.get("/x/web-interface/nav").then((_)=>{
        var data = _.data.data;
        res.send(results.OK(data))
    }).catch((_)=>{
        res.statusCode = 403;
        res.send(results.AUTH_FAILED())
    });
})

router.delete('/logout',(req,res)=>{
    try {
        rm(path.join(electron.getPath("userData"), "biliup.json"));
        res.send(results.OK())
    } catch (error) {
        res.status(500).send(results.FAILED);
    }
})

export default router