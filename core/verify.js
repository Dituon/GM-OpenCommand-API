import fs from 'fs'

import { resultObject } from "../api.js";
import { tokenUidMap, verifyCodeMap } from "./sendCode.js";

export default async function verify(req) {
    let code = verifyCodeMap.get(req.token)
    if (!code || req.data != code) return resultObject(400)
    fs.writeFile(`./data/${req.token}`, tokenUidMap.get(req.token) + '',
        err => err ? console.log(err) : console.log(req.token))
    return resultObject(200)
}