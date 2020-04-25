const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/users.route')
const bookRoute = require('./routes/books.route')
const transactionRoute = require('./routes/transactions.route')
const authRoute = require('./routes/auth.route')
const authMiddleware = require('./middlewares/auth.middleware')

var port = 3000;

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser()) 
app.use(express.static('public'))

app.get('/', function (req, res) { 
    res.send("<h1>Hello coder.Tokyo</h1>");
 })
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/books', authMiddleware.requireAuth, bookRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute)
app.use('/auth', authRoute)

app.listen(port, function(){
    console.log('server running with port' + port);
});
