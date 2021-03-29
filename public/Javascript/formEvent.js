document.getElementById('fnameForm').addEventListener('keyup', function(){

    let firstname = document.getElementById('fnameForm');
 
    if(firstname.value.length <=2){
        firstname.style.borderColor='red';
    }
    else if(firstname.value.length >=3){
        firstname.style.borderColor='#ffffff';
    }
 });
 document.getElementById('lnameForm').addEventListener('keyup', function(){

    let lastname = document.getElementById('lnameForm');
 
    if(lastname.value.length <=2){
        lastname.style.borderColor='red';
    }
    else if(lastname.value.length >=3){
        lastname.style.borderColor='#ffffff';
    }
 });
 document.getElementById('eform').addEventListener('keyup', function(){

    let email = document.getElementById('eform');
 
    if(email.value.length <=2){
        email.style.borderColor='red';
    }
    else if(email.value.length >=3){
        email.style.borderColor='#ffffff';
    }
 });