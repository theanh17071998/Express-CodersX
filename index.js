const express = require('express');
const bodyParser = require('body-parser')

const userRoute = require('./routes/users.route')
const bookRoute = require('./routes/books.route')
const  transactionRoute = require('./routes/transactions.route')

var port = 3000;

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/', function (req, res) { 
    res.send("<h1>Hello coder.Tokyo</h1>");
 })

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute)

app.listen(port, function(){
    console.log('server running with port' + port);
});
