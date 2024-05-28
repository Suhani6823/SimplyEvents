The javascript files:

admin-details.js
    - contains all the javascript/ajax functions to show and update admin details in the database for admin-details.html
event.js
    - contains all the javascript/ajax functions to show and update suer details in the database for user-details.html
eventpage.js:
    - contains all the javascript/ajax functions to show the different types of events a user has.
    -also contains the javascript used to switch between the confirmed, pending and past events on the page
admin-pass.js && user-pass.js
    - these files were meant to contain appropriate javascript/ajax functions to change password for users and admins however, there was not enough time to implement them
admin.js
    - contains relevant javascript/ajax functions to show the admin homepage and show the list of users on that page
page.js
    - contains relevant javascript/ajax functions for a user to signup, login both via filling out their details and via google api
    - contains relevant javascript/ajax functions for an admin to login
    - contains relevant javascript/ajax functions for a user to logout
    - contains relevant javascript/ajax functions to allow a user to create a new event
index.js
    - contains all the used to communicate with the database to access, show and update information.
app.js
    - contains relevant javascript used to establish a connection with the database
    - contains the module for argon, which is the main component being used to hash the password when the user first signs up and enters their password


events.sql
    - contains the database with relevant tables (note: it does not contain all tables outlines in the database schema) used for the current webapp.
    - contains the prepared query statements used to interact with the database in index.js