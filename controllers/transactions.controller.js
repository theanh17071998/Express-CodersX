const shortid = require('shortid');

const db = require('../db')

module.exports.index = function (req, res) {
    let page = req.query.page || 1;
    let perPage = 8;
    let drop = (page-1)*perPage;
    let total = db.get("transactions").value().length;
    let totalPage = total/perPage;
    res.render('transactions/index', {
        transactions: db.get("transactions").drop(drop).take(perPage).value(),
        totalPage: totalPage,
        n : 1,
        page: page
    })
   }
module.exports.create =  function (req, res) {
    return res.render('transactions/create', {
        books: db.get('books').value(),
        users: db.get('users').value()
    });
   }
module.exports.postCreate = function (req, res) {
    var name = req.body.name;
    var user = db.get('users').find({name: name}).value();
    var title = req.body.title;
    var book = db.get('books').find({title: title}).value();
    req.body.id = shortid.generate();
    req.body.userId = user.id;
    req.body.bookId = book.id;
    req.body.iscomplete = false;
    db.get('transactions').push(req.body).write();
    res.redirect('/transactions')
  }
 module.exports.complete = (req, res) => {
    const id = req.params.id;
    const transaction = db.get('transactions').find({id: id}).value();
    if(!transaction){
        return res.render('transactions/index', {
            error: 'Id transaction not exist',
            transactions: db.get("transactions").value()
        })
    }
    if(transaction.iscomplete === true){
        db.get('transactions').find(transaction).assign({iscomplete: false}).write()
    }else {
        db.get('transactions').find(transaction).assign({iscomplete: true}).write()
    }
   
    res.redirect('/transactions')
 }

module.exports.switchTransaction = (req, res, next) => {
    if(!req.signedCookies.sessionId){
       return  res.redirect('/books')
    }
    const sessionId = req.params.sessionId;
    var userSession = db.get('sessions').find({id: sessionId}).value();
    var user = db.get('users').find({id: sessionId}).value();
    db.get('users').find(user).assign({cart: userSession.cart}).write()
    var cart = user.cart;
    for(var key in cart){
        let transaction ={};
        transaction.name = user.name;
        var book = db.get('books').find({id: key}).value();
        transaction.title = book.title;
        transaction.id = shortid.generate();
        transaction.userId = user.id
        transaction.bookId = key;
        transaction.iscomplete = false;
        db.get('transactions').push(transaction).write();
    }
    db.get('sessions')
    .remove({id: sessionId})
    .write()
    res.redirect('/transactions')
}