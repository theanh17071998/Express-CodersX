const express = require('express');
const shortid = require('shortid');

const db = require('../db')

const route = express.Router();


route.get('/', function (req, res) {
    res.render('index', {
        books: db.get("books").value()
    })
   });
route.get('/update/:id', function(req, res){ 
   var id = req.params.id; 
   var book = db.get('books').find({id: id}).value()
   db.get('books').find(book)
   .assign({ title: 'Năng và gió'})
   .write()
   res.redirect('/books')
});
route.get('/delete/:id', function(req, res){
 
   var id = req.params.id; 
   var book = db.get('books').find({id: id}).value()
   db.get('books')
   .remove(book)
   .write()
   res.redirect('/books')
});
route.get('/create', function (req, res) {
   res.render('books/create')
 }) 

route.post('/create', function (req, res) {
   req.body.id = shortid.generate();
   db.get("books").push(req.body).write();  
   res.redirect('/books'); 
  
})


module.exports = route;