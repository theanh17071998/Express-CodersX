module.exports.postCreate = (req, res, next) => {
    var errors = [];
    if(!req.body.title){
        errors.push('Titile is not exist')
    }
    if(!req.body.description){
        errors.push('Phone number must be 10 characters')
    }
    if(errors.length){
        res.render('books/create', {
            errors: errors,
            values : req.body
        })
        return;
    }
    next();
}