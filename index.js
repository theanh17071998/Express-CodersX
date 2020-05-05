require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const userRoute = require('./routes/users.route')
const bookRoute = require('./routes/books.route')
const transactionRoute = require('./routes/transactions.route')
const authRoute = require('./routes/auth.route')
const cartRoute = require('./routes/cart.route')

const authMiddleware = require('./middlewares/auth.middleware')
const authorMiddleware = require('./middlewares/author.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

var port = 3000;

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET)) 
app.use(express.static('public'))
app.use(sessionMiddleware)

app.get('/', function (req, res ) { 
    res.render('index')
 })
app.use('/users', authMiddleware.requireAuth,authorMiddleware.authoring, userRoute);
app.use('/books', authMiddleware.notRequireAuth, bookRoute);
app.use('/transactions', authMiddleware.requireAuth, authorMiddleware.authoring,transactionRoute)
app.use('/auth', authRoute)
app.use('/cart', cartRoute)

app.listen(port, function(){
    console.log('server running with port' + port);
});
