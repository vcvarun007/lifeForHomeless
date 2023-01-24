/********************************************
Revision History

Version       Name          Date            Description 
1.0         Aman Das    24/01/2023      

*********************************************/


function text(x)
{
    if (x == 0) document.getElementById("mycode").style.display = "none";
    else document.getElementById("mycode").style.display ="block";
   
    return;
}
      const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });
// $document.ready(function()
// {
//     $('#nopass').click(function()
//     {
//     $('#password1').show();
//     $(this).hide();
// });
// });
function validatedonor(){ 
  
var name=document.forms.myform.name.value;  

var password=document.forms.myform.password.value;  
//
var email=document.forms.myform.email.value; 
var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  
var address = document.forms.myform.Address.value;

var phone =	document.forms.myform.contact.value;
var regPhone=/^\d{10}$/;


if (name==null || name==""){  
  window.alert("Please Enter your Name");
				
  return false;  
}

if (email == "" || !regEmail.test(email)) {
    window.alert("Please enter a valid e-mail address.");
   
    return false;
}

if (phone == "" || !regPhone.test(phone)) {
    alert("Please enter valid phone number.");
   
    return false;
}

    
    if (address == "") {
    window.alert("Please enter your address.");
   
    return false;
}
 

if(password.length<8){  
    alert("Password must be at least 8 characters long.");  
    return false;  
    } 

   
   
}

function validatelogin(){ 
var password=document.forms.loginform.password.value;  

var email=document.forms.loginform.email.value; 
var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

if (email == "" || !regEmail.test(email)) {
  window.alert("Please enter a valid e-mail address.");
  
  return false;
}

if(password.length<8){  
  alert("Password must be at least 8 characters long.");  
  return false;  
  } 
}