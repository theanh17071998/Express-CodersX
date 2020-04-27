const db = require('../db')

module.exports.authoring = (req, res, next) => {
    const cookie = req.signedCookies.userId;
    const user = db.get('users').find({id: cookie}).value();
    const transactionsUser = db.get('transactions').value().filter((transaction)=> {
        return transaction.userId === cookie;
    })
    if(user.isAdmin === false){
        return res.render('transactions/index', {
            transactions: transactionsUser
        })
    }
    next()
}