import http from 'http'
import fs from 'fs'

import config from './config.js'
import command from './core/command.js'

import ping from './core/ping.js'
import sendCode from './core/sendCode.js'
import verify from './core/verify.js'

if (!fs.existsSync('./data/')) fs.mkdirSync('./data')

/** @typedef {{retcode: number, message: string, data: any}} ResultDTO */

export const server = http.createServer()

server.on('request', async (req, res) => {
    let jsonStr = '', json = null
    req.on('data', str => jsonStr += str)
    await new Promise(rej => req.on('end', rej))
    try {
        json = JSON.parse(jsonStr)
        res.writeHead(200, { 'Content-Type': 'application/json' })
    } catch (e) {
        console.warn(jsonStr)
        res.writeHead(400)
        res.end()
        return
    }

    /** @type {Promise<ResultDTO>} */
    let resultPromise
    switch (json.action) {
        case 'ping':
            resultPromise = ping(json)
            break
        case 'sendCode':
            resultPromise = sendCode(json)
            break
        case 'verify':
            resultPromise = verify(json)
            break
        case 'command':
            resultPromise = command(json)
            break
        default:
            resultPromise = new Promise(rej => rej(resultObject(400)))
    }
    resultPromise.then(r => {
        res.write(JSON.stringify(r))
        res.end()
    })
})

server.listen(config.port, () => console.log(server))


/** 
 * @param {number} [retcode = 200]
 * @param {any} [data = null]
 * @return {ResultDTO}
 */
export const resultObject = (retcode = 200, data = null) => {
    let message = ''
    switch (retcode) {
        case 200:
            message = 'Success'
            break
        case 400:
            message = 'Failed'
            break
    }
    return {
        retcode: retcode,
        message: message,
        data: data
    }
}