const form = document.getElementById('form')
const username = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('tel')


form.addEventListener('submit', (e) => {
    e.preventDefault();
        
    checkInputs();
});

function checkInputs(){
    //Checking values of inputs and adding trim to avoid spaces
    const userNameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    

    if(userNameValue === ''){
        setErrorFor(username, 'username cannot be blank')
    }else if(userNameValue.length < 2){
        setErrorFor(username, 'username must be longer than 2 characters')
    }else{
        setSuccessFor(username)
    }

    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank')
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Not valid email')
    }else if(!redEmail(emailValue)){
        setErrorFor(email,'Not redberry email')
    }else{
        setSuccessFor(email);
    }
    if(isPhoneNumber(phoneValue) && phoneValue.length == 9){
        setSuccessFor(phone)
    }else{
        setErrorFor(phone, 'Not valid phone number')
    }
    
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
    console.log('siiu');
    return /^\d+$/.test(number);
    
}

fetch('https://chess-tournament-api.devtest.ge/api/grandmasters')
    .then(res => res.json())
    .then(data => console.log(data))