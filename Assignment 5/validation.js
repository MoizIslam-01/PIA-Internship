var emailarr = [];
var passarr = [];


function login(){
    var email = document.getElementById("loginemail").value;
    var pass = document.getElementById("loginpass").value;
    if (email == "" || pass == ""){
        alert("ENTER EMAIL AND PASS");
        document.getElementById("loginpass").value = "";
        document.getElementById("loginemail").value = "";
    }
    else {
        var index=emailarr.indexOf(email);
        if (index == -1){
            alert("User not found!")
            document.getElementById("loginpass").value = "";
            document.getElementById("loginemail").value = "";
        }
        else if ( email != emailarr[index] || pass != passarr[index]){
            alert("Email or Password in incorrect!!")
            document.getElementById("loginpass").value = "";
            document.getElementById("loginemail").value = "";
        }

        else{
            alert("Login Successfull!!");
            document.getElementById("loginpass").value = "";
            document.getElementById("loginemail").value = "";
        }
    } 
}

function register(){
    var email = document.getElementById("registeremail").value;
    var pass = document.getElementById("registerpass").value;
    if (email == "" || pass == ""){
        alert("ENTER EMAIL AND PASS");
        document.getElementById("registerpass").value = "";
        document.getElementById("registeremail").value = "";
    }
    else if(!isvalid(email)){
        alert("wrong format")
    }
    else if(emailarr.indexOf(email)!=-1){
        alert("user already registered!");
        document.getElementById("registerpass").value = "";
        document.getElementById("registeremail").value = "";
    }
    else {

        emailarr.push(email);
        passarr.push(pass);
        alert("USER REGISTERED!!");
        document.getElementById("registerpass").value = "";
        document.getElementById("registeremail").value = "";
    } 

}

function isvalid(email) {
    let index = email.indexOf("@");

    if (index <= 0) return false;
    if (email.indexOf("@", index + 1) !== -1) return false;

    let firstpart = email.substring(0, index);
    let secondpart = email.substring(index + 1);

    if (firstpart === "" || secondpart === "") return false;

    let index2 = secondpart.lastIndexOf(".");
    if (index2 <= 0 || index2 === secondpart.length - 1) return false;

    let domain = secondpart.substring(0, index2);
    let extension = secondpart.substring(index2 + 1);

    if (domain === "" || extension.length < 2) return false;

    return true;
}
