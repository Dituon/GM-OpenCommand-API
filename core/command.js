import fetch from 'node-fetch'
import fs from 'fs'

import { resultObject } from '../api.js'
import sign from './sign.js'
import config from '../config.js'

export default async function command(req) {
    let uid = await new Promise(res =>
        fs.readFile(`./data/${req.token}`, 'utf-8',
            (err, data) => err ? res(false) : res(data)))
    console.log(uid)
    if (!uid) return resultObject(400)

    const url = `${config.muip}?cmd=1116&uid=${uid}&msg=${req.data}&region=${config.region}&sign=${sign()}`

    let retcode = 200
    await fetch(url).then(() => retcode = 200).catch(() => retcode = 400)
    return resultObject(retcode)
}