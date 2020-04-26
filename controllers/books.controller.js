const shortid = require('shortid');

const db = require('../db')

module.exports.index = function (req, res) {
    res.render('books/index', {
        books: db.get("books").value()
    })
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
 module.exports.postUpdate =  (req,res) => {
   var id = req.params.id;
   var book = db.get('books').find({id: id}).value();
   db.get('books').find(book).assign({title: req.body.title, description: req.body.description }).write();
   res.redirect('/books')
}
module.exports.update = (req, res) => {
   var id = req.params.id;
   var book = db.get('books').find({id: id}).value();
   var bookEdit = {};
   bookEdit.id = id;
   bookEdit.title = book.title;
   bookEdit.description = book.description;
   res.render('books/update', {
       book: bookEdit
   })
}