//for admin details.html
(function editdets(W){
    var D,form,bts,ipt;
    function init(){
        D=W.document,previous=[];
        form=D.getElementsByClassName('adminedits')[0];
        bts=form.getElementsByClassName('admindets');
        ipt=form.getElementsByClassName('adminipt');
        form.addEventListener('submit',save,false);
        bts[1].addEventListener('click',cancel,false);
        bts[2].addEventListener('click',edit,false);
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
    //xhttp.send();
   })(window)

var adminemail = " ";
function getadminemail(){
    document.getElementById("logInFormEmail");
}
  //this function shows admin details on page
function showadmininfo() {
    var admin = {
        email: adminemail
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var admininfo= JSON.parse(this.responseText);

        document.getElementById("adminfirstname").value = " "+admininfo[0].first_name;
        document.getElementById("adminlastname").value = " "+admininfo[0].last_name;
        document.getElementById("adminEmail").value = " "+admininfo[0].email;
        }
    };
    xhttp.open("POST", "/admindata", true); //Send when page loaded
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(admin));
}

//this function sends a post request to update admin info when the save button is clicked
function updateadmininfo() {
    form=document.getElementsByClassName('adminedits')[0];
    ipt=form.getElementsByClassName('adminipt');
    var admin = {
        email: adminemail //current email
        updatedadminf_name: ipt[0].value,
        updatedadminl_name: ipt[1].value,
        updatedadminEmail: ipt[2].value
    };
    /*console.log("check1");
    console.log(user);           //works
    console.log("check 2");*/
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200){
        var status=this.responseText;
        if (status === "success"){
            document.getElementById("infostatus2").innerText = "Admin details updated successfully!";
            document.getElementById("infostatus2").style.color="green";
        }
        else {
            document.getElementById("infostatus2").innerText = "Failed to update details!";
            document.getElementById("infostatus2").style.color = "red";
        }
        }
    };
    xhttp.open("POST", "/updateadmindata", true); //Send when page loaded
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(admin));
}