const shortid = require('shortid');

const db = require('../db')
const Session = require('../models/session.model')

module.exports = async (req, res, next) => {
    if(!req.signedCookies.sessionId){
        const sessionId =  shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        await Session.create({
            id: sessionId
        })
    }
    next()
}