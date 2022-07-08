const form = document.getElementById('form')
const username = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('tel')
const date = document.getElementById('date')
let userNameBoolean = false;
let emailBoolean = false;
let phoneBoolean = false;
let dateBoolean = false;
const user = {}
let counter = 1
user.id = counter
console.log(user)
date.onchange = (e) => {
    localStorage.setItem("date", e.target.value);
}

window.onbeforeunload = function() {
    localStorage.setItem("name", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("tel", tel.value);

}

window.onload = function() {
    const userNameData = localStorage.getItem("name");
    if (userNameData !== null) username.value = userNameData;
    const telData =localStorage.getItem("tel");
    if (telData !== null) tel.value = telData;
    const emailData =localStorage.getItem("email");
    if (emailData !== null) email.value = emailData;
    const dateData = localStorage.getItem("date");
    if (dateData !== null) date.value = dateData;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
        
    checkInputs();
});

function checkInputs(){
    //Checking values of inputs and adding trim to avoid spaces
    const userNameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const dateValue = localStorage.getItem("date");

    

    if(userNameValue === ''){
        setErrorFor(username, 'username cannot be blank')
    }else if(userNameValue.length < 2){
        setErrorFor(username, 'username must be longer than 2 characters')
    }else{
        setSuccessFor(username)
        userNameBoolean = true
    }

    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank')
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Not valid email')
    }else if(!redEmail(emailValue)){
        setErrorFor(email,'Not redberry email')
    }else{
        setSuccessFor(email);
        emailBoolean = true

    }
    if(isPhoneNumber(phoneValue) && phoneValue.length == 9){
        setSuccessFor(phone)
        phoneBoolean = true
    }else{
        setErrorFor(phone, 'Not valid phone number')
    }
    if(isDate(dateValue)){
        setSuccessFor(date)
        dateBoolean = true
    }else{
        setErrorFor(date, 'Date is required')
    }
    
    if(userNameBoolean || emailBoolean || phoneBoolean || dateBoolean){
        user.name = userNameValue
        user.email = emailValue
        user.phone = phoneValue
        user.date = dateValue
        user.id = counter++
        localStorage.setItem("user", JSON.stringify(user))
        location.href="chess.html"
    }
    console.log(JSON.parse(localStorage.getItem("user")))
}

function setErrorFor(input,message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')
    formControl.className = 'form-control error';
    small.innerText = message;

}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function redEmail(email){
    return email.includes('@redberry.ge');
}
function isPhoneNumber(number) {
    return /^\d+$/.test(number);
    
}
function isDate(date){
    return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)
}

