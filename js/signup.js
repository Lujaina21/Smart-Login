var signUp = document.querySelector("#signUp");
var logIn = document.querySelector("#logIn");
var nameInput = document.querySelector("#nameInput");
var emailInput = document.querySelector("#emailInput");
var passInput = document.querySelector("#passInput");
var nameError = document.querySelector("#nameError");
var emailError = document.querySelector("#emailError");
var passError = document.querySelector("#passError");
var alertMsg = document.querySelector("#alertMsg");
var usersList;
let userNames = [];
let userEmails = [];

//// ********** Get Data **********
getFromLocalStorage();

// ********** Local Storage **********
function getFromLocalStorage() {
  if (localStorage.getItem("Users List")) {
    usersList = JSON.parse(localStorage.getItem("Users List"));
  } else {
    usersList = [];
  }
}

function saveToLocalStorage() {
  localStorage.setItem("Users List", JSON.stringify(usersList));
  console.log(localStorage);
}

//// ********** Log In page **********
logIn.addEventListener("click", function () {
  window.location = "../index.html";
});

// ********** Validations using regex **********
function nameValidation() {
  var nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
  if (nameRegex.test(nameInput.value)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    nameError.classList.replace("d-block", "d-none");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    nameError.classList.replace("d-none", "d-block");
    return false;
  }
}
nameInput.addEventListener("input", nameValidation);

function emailValidation() {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    emailError.classList.replace("d-block", "d-none");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    emailError.classList.replace("d-none", "d-block");
    return false;
  }
}
emailInput.addEventListener("input", emailValidation);

function passValidation() {
  var passRegex = /^.{8,}$/;
  if (passRegex.test(passInput.value)) {
    passInput.classList.add("is-valid");
    passInput.classList.remove("is-invalid");
    passError.classList.replace("d-block", "d-none");
    return true;
  } else {
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
    passError.classList.replace("d-none", "d-block");
    return false;
  }
}
passInput.addEventListener("input", passValidation);

// ********** Check for duplications **********
function nameUnique() {
  var uniqueName = true;
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].userName.toLowerCase() === nameInput.value.toLowerCase()) {
      uniqueName = false;
      break;
    }
  }
  return uniqueName;
}

function emailUnique() {
  var uniqueEmail = true;
  for (let i = 0; i < usersList.length; i++) {
    if (
      usersList[i].userEmail.toLowerCase() === emailInput.value.toLowerCase()
    ) {
      uniqueEmail = false;
      break;
    }
  }
  return uniqueEmail;
}

// ********** Sign Up button ********** */
signUp.addEventListener("click", function (event) {
  event.preventDefault();
  addUsers();
});

// ********** Add User ********** */
function addUsers() {
  if (nameValidation() && emailValidation() && passValidation()) {
    if (nameUnique() && emailUnique()) {
      var userData = {
        userName: nameInput.value,
        userEmail: emailInput.value,
        userPass: passInput.value,
      };
      usersList.push(userData);
      saveToLocalStorage();
      alertMsg.innerHTML = `<p class="text-success p-2">Success :)</p>`;
      clearInputs();
    } else {
      if (!nameUnique() || !emailUnique()) {
        alertMsg.innerHTML = `<p class="text-danger p-2">This name or email already exists! </p>`;
        nameInput.classList.add("is-invalid");
        emailInput.classList.add("is-invalid");
      }
    }
  } else {
    alertMsg.innerHTML = `<p class="text-danger p-2">Failed :( </p>`;
    nameInput.classList.add("is-invalid");
    emailInput.classList.add("is-invalid");
    passInput.classList.add("is-invalid");
    nameError.classList.replace("d-none", "d-block");
    emailError.classList.replace("d-none", "d-block");
    passError.classList.replace("d-none", "d-block");
  }
  console.log(usersList);
}

// ********** Clear Form ********** */
function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  passInput.value = "";
  nameInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  passInput.classList.remove("is-valid");
}
