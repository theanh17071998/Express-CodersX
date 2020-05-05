const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;

const db = require('../db')
const User = require('../models/user.model')
const Book = require('../models/book.model')

module.exports.index = async  (req, res) =>  {
   const cookie = req.signedCookies.userId;
   let books = await Book.find();
   let page = req.query.page || 1;
   let perPage = 8;
   let start = (page - 1)*perPage
   let end = page*perPage
   let total = books.length;
   let totalPage = total/perPage;
   let isUser = true; 
   let sessionId = req.signedCookies.sessionId;
   if(!cookie){
      return res.render('books/index', {
         books: books.slice(start, end),
         totalPage: totalPage,
         n : 1,
         page: page,
         isAdmin: false
      })
   }
   const user = await User.findOne({_id: cookie});
   if(!cookie || !user.isAdmin){
      isUser = false;
      return res.render('books/index', {
         books: books.slice(start, end),
         totalPage: totalPage,
         n : 1,
         page: page,
         isUser: isUser,
         sessionId: sessionId,
         isAdmin: user.isAdmin
     })
   }
   return res.render('books/index', {
      books: books.slice(start, end),
      totalPage: totalPage,
      n : 1,
      page: page,
      isAdmin: user.isAdmin
   })
   }
 module.exports.delete = async function(req, res){
    var id = req.params.id;
    await Book.findOneAndDelete({_id: id});
    res.redirect('/books')
 }
 module.exports.create = function (req, res) {
    res.render('books/create')
  }
 module.exports.postCreate = async function (req, res) {
   req.body.id = shortid.generate();
   // cloudinary.uploader.upload('F:/Web/favicon.png', {folder: "/TA_Books"}, function(error, result) {console.log(result, error)});
   req.body.avatar = cloudinary.image("http://res.cloudinary.com/nguyentheanh/image/upload/v1588119828/TA_Books/qjyhr2twdmdlvtznfxb5.png").split("'")[1];
   await Book.create(req.body);  
   res.redirect('/books'); 
 }

 module.exports.postUpdate = async (req,res) => {
   var id = req.params.id;
   await Book.findOneAndUpdate({_id: id}, {title: req.body.title, description: req.body.description });
   res.redirect('/books')
}
module.exports.update = async (req, res) => {
   var id = req.params.id;
   const book = await Book.findOne({_id: id});
   var bookEdit = {};
   bookEdit.id = id;
   bookEdit.title = book.title;
   bookEdit.description = book.description;
   res.render('books/update', {
       book: bookEdit
   })
}
