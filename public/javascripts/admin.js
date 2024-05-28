
//creates page heading and table of events for selected user on UsersEvents page
function populateUsersEvents(){
    var xhttp = new XMLHttpRequest();
    var userid="";
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        userid= param[1]
    }
     xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                document.getElementById("eventsHeading").innerHTML = data[0].first_name + " " + data[0].last_name + "'s Events";


                for (var i = 0; i < data.length; i++){

                var currentId = data[i].event_id;

                var tr = document.createElement('tr');

                var eventName = document.createTextNode(data[i].event_name);
                var eventStatus = document.createTextNode(data[i].status);
                var editBtn = document.createElement('a');
                editBtn.innerHTML = 'Edit Event <i class="material-icons edit">edit</i>';
                editBtn.className = 'linkButton';
                editBtn.href = '/edit-event.html?eventid=' + currentId;



                var tdN = tr.appendChild(document.createElement('td'));
                tdN.appendChild(eventName);

                var tdS = tr.appendChild(document.createElement('td'));
                tdS.appendChild(eventStatus);

                var tdE = tr.appendChild(document.createElement('td'));
                tdE.appendChild(editBtn);

                document.getElementById("eventsTable").appendChild(tr);

                }
         }
     };
     xhttp.open("GET", "/userEventsInfo?userid="+userid, true);
     xhttp.send();
}


//fills table of user information on AdminHome page
function populateHome(){
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);

                for (var i = 0; i < data.length; i++){

                var currentId = data[i].user_id;

                var tr = document.createElement('tr');

                var firstName = document.createElement('input');
                firstName.type = 'text';
                firstName.value = data[i].first_name;
                firstName.className = 'tableContent';
                firstName.readOnly = true;

                var lastName = document.createElement('input');
                lastName.type = 'text';
                lastName.value = data[i].last_name;
                lastName.className = 'tableContent';
                lastName.readOnly = true;

                var emailIn = document.createElement('input');
                emailIn.type = 'text';
                emailIn.value = data[i].email;
                emailIn.className = 'tableContent';
                emailIn.readOnly = true;

                var editBtn = document.createElement('a');
                editBtn.className = 'linkButton';
                editBtn.innerHTML = 'Edit User Details <i class="material-icons edit">edit</i>';
                editBtn.href = '/user-details.html?userid=' + currentId;

                var eventsBtn = document.createElement('a');
                eventsBtn.className = 'linkButton';
                eventsBtn.innerHTML = 'See Events <i class="material-icons">event</i>';
                eventsBtn.href = '/UsersEvents.html?userid=' + currentId;

                var tdFN = tr.appendChild(document.createElement('td'));
                tdFN.appendChild(firstName);

                var tdLN = tr.appendChild(document.createElement('td'));
                tdLN.appendChild(lastName);

                var tdE = tr.appendChild(document.createElement('td'));
                tdE.appendChild(emailIn);

                var tdEditB = tr.appendChild(document.createElement('td'));
                tdEditB.appendChild(editBtn);

                var tdEB = tr.appendChild(document.createElement('td'));
                tdEB.appendChild(eventsBtn);

                document.getElementById("homeTable").appendChild(tr);
                }

         }
     };
     xhttp.open("GET", "/getUserInfo", true);
     xhttp.send();
}
