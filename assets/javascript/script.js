let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos  || currentScrollPos < 200) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-82px";
  }
  prevScrollpos = currentScrollPos;
}