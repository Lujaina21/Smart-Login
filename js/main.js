var signUp = document.querySelector("#signUp");
var signIn = document.querySelector("#signIn");
var emailInput = document.querySelector("#emailInput");
var passInput = document.querySelector("#passInput");
var emailError = document.querySelector("#emailError");
var passError = document.querySelector("#passError");
var alertMsg = document.querySelector("#alertMsg");

//// ********** Sign Up page **********
signUp.addEventListener("click", function () {
  window.location = "./pages/signup.html";
});

// ********** Validations **********
function emailValidation() {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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

// ********** Local Storage **********
//get data from local storage
var usersList;
if (localStorage.getItem("Users List")) {
  usersList = JSON.parse(localStorage.getItem("Users List"));
  console.log(usersList);
} else {
  usersList = [];
}

//fn. to save logged-in user to local storage
function saveToLocalStorage() {
  localStorage.setItem("Users List", JSON.stringify(usersList));
  console.log(localStorage);
}

// ********** Validate on Users Credentials **********
function usersCredentials(email, pass) {
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === email && usersList[i].password === pass) {
      alertMsg.innerHTML = `<p class="text-success">Success</p>`;
      return usersList[i];
    }
  }
  alertMsg.innerHTML = `<p class="text-danger">Invalid Entry</p>`;
  return null;
}

// ********** Sign In button **********
signIn.addEventListener("click", function () {
  var user = usersCredentials(emailInput.value, passInput.value);
  if (!user) {
    //console.log("User not found");
    return;
  }
  console.log("User found");
  localStorage.setItem("User", JSON.stringify(user));
  location.assign("./pages/home.html");
});
