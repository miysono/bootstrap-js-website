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
