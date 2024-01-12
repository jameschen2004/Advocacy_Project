let themeButton = document.getElementById("theme-button");
// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {

  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");

}

themeButton.addEventListener("click", toggleDarkMode);

// Select form element
const signNowButton = document.querySelector('#sign-now-button');
const form = document.querySelector('#sign-petition');
const reqlist = document.querySelector('#reqlist');
// Function to be called on submit

const validateForm = () => {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;

  const person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
}

const addSignature = (person) => {
  const request = `🖊️ ${person.name} from ${person.hometown} supports the voting cause!\nEmail Address: ${person.email}`;
  const p = document.createElement('p');
  p.innerText = request;
  const reqlist = document.querySelector('#reqlist');
  reqlist.appendChild(p);
}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transtitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
      /* add the active class to the revealableContainer's classlist */
    } else {
      revealableContainers[i].classList.remove('active');
      /* remove the active class to the revealableContainer's classlist */
    }
  }
}

window.addEventListener('scroll', reveal);

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}!`;
  const intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    // stop animation and hide modal
    clearInterval(intervalId);
    modal.style.display = "none";
  }, 4000);
};

let scaleFactor = 1;
const modalImage = document.querySelector('#thanks-modal img');

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
};