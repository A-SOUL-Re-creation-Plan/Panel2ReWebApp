import { Router } from "express";

import requests from '../utils/requests.js';
import ResultResp from "../results/index.js";

const router = Router();

router.get('/',async(req, res)=>{
    res.send('Panel2Re(Express) is running.');
    return;
})

router.get('/version',async(req,res)=>{
    res.send('_internal')
})

export { router as default }