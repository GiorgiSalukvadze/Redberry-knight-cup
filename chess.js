const selectField = document.getElementById('selectField')
const selectText = document.getElementById('selectText')
const options = document.getElementsByClassName('options')
const list = document.getElementById('list')
const arrowIcon = document.getElementById('arrowIcon')
const levelSelectField = document.getElementById('levelSelectField')
const levelSelectText = document.getElementById('levelSelectText')
const levelOptions = document.getElementsByClassName('levelOptions')
const levelList = document.getElementById('levelList')
const levelArrowIcon = document.getElementById('levelArrowIcon')
const chessForm = document.getElementById('chess-form')
localStorage
const user = JSON.parse(localStorage.getItem('user'))
console.log(user)

levelSelectField.onclick = function() {
  levelArrowIcon.classList.toggle('rotate');
  levelList.classList.toggle('hide');
    
}


selectField.onclick = function() {
    arrowIcon.classList.toggle('rotate');
    list.classList.toggle('hide');
   
}


for (option of options){
    option.onclick = function (){
        selectText.innerHTML = this.textContent 
        arrowIcon.classList.toggle('rotate');
        list.classList.toggle('hide');
        
    }
}

for (option of levelOptions){
  option.onclick = function (){
      levelSelectText.innerHTML = this.textContent 
      levelArrowIcon.classList.toggle('rotate');
      levelList.classList.toggle('hide');
      localStorage.setItem("level", this.textContent)
  }
}


const url = 'https://chess-tournament-api.devtest.ge/api/grandmasters';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ', 
          response.status);  
          return;  
      }
    
          // Examine the text in the response  
      response.json().then(function(data) {  
        for (let i = 0; i < data.length; i++) {
          let url = "." + data[i].image;
          document.getElementById(`img-${i}`).src = url
          document.getElementById(`p-${i}`).innerHTML = data[i].name              
        }    
      });  
    }  
  )  
  .catch(function(err) {  
  console.error('Fetch Error -', err);  
});

chessForm.addEventListener('submit', (e) => {
  e.preventDefault();
      
  // inputValidator();
});      
