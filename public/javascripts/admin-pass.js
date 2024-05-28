//for admin pass.html
(function editdets(W){
    var D,form,bts,ipt;
    function init(){
        D=W.document,previous=[];
        form=D.getElementsByClassName('adminedits2')[0];
        bts=form.getElementsByClassName('admindets2');
        ipt=form.getElementsByClassName('adminipt2');
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