//Get the button:
mybutton = document.getElementById("topBtn");
my = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };
localStorage.setItem("lastPos", window.pageYOffset)
function scrollFunction() {

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  if (window.pageYOffset > localStorage.getItem("lastPos")) {
    localStorage.setItem("lastPos", window.pageYOffset)
  }
  if (window.pageYOffset < localStorage.getItem("lastPos") - 30 ) {
    my.style.display = "block";
  } else {
    my.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function lastPosFunction() {
  let lastPos = localStorage.getItem("lastPos")
  document.body.scrollTop = lastPos; // For Safari
  document.documentElement.scrollTop = lastPos; // For Chrome, Firefox, IE and Opera
}