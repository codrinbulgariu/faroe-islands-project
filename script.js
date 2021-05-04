"use strict";

// * Selected elements

//Navigation
const btnNav = document.querySelector(".navigation__button");
const navBackground = document.querySelector(".navigation__background");
const navItem = document.querySelectorAll(".navigation__link");

//Modal window
const popup = document.querySelector(".popup");
const popupOverlay = document.querySelector(".popup__overlay");
const modalOpen = document.querySelectorAll(".modal");
const btnClose = document.querySelector(".popup__close");
const btnBooking = document.querySelector(".btn--booking");

////////////////////////////////////////////////////////////////
const toursSection = document.querySelector(".heading-tours");
const btnTours = document.querySelector(".btn-tours");
const sectionBooking = document.querySelector(".section-book");

const allSection = document.querySelectorAll(".section");

btnTours.addEventListener("click", function () {
  toursSection.scrollIntoView({
    behavior: "smooth",
  });
});

//Modal window functionality
const openCloseModal = function (e) {
  e.preventDefault();
  popup.classList.toggle("hidden");
};

modalOpen.forEach((btn) => btn.addEventListener("click", openCloseModal));
btnClose.addEventListener("click", openCloseModal);

btnBooking.addEventListener("click", function (e) {
  openCloseModal(e);
  sectionBooking.scrollIntoView({
    behavior: "auto",
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    openCloseModal(e);
  }
});
popupOverlay.addEventListener("click", openCloseModal);

// Navigation Functionality
const openCloseNav = function (e) {
  e.preventDefault();
  btnNav.classList.toggle("nav--active");
};

btnNav.addEventListener("click", openCloseNav);
document
  .querySelector(".navigation__list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    //Matching strategy
    if (e.target.classList.contains("navigation__link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "auto",
      });
      openCloseNav(e);

      allSection.forEach(function (section) {
        section.classList.remove("section--hidden");
      });
    }
  });

//////////////////////////////////////////////////////////////

//Section reveal
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
