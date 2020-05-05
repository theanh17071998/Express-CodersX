const shortid = require('shortid');

const Transaction = require('../models/transaction.model')
const User = require('../models/user.model')
const Book = require('../models/book.model')
const Session = require('../models/session.model')

module.exports.index = async function (req, res) {
    let page = req.query.page || 1;
    let perPage = 8;
    let transactions = await Transaction.find();
    let total = transactions.length;
    let start = (page - 1)*perPage
    let end = page*perPage
    let totalPage = total/perPage;
    res.render('transactions/index', {
        transactions: transactions.slice(start, end),
        totalPage: totalPage,
        n : 1,
        page: page
    })
   }
module.exports.create = async function (req, res) {
    return res.render('transactions/create', {
        books: await Book.find(),
        users: await User.find()
    });
   }
module.exports.postCreate = async function (req, res) {
    var name = req.body.name;
    let user = await User.findOne({name: name});
    var title = req.body.title;
    var book = await Book.findOne({title: title});
    req.body.id = shortid.generate();
    req.body.userId = user.id;
    req.body.bookId = book.id;
    req.body.iscomplete = false;
    await Transaction.create(req.body);
    res.redirect('/transactions')
  }
 module.exports.complete = async (req, res) => {
    const id = req.params.id;
    const transaction = await Transaction.findOne({_id: id})
    if(!transaction){
        return res.render('transactions/index', {
            error: 'Id transaction not exist',
            transactions: await Transaction.find()
        })
    }
    if(transaction.iscomplete === true){
        await Transaction.findOneAndUpdate({_id: id}, {iscomplete: false})
        // db.get('transactions').find(transaction).assign({iscomplete: false}).write()
    }else {
        // db.get('transactions').find(transaction).assign({iscomplete: true}).write()
        await Transaction.findOneAndUpdate({_id: id}, {iscomplete: true})
    }
   
    res.redirect('/transactions')
 }

module.exports.switchTransaction = async (req, res, next) => {
    if(!req.signedCookies.sessionId){
       return  res.redirect('/books')
    }
    const sessionId = req.params.sessionId;
    let userSession = await Session.findOne({id: sessionId});
    // var userSession = db.get('sessions').find({id: sessionId}).value();
    // let user = await User.findOne({id:sessionId});
    // var user = db.get('users').find({id: sessionId}).value();
    // db.get('users').find(user).assign({cart: userSession.cart}).write()
    await User.findOneAndUpdate({id : sessionId}, {cart: userSession.cart})
    var cart = user.cart;
    for(var key in cart){
        let transaction ={};
        transaction.name = user.name;
        let book = await Book.findOne({_id: key })
        // var book = db.get('books').find({id: key}).value();
        transaction.title = book.title;
        transaction.id = shortid.generate();
        transaction.userId = user.id
        transaction.bookId = key;
        transaction.iscomplete = false;
        await Transaction.create(transaction);
    }
    // db.get('sessions')
    // .remove({id: sessionId})
    // .write()
    await Session.findOneAndDelete({id: sessionId})
    res.redirect('/transactions')
}