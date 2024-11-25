const mongoose = require('mongoose');
// Middleware to check the database connection status
const checkDBConnection = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        //whenver we are connected our mongoose connection readystate is always one 
        return res.status(500).json({ message: 'Database connection error' });
    }
    next();
};
// Middleware to check if a channel is created
const checkChannel = (req, res, next) => {
    if (!req.channel?.uid) {//agr req channel par uid nhi h tow
        res.redirect('/channel/create');//create channel
    } else { //if channel is created
        next();
    }
};
// Middleware to check if a user is logged in
const isloggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {//this is a function provided by the passport this gives true or false 
        return next();//if true
    } else { //login 
        res.redirect('/');
    }
};
// Utility function to handle async errors in middleware
function asyncHandler(fn) { 
    return function (req, res, next) {
        return Promise
            .resolve(fn(req, res, next))
            .catch(next);
    }
}
// Exporting the middleware functions for use in other parts of the application
module.exports = {
    checkDBConnection,
    checkChannel,
    isloggedIn,
    asyncHandler
};