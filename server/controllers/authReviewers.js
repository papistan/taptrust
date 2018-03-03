
module.exports = {
    signup(req, res) {
        res.render('signup');
    },

    signin(req, res) {
        res.render('signin');
    },

    dashboard(req, res) {
        res.render('dashboard');
    },
    
    logout(req, res) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}