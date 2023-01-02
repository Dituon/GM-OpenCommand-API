export default {
    port: 1145,
    muip: 'http://home.mrji.tk:20011',
    region: 'dev_local',
    timeout: 60000,
    salt: 'salt',
    mail: {
        sender: 1,
        title: '验证码',
        content: `你的验证码是$CODE, 10分钟后过期`,
        expireTime: 600
    }
}