var mainText = document.querySelector("#mainText");
var userName = localStorage.getItem("loggedInUser");

function displayWelcomeText() {
  if (userName) {
    mainText.innerHTML = `<h1 class="text-center mt-5 pt-5">Welcome, ${userName}!</h1>`;
  } else {
    location.assign("./index.html");
  }
}

displayWelcomeText();
