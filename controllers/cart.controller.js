const db = require('../db')
const Session = require('../models/session.model')

module.exports.addToCart = async (req, res, next) => {
    const bookId = req.params.bookId;
    const sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/books');
        return;
    }
    // let count = db.get('sessions')
    // .find({id:sessionId})
    // .get(`cart.${bookId}`, 0)
    // .value()

    await Session.findOne({id: sessionId})
    .set(`cart.${bookId}`,1)
    res.redirect('/books')
}