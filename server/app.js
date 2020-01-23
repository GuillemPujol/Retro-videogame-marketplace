const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session'); // Only needed for some passport strategies

const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcryptjs');         // Used for hashing passwords!
const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const API_URL = process.env.API_URL || 'http://localhost:8080/api';
const APP_URL = process.env.APP_URL || 'http://localhost:3000/';
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode
const secret = "the cake is not a lie";

app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true}));


passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = users.find((user) => user.username === username);
        if (user) { // If the user is found
            bcrypt.compare(password, user.hash, (err, result) => {
                if (result) { // If the password matched
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                    return done(null, {username: username, token: token});
                }
                else done(null, false, { message: 'Incorrect username or password.' });
            });
        } else {
            done(null, false, { message: 'User not found' });
        }
    }
));

app.use(passport.initialize());

// Open paths that do not need login. Any route not included here is protected!
let openPaths = [
    { url: /\/api\/users\/authenticate.*/gi, methods: ['POST', 'GET'] },
    { url: /\/api\/platforms.*/gi, methods: ['GET'] },

];

// Validate the user using authentication. checkJwt checks for auth token.
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
        res.status(401).json({ error: err.message, debug: 'checkJwt' }); // Return 401 with error message.
    } else {
        next(); // If no errors, send request to next middleware or route handler
    }
});


/**** Local Users ****/

// It is recommended that you store users in MongoDB using Mongoose instead of this.
const users = [
    // These are just some test users with passwords.
    // The passwords are in clear text for testing purposes. (don't do this in production)
    { id: 0, username: "admin", password: 'admin'},
    { id: 0, username: "user", password: 'user'},
];

// Creating more test data: We run through all users and add a hash of their password to each.
// Again, this is only for testing. In practice, you should hash only when adding new users.
users.forEach(user => {
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed
     });
});


// Validate the user using authentication. checkJwt checks for auth token.
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

const usersRouter = require('./user_router')(users, secret, passport, APP_URL);
app.use('/api/users', usersRouter);

/**** Database ****/
// The "Kitten Data Access Layer".
const platformDAL = require('./platform_dal')(mongoose);

/**** Start ****/
const url = (process.env.MONGO_URL || 'mongo://localhost/my_database');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        // Fill in test data if needed.
        await platformDAL.bootstrap();

        // Routes
        const platformRouter = require('./platform_router')(platformDAL);
        app.use('/api/platforms', platformRouter);
        // const userRouter = require('./user_router')(userDAL);
        // app.use('/api/users', userRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        await app.listen(port); // Start the API
        console.log(`Game API running on port ${port}!`)
    })
    .catch(error => console.error(error));



