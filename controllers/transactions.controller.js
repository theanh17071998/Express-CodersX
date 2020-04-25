const shortid = require('shortid');

const db = require('../db')

module.exports.index = function (req, res) {
    res.render('transactions/index', {
        transactions: db.get("transactions").value()
    })
   }
module.exports.create =  function (req, res) {
    res.render('transactions/create', {
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
        res.render('transactions/index', {
            error: 'Id transaction not exist',
            transactions: db.get("transactions").value()
        })
        return;
    }
    if(transaction.iscomplete === true){
        db.get('transactions').find(transaction).assign({iscomplete: false}).write()
    }else {
        db.get('transactions').find(transaction).assign({iscomplete: true}).write()
    }
   
    res.redirect('/transactions')
 }