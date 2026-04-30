// const hoverBox = document.getElementById("hoverBox");

document.addEventListener("DOMContentLoaded", greeting);

document
  .getElementById("changeButton")
  .addEventListener("click", changeBackground);
document
  .getElementById("nameInput")
  .addEventListener("focus", showFocusMessage);
document.getElementById("hoverBox").addEventListener("mouseenter", hoverOn);
document.getElementById("hoverBox").addEventListener("mouseleave", hoverOff);

document.getElementById("drawer").addEventListener("click", function () {
  document.getElementById("nav").style.top = "0px";
});
document.getElementById("closeNav").addEventListener("click", function () {
  document.getElementById("nav").style.top = "-600px";
});

function greeting() {
  let greeting = document.getElementById("greeting");
  let hour = new Date().getHours();

  if (hour < 12) {
    greeting.innerHTML = "GOOD MORNING, TIME TO STUDY";
  } else if (hour < 18) {
    greeting.innerHTML = "GOOD AFTERNOON, TIME TO STUDY";
  } else {
    greeting.innerHTML = "GOOD EVENING, TIME TO STUDY";
  }
}

function changeBackground() {
  document.body.classList.toggle("dark-mode");
}

function showFocusMessage() {
  document.getElementById("inputMessage").innerHTML = "Ready to enter question";
}

function hoverOn() {
  document.getElementById("hoverBox").textContent = "You got this, keep going!";
  document.getElementById("hoverBox").style.backgroundColor = "#165b53";
  document.getElementById("hoverBox").style.color = "#ffffff";
}

function hoverOff() {
  document.getElementById("hoverBox").textContent =
    "Hover over me for inspiration!";
  document.getElementById("hoverBox").style.backgroundColor = "#2a9d8f";
}
