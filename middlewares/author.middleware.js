const db = require('../db')

module.exports.authoring = (req, res, next) => {
    const cookie = req.cookies.userId;
    const user = db.get('users').find({id: cookie}).value();
    const transactionsUser = db.get('transactions').value().filter((transaction)=> {
        return transaction.userId === cookie;
    })
    if(user.isAdmin === false){
        res.render('transactions/index', {
            transactions: transactionsUser
        })
    }
    next()
}