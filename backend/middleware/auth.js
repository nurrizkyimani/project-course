module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        } else {
            console.log('ensure auth is failed');
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next ) {
        if(req.isAuthenticated()){
            
            res.redirect('/')
        } else {
            
            return next()
        }
    }
}

// middleware ensuring to log in