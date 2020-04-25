const db = require('../db')

module.exports.count = (req, res, next) => {
    res.cookie('user-id', 12345)
    if(req.cookies['user-id']){
        db.update('count', n => n + 1).write()
        var n = db.get('count').value()
        console.log(`cookie: ${req.cookies['user-id']}, count: ${n}`)
    } 
    else{
        console.log('set cookie')
        db.update('count', n => n*0).write()
    }
    
    next()
}