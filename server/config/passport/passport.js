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
}