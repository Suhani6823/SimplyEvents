var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*router.get('/user-details.html', function(req, res){
    res.sendFile(__dirname+"/user-details.html");
});*/


// POST request to add the new event information to the database
// The details of the event are collected from the form filled by the user who creates the event
router.post('/addEvent', function(req, res, next) {

  // basic validation of the form details
  if( 'event_name' in req.body && req.body.event_name != "" && ' datetime1_start' in req.body && req.body.datetime1_start != "" &&
      'datetime1_end' in req.body && req.body.datetime1_end != ""){
        req.pool.getConnection( function(err,connection) {
          if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
          }
          var query = `INSERT INTO events (event_name, street_number, street, city, postcode, state_adr, country, descr,
            datetime1_start,  datetime1_end,  datetime2_start,  datetime2_end, datetime3_start,  datetime3_end,
            datetime4_start,  datetime4_end, event_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, "pending");`;
          connection.query(query,[
              req.body.event_name,
              req.body.st_no,
              req.body.st,
              req.body.city,
              req.body.postcode,
              req.body.state,
              req.body.country,
              req.body.descr,
              req.body.st_no,
              req.body.datetime1_start,
              req.body.datetime1_end,
              req.body.datetime2_start,
              req.body.datetime2_end,
              req.body.datetime3_start,
              req.body.datetime3_end,
              req.body.datetime4_start,
              req.body.datetime4_end], function(err, rows, fields) {
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

//this is where user data is selected from the db for current user email and displayed when page's body loads
router.post('/userdata', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var useremail = req.body.email;
    let query = "SELECT first_name, last_name, email FROM users WHERE email = '"+useremail+"';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.json(rows);
    });
  });
});

//this is where user data is selected from the db for current user email and updated after the user edits and clicks on the save button
router.post('/updateuserdata', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var updatedf_name = req.body.updateduserf_name;
    var updatedl_name= req.body.updateduserl_name;
    var updatedEmail= req.body.updateduserEmail;
    var currentemail= req.body.email;
    console.log(updatedf_name);
    console.log(updatedl_name);
    console.log(updatedEmail);
    console.log(currentemail);
    let query = "UPDATE users SET first_name = '"+updatedf_name+"', last_name = '"+updatedl_name+"', email = '"+updatedEmail+"' WHERE email = '"+currentemail+"';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.send("success");
    });
  });
});

//this is where admin data is selected from the db for current admin email and displayed when page's body loads
router.post('/admindata', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var adminemail = req.body.email;
    let query = "SELECT first_name, last_name, email FROM admins WHERE email = '"+adminemail+"';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
      console.log(rows);
        res.json(rows);
    });
  });
});

//this is where admin data is selected from the db for current admin email and updated after the admin edits and clicks on the save button
router.post('/updateadmindata', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var updatedf_name = req.body.updatedadminf_name;
    var updatedl_name= req.body.updatedadminl_name;
    var updatedEmail= req.body.updatedadminEmail;
    var currentemail= req.body.email;
    let query = "UPDATE admins SET first_name = '"+updatedf_name+"', last_name = '"+updatedl_name+"', email = '"+updatedEmail+"' WHERE email = '"+currentemail+"';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.send("success");
    });
  });
});

//this is where the confirmed list of events for the user are selected and sent
router.post('/confirmed-events-data', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var useremail = req.body.email;
    let query = "SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'confirmed';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.json(rows);
    });
  });
});

//this is where the pending list of events for the user are selected and sent
router.post('/pending-events-data', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var useremail = req.body.email;
    let query = "SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'pending';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.json(rows);
    });
  });
});

//this is where the past list of events for the user are selected and sent
router.post('/past-events-data', function(req, res, next){
  req.pool.getConnection(function(error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }
    var useremail = req.body.email;
    let query = "SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'past';";
    connection.query(query, function(error, rows, fields){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return ;
      }
        res.json(rows);
    });
  });
});

//get all events from a specific user and some user details for Users Events page
router.get('/userEventsInfo' , function(req, res, next){

  //var userid = 1;
  var userid = req.query.userid;

  req.pool.getConnection( function (error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
  let query = "SELECT first_name,last_name,email,e_id,event_name,status FROM User INNER JOIN Event ON User.u_id=Event.host WHERE u_id = '"+userid+"' ORDER BY status ASC;";
  connection.query(query,function(error, rows, fields){

    connection.release();
      if(error){
          console.log(error);
          res.sendStatus(500);
          return;
      }
      console.log(req.query.userid);
      console.log(query);
          res.json(rows);

    });
  });
});


//get user info to fill table in AdminHome page
router.get('/getUserInfo' , function(req, res, next){

  req.pool.getConnection( function (error, connection){
      if(error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

  var query = "SELECT u_id,first_name,last_name, email FROM User ORDER BY last_name ASC";
  connection.query(query, function(error, rows, fields){

    connection.release();
      if(error){
          console.log(error);
          res.sendStatus(500);
          return;
      }
          res.json(rows);

    });
  });
});

module.exports = router;
