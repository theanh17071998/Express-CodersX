const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;

const db = require('../db')

module.exports.index = function (req, res) {
   const cookie = req.signedCookies.userId;
   const user = db.get('users').find({id: cookie}).value();
   let page = req.query.page || 1;
   let perPage = 8;
   let drop = (page-1)*perPage;
   let total = db.get("books").value().length;
   let totalPage = total/perPage;
   let isUser = true; 
   let sessionId = req.signedCookies.sessionId;
   if(!cookie || !user.isAdmin){
      isUser = false;
      return res.render('books/index', {
         books: db.get("books").drop(drop).take(perPage).value(),
         totalPage: totalPage,
         n : 1,
         page: page,
         isUser: isUser,
         sessionId: sessionId,
         isAdmin: user.isAdmin
     })
   }
   return res.render('books/index', {
      books: db.get("books").drop(drop).take(perPage).value(),
      totalPage: totalPage,
      n : 1,
      page: page,
      isAdmin: user.isAdmin
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
   // cloudinary.uploader.upload('F:/Web/favicon.png', {folder: "/TA_Books"}, function(error, result) {console.log(result, error)});
   req.body.avatar = cloudinary.image("http://res.cloudinary.com/nguyentheanh/image/upload/v1588119828/TA_Books/qjyhr2twdmdlvtznfxb5.png").split("'")[1];
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
