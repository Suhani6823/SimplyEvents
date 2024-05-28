//for events.html

/*function openForm(){
    document.getElementById("popupForm").style.display="block";
}
function closeForm(){
    document.getElementById("popupForm").style.display="none";
}*/

/*function showuserdata(){
    var useremail = document.getElementById("logInFormEmail").value;
}*/

//for user details.html
(function editdets(W){
    var D,form,bts,ipt;
    function init(){
        D=document,previous=[]; //had W.document before
        form=D.getElementsByClassName('useredits')[0];
        bts=form.getElementsByClassName('userdets');
        ipt=form.getElementsByClassName('useript');
        form.addEventListener('submit',save,false);
        bts[1].addEventListener('click',cancel,false);
        bts[2].addEventListener('click',edit,false);
         //get email value here
    }
    function save(e){
     e.preventDefault();
     form.classList.remove('invert');
     var l=ipt.length;
     while(l--){
      ipt[l].readOnly=true;
     };
     previous=[];
     //alert(ipt[0].value); //getting the value here
     //console.log(ipt[0]); //first  name
     //console.log(ipt[1]); // last name
     //console.log(ipt[2]); //email
     //send your info here
    }
    function edit(e){
     e.preventDefault();
     form.classList.add('invert');
     var l=ipt.length;
     while(l--){
      previous[l]=ipt[l].value;
      ipt[l].readOnly=false;
     }
    }
    function cancel(e){
     form.classList.remove('invert');
     e.preventDefault();
     var l=ipt.length;
     while(l--){
      ipt[l].value=previous[l];
      ipt[l].readOnly=true;
     }
    }
    W.addEventListener('load',init,false);
   })(window)

var useremail = " ";
function getuseremail(){
    useremail= document.getElementById("logInFormEmail");
}
  //this function shows user details on page
function showuserinfo() {
    var user = {
        email: useremail
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var userinfo= JSON.parse(this.responseText);
        document.getElementById("userfirstname").value = userinfo[0].first_name;
        document.getElementById("userlastname").value = userinfo[0].last_name;
        document.getElementById("userEmail").value = userinfo[0].email;
        }
    };
    xhttp.open("POST", "/userdata", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

//this function sends a post request to update user info when the save button is clicked
function updateuserinfo() {
    form=document.getElementsByClassName('useredits')[0];
    ipt=form.getElementsByClassName('useript');
    var user = {
        email: useremail, //current email
        updateduserf_name: ipt[0].value,
        updateduserl_name: ipt[1].value,
        updateduserEmail: ipt[2].value
    };
    /*console.log("check1");
    console.log(user);           //works
    console.log("check 2");*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var status=this.responseText;
        if (status === "success"){
            document.getElementById("infostatus").innerText = "User details updated successfully!";
            document.getElementById("infostatus").style.color="green";
        }
        else {
            document.getElementById("infostatus").innerText = "Failed to update details!";
            document.getElementById("infostatus").style.color = "red";
        }
        }
    };
    xhttp.open("POST", "/updateuserdata", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}


