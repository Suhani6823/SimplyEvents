DROP DATABASE IF EXISTS events;
CREATE DATABASE events;
USE events;

CREATE TABLE users (
    u_id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password_hash VARCHAR(256),
    email VARCHAR(128),
    PRIMARY KEY (u_id)
);

CREATE TABLE admins (
    a_id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password_hash VARCHAR(256),
    email VARCHAR(128),
    PRIMARY KEY (a_id)
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT,
  event_name VARCHAR(50),
  street_number INT NOT NULL,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  postcode int NOT NULL,
  state_adr	VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  descr TEXT NOT NULL,
  datetime_confirmed_start TIMESTAMP,
  datetime_confirmed_end TIMESTAMP,
  datetime1_start TIMESTAMP,
  datetime1_end TIMESTAMP,
  datetime2_start TIMESTAMP,
  datetime2_end TIMESTAMP,
  datetime3_start TIMESTAMP,
  datetime3_end TIMESTAMP,
  datetime4_start TIMESTAMP,
  datetime4_end TIMESTAMP,
  event_status VARCHAR(30) NOT NULL,
  event_link TEXT,
  host_u_id INT,
  PRIMARY KEY (event_id),
  FOREIGN KEY(host_u_id) REFERENCES users(u_id) ON DELETE SET NULL
);

-- the password for Hania is: password
INSERT INTO users VALUES (1,'Hania','AB','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w','hania@example.example'),(2,'Sara','BA','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w','sara@example.example');

-- the password for AdminHania is: password
INSERT INTO admins VALUES (1,'AdminHania','AB','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w','adminhania@example.example');

-- List of prepared statements used for login, signup, and create new event feature

-- Creating a new event:
-- INSERT INTO events (event_name, street_number, street, city, postcode, state_adr, country, descr, datetime1_start,  datetime1_end,
-- datetime2_start,  datetime2_end, datetime3_start,  datetime3_end, datetime4_start,  datetime4_end, event_status) VALUES
-- (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, "pending")

-- user login:
-- SELECT u_id, first_name, last_name, email, password_hash FROM users WHERE email = ?

-- admin login:
-- ADMIN LOGIN: SELECT a_id, first_name, last_name, email, password_hash FROM admins WHERE email = ?

-- signup:
-- SIGNUP INSERT INTO users (first_name, last_name, password_hash, email) VALUES (?,?,?,?)



-- List of prepared statements used to access and store user's and admin's data, update user's and admin's data in the database and display user's confirmed, pending and past list of events


--Showing user data:
--"SELECT first_name, last_name, email FROM users WHERE email = '"+useremail+"';"

--Updating user data:
--"UPDATE users SET first_name = '"+updatedf_name+"', last_name = '"+updatedl_name+"', email = '"+updatedEmail+"' WHERE email = '"+currentemail+"';"

--Showing admin data:
--"SELECT first_name, last_name, email FROM admins WHERE email = '"+adminemail+"';"

--Updating admin data:
--"UPDATE admins SET first_name = '"+updatedf_name+"', last_name = '"+updatedl_name+"', email = '"+updatedEmail+"' WHERE email = '"+currentemail+"';"

--Showing current user's confirmed event data
--"SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'confirmed';"

--Showing current user's pending event data
--"SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'pending';"

--Showing current user's past event data
--"SELECT event_name, proposed_times, event_date, street_number, street, city, postcode, state_adr, country FROM events WHERE user_email = '"+useremail+"' AND event_status = 'past';"

-- get a users events and information:
-- SELECT first_name,last_name,email,e_id,event_name,status FROM User INNER JOIN Event ON User.u_id=Event.host WHERE u_id = '"+userid+"' ORDER BY status ASC