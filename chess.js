const selectField = document.getElementById("selectField");
const selectText = document.getElementById("selectText");
const options = document.getElementsByClassName("options");
const list = document.getElementById("list");
const arrowIcon = document.getElementById("arrowIcon");
const levelSelectField = document.getElementById("levelSelectField");
const levelSelectText = document.getElementById("levelSelectText");
const levelOptions = document.getElementsByClassName("levelOptions");
const levelList = document.getElementById("levelList");
const levelArrowIcon = document.getElementById("levelArrowIcon");
const chessForm = document.getElementById("chess-form");
let character, level, character_id, participation, knowledge;
let levelBoolean = false;
let characterBoolean = false;
let radioBoolean = false;

levelSelectField.onclick = function () {
  levelArrowIcon.classList.toggle("rotate");
  levelList.classList.toggle("hide");
};

selectField.onclick = function () {
  arrowIcon.classList.toggle("rotate");
  list.classList.toggle("hide");
};

for (option of options) {
  option.onclick = function () {
    character = this.textContent.trim();
    selectText.innerHTML = character;
    arrowIcon.classList.toggle("rotate");
    list.classList.toggle("hide");
    localStorage.setItem("character", character);
  };
}

for (option of levelOptions) {
  option.onclick = function () {
    level = this.textContent.trim();
    levelSelectText.innerHTML = level;
    levelArrowIcon.classList.toggle("rotate");
    levelList.classList.toggle("hide");
    localStorage.setItem("level", level.toLowerCase());
  };
}

window.onload = function () {
  const characterData = localStorage.getItem("character");
  if (characterData !== null) selectText.innerHTML = characterData;
  const levelData = localStorage.getItem("level");
  if (levelData !== null) levelSelectText.innerHTML = levelData;
};

const url = "https://chess-tournament-api.devtest.ge/api/grandmasters";

fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      console.warn(
        "Looks like there was a problem. Status Code: ",
        response.status
      );
      return;
    }

    // Examine the text in the response
    response.json().then(function (data) {
      for (let i = 0; i < data.length; i++) {
        let url = "https://chess-tournament-api.devtest.ge" + data[i].image;

        document.getElementById(`img-${i}`).src = url;
        document.getElementById(`p-${i}`).innerHTML = data[i].name;
      }
    });
  })
  .catch(function (err) {
    console.error("Fetch Error -", err);
  });

chessForm.addEventListener("submit", (e) => {
  e.preventDefault();

  inputCheck();
});

function inputCheck() {
  if (selectText.innerHTML.includes("Choose your character")) {
    popError("Choose your character", "Pick one of the characters");
  } else {
    characterBoolean = true;
  }
  if (levelSelectText.innerHTML.includes("Level of knowledge")) {
    popError("Level of knowledge", "Choose your level of knowledge");
  } else {
    levelBoolean = true;
  }
  if (document.getElementById("yes").checked) {
    participation = true;
    radioBoolean = true;
  } else if (document.getElementById("no").checked) {
    participation = false;
    radioBoolean = true;
  } else {
    popError("Participation is required", "Pick one of the options");
  }
  if (characterBoolean && levelBoolean && radioBoolean) {
    inputValidator();
  }
}

function popError(toperror, error) {
  const errorDiv = document.getElementById("error-div");
  const errorMessage = document.getElementById("err-msg");
  const errorContent = document.getElementById("err-content");
  errorMessage.innerText = toperror;
  errorContent.innerText = error;
  errorDiv.classList.remove("hide");
}

function dissapear() {
  document.getElementById("error-div").classList.add("hide");
}

function inputValidator() {
  character = localStorage.getItem("character");

  if (character == "Nona Gaphrindashvili") {
    localStorage.setItem("character_id", 1);
  } else if (character == "Mikhail Tal") {
    localStorage.setItem("character_id", 2);
  } else if (character == "Bobby Fisher") {
    localStorage.setItem("character_id", 3);
  } else if (character == "Magnus Carlsen") {
    localStorage.setItem("character_id", 4);
  }

  if (localStorage.getItem("level") == "intermediate") {
    knowledge = "normal";
  } else if (localStorage.getItem("level") == "beginner") {
    knowledge = "beginner";
  } else if (localStorage.getItem("level") == "professional") {
    knowledge = "professional";
  }

  fetch("https://chess-tournament-api.devtest.ge/api/register", {
    method: "POST",
    body: JSON.stringify({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("tel"),
      date_of_birth: localStorage.getItem("date"),
      experience_level: knowledge,
      already_participated: participation,
      character_id: localStorage.getItem("character_id"),
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      console.log(text);
    })
    .then(
      setTimeout(() => {
        window.location.href = "last.html";
      }, 2500)
    )
    .catch(function (error) {
      console.error(error);
    });
}
