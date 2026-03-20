let btn = document.getElementById("contact-btn");
let popup = document.getElementById("contact-popup");
let close = document.getElementById("close-btn")


btn.onclick=()=>{
    popup.style.display="flex"
}

close.onclick=()=>{
    popup.style.display="none";
}


let form = document.querySelector("form");

form.addEventListener("submit", function(e){

    let email = document.getElementById("email").value;
    let error = document.getElementById("error");
    let atposition = email.indexOf("@");
    let dotposition = email.lastIndexOf(".");

    if(atposition<1 || dotposition < atposition+2 || dotposition+2 >= email.length){
        error.innerText="Please Enter Correct Email";
        error.style.color="red";
        e.preventDefault();
    }
    else{
        error.innerText="";
    }

})

