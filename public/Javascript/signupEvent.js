document.getElementById('passwordForm').addEventListener('keyup', function(){

    var firstPassword = document.getElementById('passwordForm');
 
    if(firstPassword.value.length <=2){
        firstPassword.style.borderColor='red';
    }
    else if(firstPassword.value.length >=3){
        firstPassword.style.borderColor='#ffffff';
    }
    console.log(firstPassword);
 });

 document.getElementById('confirmPasswordForm').addEventListener('keyup', function(){
    var verifyPassword = document.getElementById('confirmPasswordForm').value;
    console.log(verifyPassword);
    if(verifyPassword != firstPassword){
        verifyPassword.style.borderColor='red';
    }else{
        verifyPassword.style.borderColor='#ffffff';
    }
 });