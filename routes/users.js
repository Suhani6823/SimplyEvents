var argon2 = require('argon2');
var express = require('express');
var router = express.Router();

// Handles post request when user tries to login
// The user's login info: email and password are checked to see if they exist in the database
// if they do, the user successfully logs in and they are given a session token
// Otherwise the user can't login
router.post('/login', function(req, res, next) {

  if( 'email' in req.body && req.body.email != null && 'password' in req.body && req.body.password != null) {

      req.pool.getConnection( function(err,connection) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        var query = `SELECT u_id, first_name, last_name, email, password_hash
                      FROM users WHERE email = ?`;
        connection.query(query,[req.body.email], async function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if(rows.length > 0){
              let valid = await argon2.verify(rows[0].password_hash, req.body.password);
              if (valid) {
                  delete rows[0].password_hash;
                  // To tie the rows[0] object to the session
                  req.session.user = rows[0];
                  res.json(rows[0]);
              } else {
                  return res.sendStatus(401);
              }

          }
          else {
              res.sendStatus(401);
          }
        });
    });
  }
  else {
      res.sendStatus(400);
  }

});

// Handles the post request for login attempt by an admin
// if their email and password match and exist in the database then they are logged in and given a session token
router.post('/adminLogin', function(req, res, next) {

  if( 'email' in req.body && req.body.email != null && 'password' in req.body && req.body.password != null) {

      req.pool.getConnection( function(err,connection) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        var query = `SELECT a_id, first_name, last_name, email, password_hash
                      FROM admins WHERE email = ?`;
        connection.query(query,[req.body.email], async function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if(rows.length > 0){
              let valid = await argon2.verify(rows[0].password_hash, req.body.password);
              if (valid) {
                  delete rows[0].password_hash;
                  // To tie the rows[0] object to the session
                  req.session.user = rows[0];
                  res.json(rows[0]);
              } else {
                  return res.sendStatus(401);
              }

          }
          else {
              res.sendStatus(401);
          }
        });
    });
  }
  else {
      res.sendStatus(400);
  }

});

// Handles Post request for google signin
router.post('/google-sign-in', function(req, res, next) {

  res.sendStatus(200);
});

// Handles POST request when a user tries to signup
// if the user does not already exist in the db then their account is created and stored in the db
// there set password is hashed using argon and they are given a session token
router.post('/signup', async function(req, res, next) {

  // basic validation of the form details
  if( 'email' in req.body && req.body.email != "" && 'password' in req.body && req.body.password != NULL &&
      'fname' in req.body && req.body.fname != NULL && 'lname' in req.body) {

      // hashing the user's password and storing it in variable hash
      let hash = await argon2.hash(req.body.password);
      console.log(hash);

      req.pool.getConnection( function(err,connection) {
          if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          var query = `INSERT INTO users (first_name, last_name, password_hash, email) VALUES (?,?,?,?);`;
          connection.query(query,[
              req.body.fname,
              req.body.lname,
              hash, // storing the hashed password instead of the actual password in the db
              req.body.email], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            res.end();
          });
      });
  }
  else {
      res.sendStatus(400);
  }

});


// Middleware for all types of requests that start with /post/ that checks if the user is logged in
// If they are logged in then the request moves onto the next middleware
// Otherwise 401 code is sent to let the user know that they need to be logged in in order to perform certain actions in the webapp
// This is why its important that other middlewares and route codes besides the login and signup requests are below/after this piece of code

router.use('/post/', function(req, res, next) {
  // this is what checks if the user has a session attached
  if('user' in req.session){
      console.log("user is authenticated");
      next();
  } else {
      console.log("user is NOT authenticated");
      res.sendStatus(401);
  }
});

// When the user logs out their session is deleted
router.post('/logout', function(req, res, next) {

  delete req.session.user;

  res.send();

});



/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});


module.exports = router;
