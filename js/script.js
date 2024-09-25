
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
