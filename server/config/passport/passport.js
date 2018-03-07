const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, reviewer) => {
    
    const Reviewer = reviewer;
    const LocalStrategy = require('passport-local').Strategy;

    // serialize
    passport.serializeUser((reviewer, done) => {
        done(null, reviewer.id);
    });

    // deserialize reviewer
    passport.deserializeUser((id, done) => {
        Reviewer.findById(id).then((reviewer) => {
            if (reviewer) {
                done(null, reviewer.get());
            } else {
                done(reviewer.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            // overrides localstrategy default of username with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        (req, email, password, done) => {
            
            const generateHash = (password) =>  bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            Reviewer.findOne({
                where: {
                    email
                }
            })
            .then((reviewer) => {
                if (reviewer) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                }
                const reviewerPassword = generateHash(password);
                const data = {
                            email,
                            password: reviewerPassword,
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };
                Reviewer.create(data)
                .then((newReviewer, created) => {
                    if (!newReviewer) {
                        return done(null, false);
                    }
                    if (newReviewer) {
                        return done(null, newReviewer);
                    }
                })
            })
        }        
    ));

    // LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // overrides localstrategy default of username with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
 
        (req, email, password, done) => {
            let Reviewer = reviewer;
            let isValidPassword = (userpass, password) => bCrypt.compareSync(password, userpass)
 
        Reviewer.findOne({
            where: {
                email
            }
        }).then((reviewer) => {
            if (!reviewer) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (!isValidPassword(reviewer.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            let reviewerinfo = reviewer.get();
            return done(null, reviewerinfo);
        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
    }
));



}