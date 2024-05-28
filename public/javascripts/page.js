// Signup Function that will sent an AJAX request and has the function that will run on response
// This fucntion is run when the user clicks on the submit button in the signup.html page of the webapp
function signup() {

    let user = {
        email: document.getElementById("signUpFormEmail").value,
        fname: document.getElementById("signUpFormFirstName").value,
        lname: document.getElementById("signUpFormLastName").value,
        password: document.getElementById("signUpFormPassword").value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Signup Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Signup Failed");
        }
    };

    xhttp.open("POST", "/users/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

// Google signin function
// Will trigger a request to provide a session like the login function
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    let name = profile.getName();

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Signin Successful");
        } else if (this.readyState == 4 && this.status >= 400) {

        }
    };

    xhttp.open("POST", "/users/google-sign-in");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(name);

}

// Login Function that will sent an AJAX request and has the function that will run on response
// This fucntion is run when the user clicks on the login button in the login.html page of the webapp
function login() {

    let user = {
        email: document.getElementById("logInFormEmail").value,
        password: document.getElementById("logInFormPassword").value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };

    xhttp.open("POST", "/users/login");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

// Login Function for admins only that will sent an AJAX request and has the function that will run on response
// This fucntion is run when the user clicks on the login button in the adminLogin.html page of the webapp
function adminLogin() {

    let admin = {
        email: document.getElementById("logInFormEmail").value,
        password: document.getElementById("logInFormPassword").value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Login Successful");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };

    xhttp.open("POST", "/users/adminLogin");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(admin));
}

// Logout function that sends a post request, to which is responds by deleting the users session token
function logout(){
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/logout", true);
    xmlhttp.send();

}

// Function to create a new event
// The event details are taken from the form filled by the user and send as the body of the request
// The request will be responded by storing the information of the event to the database
// By default every new event created has status as "Pending"
function createEvent(){

    let event = {
        event_name: document.getElementById("event_name").value,
        st_no: document.getElementById("street_number").value,
        st: document.getElementById("street_name").value,
        city: document.getElementById("city_name").value,
        postcode: document.getElementById("post_code").value,
        state: document.getElementById("state_name").value,
        country: document.getElementById("country_name").value,
        descr: document.getElementById("descr").value,
        datetime1_start: document.getElementById("eventDate1s").value,
        datetime1_end: document.getElementById("eventDate1e").value,
        datetime2_start: document.getElementById("eventDate2s").value,
        datetime2_end: document.getElementById("eventDate2e").value,
        datetime3_start: document.getElementById("eventDate3s").value,
        datetime3_end: document.getElementById("eventDate3e").value,
        datetime4_start: document.getElementById("eventDate4s").value,
        datetime4_end: document.getElementById("eventDate4e").value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/addEvent", true);
    xmlhttp.send(JSON.stringify(event));

}


