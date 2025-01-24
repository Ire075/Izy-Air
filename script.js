
////////////// TESTIMONIAL SLIDER CODE //////////////////////
// Select the menu button and the menu
const menuButton = document.getElementById('ph-menu-button');
const menu = document.getElementById('ph-menu');

// Function to toggle menu visibility
function toggleMenu() {
  menu.classList.toggle('hidden');
}

// Function to hide the menu
function hideMenu(event) {
  // Check if the click is outside the menu and button
  if (!menu.contains(event.target) && event.target !== menuButton) {
    menu.classList.add('hidden');
  }
}

// Add a click event listener to the menu button
menuButton.addEventListener('click', (event) => {
  toggleMenu();
  event.stopPropagation(); // Prevent the body click event from firing when menuButton is clicked
});

// Add a click event listener to the document to hide the menu
document.addEventListener('click', hideMenu);

























////////////// TESTIMONIAL SLIDER CODE //////////////////////
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

// Initial display
showTestimonial(currentIndex);

/////////////////  COUNTRY AND COUNTRY CODE SELECT /////////////////////////
async function populateCountries() {
  const countrySelect = document.getElementById('country');
  const countryCodeSelect = document.getElementById('country-code');

  try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();

      // Sort countries alphabetically
      const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

      // Populate country dropdown
      sortedCountries.forEach(country => {
          const countryOption = document.createElement('option');
          countryOption.value = country.cca2; // Use the 2-letter country code
          countryOption.textContent = country.name.common;
          countrySelect.appendChild(countryOption);
      });

      // Populate country code dropdown
      sortedCountries.forEach(country => {
          if (country.idd?.root) {
              const countryCodeOption = document.createElement('option');
              countryCodeOption.value = `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
              countryCodeOption.textContent = `${country.idd.root}${country.idd.suffixes?.[0] || ''} (${country.name.common})`;
              countryCodeSelect.appendChild(countryCodeOption);
          }
      });
  } catch (error) {
      console.error('Error fetching countries:', error);
  }
}

// Populate country and country code dropdowns on page load
document.addEventListener('DOMContentLoaded', populateCountries);


//////////////NAV BAR SCROLLING CODE/////////////////////////////////
let lastScrollPosition = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
    // Scrolling down
    navbar.classList.remove('visible');
    navbar.classList.add('hidden');
  } else if (currentScrollPosition < lastScrollPosition) {
    // Scrolling up
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
  }

  // Update the last scroll position
  lastScrollPosition = currentScrollPosition;
});


////////////ANIMATION ON SCROLL////////////////////////////////////
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('hidden');
    }
  });
}, { threshold: 0.1 }); // 10% visibility triggers the animation

// Select all elements to animate
const anim = document.querySelectorAll('.anim');
anim.forEach(el => observer.observe(el));
const leftAnim = document.querySelectorAll('.leftanim');
leftAnim.forEach(el => observer.observe(el));
const rightAnim = document.querySelectorAll('.rightanim');
rightAnim.forEach(el => observer.observe(el));
