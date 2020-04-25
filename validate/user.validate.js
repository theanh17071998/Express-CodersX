module.exports.postCreate = (req, res, next) => {
    var errors = [];
    if(req.body.name.length < 30){
        errors.push('The number of characters must be greater than 30')
    }
    if(req.body.phone.length !== 10){
        errors.push('Phone number must be 10 characters')
    }
    if(errors.length){
        res.render('users/create', {
            errors: errors,
            values : req.body
        })
        return;
    }
    next();
}