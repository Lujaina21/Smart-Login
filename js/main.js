var signUp = document.querySelector("#signUp");
var signIn = document.querySelector("#signIn");
var emailInput = document.querySelector("#emailInput");
var passInput = document.querySelector("#passInput");
var emailError = document.querySelector("#emailError");
var passError = document.querySelector("#passError");
var alertMsg = document.querySelector("#alertMsg");
var usersList;

//getFromLocalStorage();
//// ********** Sign Up page **********
signUp.addEventListener("click", function () {
  window.location = "./pages/signup.html";
});

// ********** Local Storage **********
function getFromLocalStorage() {
  if (localStorage.getItem("Users List")) {
    usersList = JSON.parse(localStorage.getItem("Users List"));
  } else {
    usersList = [];
  }
}
getFromLocalStorage();

// ********** Validations **********
function emailValidation() {
  if (emailInput.value == "") {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    emailError.classList.replace("d-none", "d-block");
    // emailError.textContent = "Email cannot be empty.";
    return false;
  }
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
  if (passInput.value == "") {
    passInput.classList.add("is-invalid");
    passInput.classList.remove("is-valid");
    passError.classList.replace("d-none", "d-block");
    return false;
  }
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

// ********** Validate if user exists **********
function usersCredentials(email, pass) {
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].userEmail === email) {
      if (usersList[i].userPass === pass) {
        alertMsg.innerHTML = `<p class="text-success">Success :)</p>`;
        return usersList[i];
      } else {
        alertMsg.innerHTML = `<p class="text-danger">Incorrect password </p>`;
        return null;
      }
    }
  }
  alertMsg.innerHTML = `<p class="text-danger">Email not found!</p>`;
  return null;
}

// ********** Log In function **********
function logIn() {
  //getFromLocalStorage();
  if (!emailValidation() || !passValidation()) {
    alertMsg.innerHTML = `<p class="text-danger">Please fill in all fields correctly</p>`;
    return;
  }
  var loggedInUser = usersCredentials(emailInput.value, passInput.value);
  if (!loggedInUser) {
    console.log("User not found");
    return;
  }
  console.log("User found");
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  location.assign("./pages/welcome.html");
  clearInputs();
}

// ********** Sign In button **********
signIn.addEventListener("click", function (event) {
  event.preventDefault();
  getFromLocalStorage();
  logIn();
});

// ********** Clear Inputs **********
function clearInputs() {
  emailInput.value = "";
  passInput.value = "";
}
