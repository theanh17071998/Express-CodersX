const db = require('../db')
const User = require('../models/user.model')

module.exports.authoring = async (req, res, next) => {
    const cookie = req.signedCookies.userId;
    const user = await User.findOne({_id: cookie})
    let transactions = await User.find();
    const transactionsUser = transactions.filter((transaction)=> {
        return transaction.userId === cookie;
    })
    if(user.isAdmin === false){
       return res.render('transactions/index', {
            transactions: transactionsUser
        })
    }
    next()
}