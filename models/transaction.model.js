const mongoose = require('mongoose')

var transactionSchema = new mongoose.Schema({
    name: String,
    title: String,
    userId: String,
    bookId: String,
    iscomplete: Boolean,
    
})
var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions')

module.exports=Transaction;
