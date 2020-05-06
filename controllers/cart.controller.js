const User = require('../models/user.model')
const Session = require('../models/session.model')
const Book = require('../models/book.model')

module.exports.index = async (req, res, next) => {
    let cookie = req.signedCookies.userId;
    let user = await User.findOne({_id: cookie});
    let books = user.cart.bookList || [];
    let arrCart = [];
        for(var value of books){
            let book = await Book.findOne({_id: value});
            let cart= {};
            cart.id = value
            cart.title = book.title;
           arrCart.push(cart)
        
        }
    res.render('cart/index', {
        cart: arrCart
    })
}
module.exports.addToCart = async (req, res, next) => {
    const bookId = req.params.bookId;
    const sessionId = req.signedCookies.sessionId;
    const cookie = req.signedCookies.userId;
    if(!cookie){
        if(!sessionId){
            res.redirect('/books');
            return;
        }
        // let count = db.get('sessions')
        // .find({id:sessionId})
        // .get(`cart.${bookId}`, 0)
        // .value()
       let session = await Session.findOne({id: sessionId})
       let books = session.cart.bookList || [];
        await Session.updateOne({id: sessionId},{ $set:
            {
                cart: {bookList: [...books, bookId]}
            }
         });
        
        res.redirect('/cart')
    }
    // await User.findOneAndUpdate({_id: cookie}, set(`cart.${bookId}`, 1))
    // res.redirect('/books')
    let user = await User.findOne({_id: cookie})
    let books = user.cart.bookList || [];
    await User.updateOne({_id: cookie},{ $set:
        {
            cart: {bookList: [...books, bookId]}
        }
     });
     res.redirect('/cart')
}
module.exports.delete = async (req, res, next) =>  {
    const cookie = req.signedCookies.userId;
    const bookId = req.params.bookId;
    let user = await User.findOne({_id: cookie});
    let arrBooks = user.cart.bookList;
    let books = arrBooks.filter((item) => {
        return item !== bookId;
    })
    await User.updateOne({_id: cookie},{ $set:
        {
            cart: {bookList: [...books]}
        }
     });
    res.redirect('/cart')
}