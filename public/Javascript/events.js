(function(){
	document.querySelector('#cookieBtn').addEventListener("click", cookieBarFunc, false);
}());

function cookieBarFunc(){
    let cookieBarEvent = document.querySelector('#cookieBar');
    cookieBarEvent.style.display = "none";
}