'use strict';




/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 * 
 * preloader will be visible until document load
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", function () {
  const yearsCounter = document.getElementById('years-counter');
  const patientsCounter = document.getElementById('patients-counter');
  const consultantsCounter = document.getElementById('consultants-counter');
  const bedsCounter = document.getElementById('beds-counter');

  let years = 0, patients = 0, consultants = 0, beds = 0;

  // Function to start counting when the section is in view
  function startCounting() {
    const yearsInterval = setInterval(function () {
      if (years < 50) {
        years++;
        yearsCounter.textContent = years;
      } else {
        clearInterval(yearsInterval);
      }
    }, 50);

    const patientsInterval = setInterval(function () {
      if (patients < 100000) {
        patients += 1000;
        patientsCounter.textContent = patients;
      } else {
        clearInterval(patientsInterval);
      }
    }, 10);

    const consultantsInterval = setInterval(function () {
      if (consultants < 100) {
        consultants++;
        consultantsCounter.textContent = consultants + "+";
      } else {
        clearInterval(consultantsInterval);
      }
    }, 30);

    const bedsInterval = setInterval(function () {
      if (beds < 98) {
        beds++;
        bedsCounter.textContent = beds;
      } else {
        clearInterval(bedsInterval);
      }
    }, 30);
  }

  // Intersection Observer to trigger counting when section comes into view
  const impactSection = document.querySelector('.impact-section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
        observer.disconnect(); // Stop observing once counting starts
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% of the section is in view

  // Start observing the section
  observer.observe(impactSection);
});





// Set the image path
const imageSrc = '../assets/images/50.png';  // Adjust this if necessary
// Create the image element
const imageElement = document.createElement('img');
imageElement.src = imageSrc;
imageElement.style.position = 'absolute';
imageElement.style.width = '40px';   // Adjust size as needed
imageElement.style.height = '40px';  // Adjust size as needed
imageElement.style.pointerEvents = 'none';
imageElement.style.transition = 'transform 0.1s ease';  // Smooth movement effect

// Append the image element to the body
document.body.appendChild(imageElement);

// Update image position based on cursor movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;

  // Add 5px margin-left to the image
  imageElement.style.left = `${mouseX - 15 + 20}px`;  // Adding 5px margin-left to the cursor position
  imageElement.style.top = `${mouseY - 15}px`;   // Adjust image to center on the cursor
});

/**
 * MOBILE NAVBAR
 * 
 * show the mobile navbar when click menu button
 * and hidden after click menu close button or overlay
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parent = this.closest(".dropdown");
      parent.classList.toggle("active");

      // Optional: Close others
      dropdownToggles.forEach(other => {
        if (other !== this) {
          other.closest(".dropdown").classList.remove("active");
        }
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("homepagePopup");
  const closeBtn = document.querySelector(".close-popup");

  // Show popup
  popup.classList.add("show");

  // Close popup
  closeBtn.addEventListener("click", function () {
    popup.classList.remove("show");
  });
});

/**
 * HEADER & BACK TOP BTN
 * 
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);