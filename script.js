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

//SLIDER ANIMATION FUNCTIONALITY
//NICE TO ADD -> Change them automatically if the user is not touching them for at least 2 seconds.
const sliderAnimationFunc = (sectionClass, photoClass, maxValue) => {
  //The function takes 3 arguments:
  //1.The parent class of the components you want to add that functionality.
  //2. The images class you want to add that functionality.
  //3. The bootstrap col-lg maxvalue that you want to have.

  //Get the parent component
  const sliderAnimationContainer = document.querySelector(`.${sectionClass}`);

  //Add the event listener to the parent with event delegation
  sliderAnimationContainer.addEventListener(`mouseover`, function (e) {
    const clicked = e.target.closest(`.${photoClass}`);
    //guard clause
    if (!clicked) return;

    //now get the actual images to remove the classlists
    const photos = document.querySelectorAll(`.${photoClass}`);
    //work on that
    photos.forEach((photo) => {
      photo.classList.remove(`col-lg-4`);
      photo.classList.remove(`col-lg-3`);
      photo.classList.remove(`col-lg-2`);
    });

    //Photos algorithm -> reuse in the future
    //i is the image number in the array
    //left -> takes the left part of the array
    //Right -> takes the right part of the array
    //loop through the array and stop when the left and right reached 0, photos.lengtrh
    let i = Number(clicked.dataset.id);
    let left = i;
    let right = i;
    let isFinished = false;
    let counter = 1;
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
      counter++;
      if (left === 0 && right === photos.length - 1) isFinished = true;
    }
  });
};

sliderAnimationFunc(
  "first-slide-animation-section",
  "first-slide-animation-photo",
  4
);
sliderAnimationFunc(
  "second-slide-animation-section",
  "second-slide-animation-photo",
  4
);

//get answers to your questions animation
//Nice to add -> when section is revealed automaticly change the active one
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

//WHAT TO NEXT
//ADD CONTACT US FUNCTIONALITY -> WHEN SEND PRESSED CLOSE THE MODAL AND DISPLAY THE MESSAGE
//AND ALSO SEND EMAIL IF POSSIBLE.
const contactMeModal = document.querySelector(`.modal-container`);
contactMeModal.addEventListener(`click`, function (e) {
  console.log(`i clicked on the modal`);
  if (e.target.closest(`.btn-modal-send`)) {
    //get access to bootstrap modal functions.
    const bootstrapModal = bootstrap.Modal.getOrCreateInstance(contactMeModal);

    //check for invalid input: We have 2 cases.
    let invalidEmail = false;
    let invalidMessage = false;
    let contactEmail = contactMeModal.querySelector(`#modal-email`);
    let contactMessage = contactMeModal.querySelector(`#message-text`);
    //1. Invalid mail
    if (!contactEmail.value.includes("@")) invalidEmail = true;
    //2. Invalid text (<=10 characters)
    if (contactMessage.value.length < 10) invalidMessage = true;
    //If both are valid -> hide
    if (!invalidEmail && !invalidMessage) {
      document
        .querySelector(`.succesful-send-alert`)
        .classList.remove(`d-none`);
      bootstrapModal.hide();
      contactMessage.value = "";
      contactEmail.value = "";
    }
    //Else show error message -> change things
    else {
      if (invalidEmail) {
        contactEmail.style.backgroundColor = "var(--bs-danger)";
        contactEmail.parentElement.style.backgroundColor =
          "var(--bs-danger-bg-subtle)";
        contactEmail.value = "";
        contactEmail.setAttribute(
          `placeholder`,
          "Invalid email! e.g: example@mail.com"
        );
      }
      if (invalidMessage) {
        contactMessage.style.backgroundColor = "var(--bs-danger)";
        contactMessage.parentElement.style.backgroundColor =
          "var(--bs-danger-bg-subtle)";
        contactMessage.value = "";
        contactMessage.setAttribute(
          `placeholder`,
          "Message must be 10 characters long!"
        );
      }
    }
  }
  //also delete content when pressed on x/close/etc.
});
