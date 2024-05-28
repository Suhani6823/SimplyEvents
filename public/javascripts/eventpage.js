function change_tab(id){
    document.getElementById("page_content").innerHTML=document.getElementById(id+"_desc").innerHTML;
    document.getElementById("confirmed").className="notselected";
    document.getElementById("pending").className="notselected";
    document.getElementById("past").className="notselected";
    document.getElementById(id).className="selected";
}
var useremail = " ";
function getuseremail2(){
    useremail= document.getElementById("logInFormEmail");
}

function showconfirmedevents() {

    var user = {
        email: useremail
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var userinfo= JSON.parse(this.responseText);
        console.log(userinfo);
        var confirmedEventText=" ";
        for (let i=0; i<userinfo.length; i++){
            confirmedEventText += "<p> Event Name: "+userinfo[i].event_name+"<br> Event Time and Date: "+userinfo[i].proposed_times+", "+userinfo[i].event_date+" <br> Event location: "+userinfo[i].street_number+", "+userinfo[i].street+", "+userinfo[i].city+", "+userinfo[i].postcode+", "+userinfo[i].state_adr+", "+userinfo[i].country+" <br> </p> <br>";
        }
        document.getElementById("confirmedevents").innerHTML = confirmedEventText;
        }
    };
    xhttp.open("POST", "/confirmed-events-data", true); //Send when page loaded
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

function showpendingevents() {
    var user = {
        email: useremail
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var userinfo= JSON.parse(this.responseText);
        console.log(userinfo);
        var confirmedEventText=" ";
        for (let i=0; i<userinfo.length; i++){
            confirmedEventText += "<p> Event Name: "+userinfo[i].event_name+"<br> Event Time and Date: "+userinfo[i].proposed_times+", "+userinfo[i].event_date+" <br> Event location: "+userinfo[i].street_number+", "+userinfo[i].street+", "+userinfo[i].city+", "+userinfo[i].postcode+", "+userinfo[i].state_adr+", "+userinfo[i].country+" <br> </p> <br>";
        }
        document.getElementById("pendingevents").innerHTML = confirmedEventText;
        }
    };
    xhttp.open("POST", "/pending-events-data", true); //Send when page loaded
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

function showpastevents() {
    var user = {
        email: useremail
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var userinfo= JSON.parse(this.responseText);
        console.log(userinfo);
        var confirmedEventText=" ";
        for (let i=0; i<userinfo.length; i++){
            confirmedEventText += "<p> Event Name: "+userinfo[i].event_name+"<br> Event Time and Date: "+userinfo[i].proposed_times+", "+userinfo[i].event_date+" <br> Event location: "+userinfo[i].street_number+", "+userinfo[i].street+", "+userinfo[i].city+", "+userinfo[i].postcode+", "+userinfo[i].state_adr+", "+userinfo[i].country+" <br> </p> <br>";
        }
        document.getElementById("pastevents").innerHTML = confirmedEventText;
        }
    };
    xhttp.open("POST", "/past-events-data", true); //Send when page loaded
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}