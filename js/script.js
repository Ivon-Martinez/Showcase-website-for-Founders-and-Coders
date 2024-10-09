
$(window).on("load", function(){
  $(".loader .inner").fadeOut(700, function(){
    $(".loader").fadeOut(750);
  });
})

$(document).ready(function() {

  $('#slides').superslides({
      animation:'fade',
      play: 5000,
      pagination: false
  });
});


function openNav() {
  document.getElementById("myNav").style.height = "100%";
  document.getElementById("title").style.display = "none";
}


function closeNav() {
  document.getElementById("myNav").style.height = "0%";
  document.getElementById("title").style.display = "inline";
}


 function openPage(pageName) {
  window.open(pageName, '_self');
 }


const svg = document.querySelector('svg.trail')
const path = svg.querySelector('path')

const slides = document.getElementById('slides');

let points = []
let segments = 20
let mouse = {
x: 0,
y: 0,
}

const move = (event) => {

const rect = slides.getBoundingClientRect();

  if (
  event.clientX >= rect.left &&
  event.clientX <= rect.right &&
  event.clientY >= rect.top &&
  event.clientY <= rect.bottom
  ) 
  {

    const x = event.clientX
    const y = event.clientY

    mouse.x = x
    mouse.y = y

    if (points.length === 0) {
      for (let i = 0; i < segments; i++) {
        points.push({
          x: x,
          y: y,
        })
      }
    }
  }

  else {
  // Clear points to stop drawing outside the element
  points = [];
  }
};

const anim = () => {

let px = mouse.x
let py = mouse.y

points.forEach((p, index) => {
p.x = px
p.y = py

let n = points[index + 1]

if (n) {
px = px - (p.x - n.x) * 0.3
py = py - (p.y - n.y) * 0.3
}
})

path.setAttribute('d', `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`)

requestAnimationFrame(anim)
}

const resize = () => {
const ww = window.innerWidth
const wh = window.innerHeight

svg.style.width = ww + 'px'
svg.style.height = wh + 'px'
svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`)
}

document.addEventListener('mousemove', move)
window.addEventListener('resize', resize)

anim()
resize()



window.addEventListener('scroll', function() {    //function to change the menu bar to black after scrolling 400px
  const topBar = document.querySelector('.topBar');
  if (window.scrollY > 400) {  // Trigger when scrolling down 4 cm (approximately 400px)
    topBar.classList.add('scrolled');
  } else {
    topBar.classList.remove('scrolled');
  }
});




  // window.onscroll = function() {
  //   var topBar = document.querySelector('.topBar');
  //   if (window.scrollY > 150) { // 4 cm ~ 150px
  //     topBar.classList.add('scrolled');
  //   } else {
  //     topBar.classList.remove('scrolled');
  //   }
  // };

  filterSelection("all") // Execute the function and show all columns
  function filterSelection(c) {
    var x,i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }

    // Check if no contributions are available
    if (c == "contributions") {
      var contributions = document.getElementsByClassName("contributions");
      if (contributions.length === 0) {
        displayComingSoon();
      } else {
        hideComingSoon();
      }
    } else {
      hideComingSoon();
    }

  }

  // Show filtered elements
  function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  // Hide elements that are not selected
  function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("buttonContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  // Display "Coming soon" message if no contributions are available
  function displayComingSoon() {
    document.getElementById("comingSoonMessage").style.display = "block";
  }
  
  function hideComingSoon() {
    document.getElementById("comingSoonMessage").style.display = "none";
  }