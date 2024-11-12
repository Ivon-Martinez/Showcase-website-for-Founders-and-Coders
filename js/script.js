
// Loader fade-out effect on page load

$(window).on("load", function(){
  $(".loader .inner").fadeOut(700, function(){
    $(".loader").fadeOut(750);
  });
})

// Initializes the slideshow with a fade effect, 5-second interval, and no pagination

$(document).ready(function() {

  $('#slides').superslides({
      animation:'fade',
      play: 5000,
      pagination: false
  });
});

// Function to open the navigation overlay to full height and hide title

function openNav() {
  const nav = document.getElementById("myNav");
  const title = document.getElementById("title");

  // Open the navigation
  nav.style.height = "100%";
  title.style.display = "none";

  // Set aria-expanded to true to indicate nav is open
  nav.setAttribute("aria-expanded", "true");
}

// Function to close the navigation overlay and show title

function closeNav() {
  const nav = document.getElementById("myNav");
  const title = document.getElementById("title");

  // Close the navigation
  nav.style.height = "0%";
  title.style.display = "inline";

  // Set aria-expanded to false to indicate nav is closed
  nav.setAttribute("aria-expanded", "false");
}

// Opens a new page in the same tab

 function openPage(pageName) {
  window.open(pageName, '_self');
 }

// SVG trail effect on mouse movement
const svg = document.querySelector('svg.trail');  // Selects the SVG for trail effect
const path = svg.querySelector('path');           // Selects the path within the SVG to animate
const slides = document.getElementById('slides'); // Selects the element that restricts trail movement

// Variables for storing mouse points and number of segments
let points = [];                 // Array to hold the points for trail segments
let segments = 20;               // Number of segments in the trail
let mouse = { x: 0, y: 0 };      // Stores mouse position


// Function to update mouse position and add initial points within the `slides` area
const move = (event) => {
  const rect = slides.getBoundingClientRect(); // Gets the position and size of `slides`

  // Checks if the mouse is within the bounds of `slides`
  if (
     event.clientX >= rect.left &&
     event.clientX <= rect.right &&
     event.clientY >= rect.top &&
     event.clientY <= rect.bottom
  ) {
     const x = event.clientX;
     const y = event.clientY;

     mouse.x = x; // Update global mouse coordinates
     mouse.y = y;

    // Initialize points array if empty

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
      // Clear points to stop drawing outside the `slides` element
      points = [];
  }
};

// Animation function to move points in a trailing effect
const anim = () => {
  let px = mouse.x; // Previous x position
  let py = mouse.y; // Previous y position

  // Update each point in the trail to follow the previous point
  points.forEach((p, index) => {
     p.x = px;
     p.y = py;

     let n = points[index + 1]; // Next point in the trail

     if (n) {
        // Calculate the new positions for a trailing effect
        px = px - (p.x - n.x) * 0.3;
        py = py - (p.y - n.y) * 0.3;
     }
  });

  // Update the SVG path's 'd' attribute to match the updated points

  path.setAttribute('d', `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`);

  // Calls the `anim` function continuously to create the animation

  requestAnimationFrame(anim);
  };

  // Resizes the SVG trail to match the window dimensions
  const resize = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    svg.style.width = ww + 'px';
    svg.style.height = wh + 'px';
    svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
  };

  // Event listeners for mouse movement and window resizing
  document.addEventListener('mousemove', move);
  window.addEventListener('resize', resize);

  // Start the animation and set initial SVG dimensions
  anim();
  resize();

// Function to change the top bar style when scrolling 400px down
window.addEventListener('scroll', function() {
  const topBar = document.querySelector('.topBar');
  // Adds or removes the `scrolled` class based on scroll position
  if (window.scrollY > 100) {
     topBar.classList.add('scrolled');
  } else {
     topBar.classList.remove('scrolled');
  }
});

// Execute the function to display all columns by default
filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");

  // If "all" is selected, set 'c' to an empty string to show all columns
  if (c == "all") c = "";

  // Loop through all columns and manage visibility
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show"); // Hide the current column

    // If the column contains the selected category, show it
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }

  // Check if the "contributions" category is selected
  if (c == "contributions") {
    var contributions = document.getElementsByClassName("contributions");

    // Display "Coming Soon" message if no contributions are available
    if (contributions.length === 0) {
      displayComingSoon();
    } else {
      hideComingSoon();
    }
  } else {
    // Hide "Coming Soon" message if another category is selected
    hideComingSoon();
  }
}

// Function to add a specific class to an element (used for showing elements)
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" "); // Split element's class list into an array
  arr2 = name.split(" "); // Split the name parameter into an array

  // Loop through each class in arr2 and add it if not already present in arr1
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Function to remove a specific class from an element (used for hiding elements)
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" "); // Split element's class list into an array
  arr2 = name.split(" "); // Split the name parameter into an array

  // Loop through each class in arr2 and remove it from arr1 if present
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); // Remove the class from arr1
    }
  }
  element.className = arr1.join(" "); // Update the element's class list
}

// Highlight the active button in the filter menu
var btnContainer = document.getElementById("buttonContainer");
var btns = btnContainer.getElementsByClassName("btn");

// Loop through each button and add a click event listener
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // Remove the "active" class from the currently active button
    current[0].className = current[0].className.replace(" active", "");

    // Add the "active" class to the clicked button
    this.className += " active";
  });
}

  // Display "Coming soon" message if no contributions are available
  function displayComingSoon() {
    document.getElementById("comingSoonMessage").style.display = "block";
  }
  
  // Function to hide the "Coming Soon" message

  function hideComingSoon() {
    document.getElementById("comingSoonMessage").style.display = "none";
  }



