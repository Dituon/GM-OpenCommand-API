import fetch from 'node-fetch'

import { resultObject } from '../api.js'
import sign from './sign.js'
import config from '../config.js'

/** @type { Map<string, number> } */
export const verifyCodeMap = new Map()
/** @type { Map<string, number> } */
export const tokenUidMap = new Map()

export default async function sendCode(req) {
    let uid = req.data
    let token = sign()
    const code = Math.floor(Math.random() * 9000) + 1000

    verifyCodeMap.set(token, code)
    tokenUidMap.set(token, uid)
    setTimeout(() => {
        verifyCodeMap.delete(token)
        tokenUidMap.delete(token)
    }, config.timeout)

    const url = `${config.muip}?uid=${uid}&title=${config.mail.title}&content=${config.mail.content.replace('$CODE', code)}&sender=${config.mail.sender}&expire_time=${config.mail.expireTime + Math.floor(new Date().getTime() / 1000)}&is_collectible=false&cmd=1005&region=${config.region}&ticket=@YSGM${sign()}&sign=${sign()}`
    console.log(url)
    let retcode = 200
    await fetch(url).then(() => retcode = 200).catch(() => retcode = 400)
    return resultObject(retcode, token)
}