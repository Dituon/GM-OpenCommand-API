export default {
    port: 1145,
    muip: 'http://127.0.0.1:20011',
    region: 'dev_local',
    timeout: 60000,
    mail: {
        sender: 1,
        title: '验证码',
        content: `你的验证码是$CODE, 10分钟后过期`,
        expireTime: 600
    },
    query: {
        version: '3.2 GM',
        maxPlayer: 1000,
        playerCount: 0
    }
}