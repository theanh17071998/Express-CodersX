const shortid = require('shortid');

const db = require('../db')

module.exports.index = function (req, res) {
    res.render('books/index', {
        books: db.get("books").value()
    })
   }
module.exports.update = function(req, res){ 
    var id = req.params.id; 
    var book = db.get('books').find({id: id}).value()
    db.get('books').find(book)
    .assign({ title: 'Năng và gió'})
    .write()
    res.redirect('/books')
 }
 module.exports.delete = function(req, res){
    var id = req.params.id; 
    var book = db.get('books').find({id: id}).value()
    db.get('books')
    .remove(book)
    .write()
    res.redirect('/books')
 }
 module.exports.create = function (req, res) {
    res.render('books/create')
  }
 module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();  
    res.redirect('/books'); 
   
 }