const db = require('../db')

module.exports.addToCart = (req, res, next) => {
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

    db.get('sessions')
    .find({id: sessionId})
    .set(`cart.${bookId}`,1)
    .write()
    res.redirect('/books')
}