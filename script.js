"use strict";
const init = function () {
  //navbar observer
  const navbar = document.querySelector(`header`);
  const navHeight = navbar.getBoundingClientRect().height;
  const headerSection = document.querySelector(`main`);

  const navbarLogic = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) navbar.classList.add(`sticky-top`);
    else navbar.classList.remove(`sticky-top`);
  };

  const navbarSettings = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  };

  const navbarObserver = new IntersectionObserver(navbarLogic, navbarSettings);
  navbarObserver.observe(headerSection);

  //first slider observer

  //section observer
  const allSections = document.querySelectorAll(`.section-container`);
  const sectionBehaviour = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove(`opacity-0`);
    entry.target.style.transform = "translateY(0)";
    observer.unobserve(entry.target);
  };

  const sectionSettings = {
    root: null,
    threshold: 0.2,
  };

  const sectionObserver = new IntersectionObserver(
    sectionBehaviour,
    sectionSettings
  );
  allSections.forEach((section) => {
    section.classList.add(`opacity-0`);
    section.style.transitionDuration = "0.7s";
    section.style.transform = "translateY(5rem)";
    sectionObserver.observe(section);
  });
};

init();

//get answers to your questions animation

//add transitionduration -> remove after when added css
document.querySelectorAll(`.questions-photo`).forEach((photo) => {
  photo.style.transitionDuration = "0.5s";
});

const answersContainer = document.querySelector(`.question-section`);
answersContainer.addEventListener(`mouseover`, function (e) {
  const clicked = e.target.closest(`.questions-photo`);
  if (!clicked) return;
  document.querySelectorAll(`.questions-photo`).forEach((photo) => {
    photo.classList.remove(`col-lg-6`);
    photo.classList.add(`col-lg-5`);
  });
  clicked.classList.add(`col-lg-6`);
  clicked.classList.remove(`col-lg-5`);
});

//second answers container

//add transitionduration -> remove after when added css
document.querySelectorAll(`.second-questions-photo`).forEach((photo) => {
  photo.style.transitionDuration = "0.5s";
});

//redo this -> i don`t like
const secondAnswersContainer = document.querySelector(
  `.second-question-section`
);
secondAnswersContainer.addEventListener(`mouseover`, function (e) {
  const clicked = e.target.closest(`.second-questions-photo`);
  if (!clicked) return;
  const photos = document.querySelectorAll(`.second-questions-photo`);

  photos.forEach((photo) => {
    photo.classList.remove(`col-lg-4`);
    photo.classList.remove(`col-lg-3`);
    photo.classList.remove(`col-lg-2`);
  });

  //Photos algorithm -> reuse in the future
  let i = Number(clicked.dataset.id);
  let left = i;
  let right = i;
  let isFinished = false;
  let counter = 1;
  let maxValue = 4;
  photos[i].classList.add(`col-lg-${maxValue}`);
  while (!isFinished) {
    if (left > 0) {
      photos[left - 1].classList.add(`col-lg-${maxValue - counter}`);
      left--;
    }
    if (right + 1 < photos.length) {
      photos[right + 1].classList.add(`col-lg-${maxValue - counter}`);
      right++;
    }
    console.log(`right: ${right}`);
    counter++;
    if (left === 0 && right === photos.length - 1) isFinished = true;
  }
});
