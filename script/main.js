// Select the element that displays the currently playing note
const note = document.querySelector(".nowplaying");

// Select all the keys that will interact with the user
const allKeys = document.querySelectorAll(".keys");

// Select all the hint elements for setting transition delays
const hints = document.querySelectorAll(".hints");

// Add an event listener for keydown events
window.addEventListener("keydown", function (event) {
  // Find the key element corresponding to the pressed key
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!key) return; // Exit if no corresponding key element is found

  // Find the audio element corresponding to the pressed key
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  // Get the note name from the key's data-note attribute
  const keyNote = key.getAttribute("data-note");

  // Add the 'playing' class to the key to trigger visual effects
  key.classList.add("playing");

  // Display the note name in the 'nowplaying' element
  note.textContent = "Note: " + keyNote;

  // Rewind the audio to the start and play it
  audio.currentTime = 0;
  audio.play();
});

// Function to remove the 'playing' class after transition ends
function removeTransition(event) {
  event.target.classList.remove("playing");
}

// Add an event listener to each key to remove 'playing' class after transition ends
allKeys.forEach((key) =>
  key.addEventListener("transitionend", removeTransition)
);

// Set transition delays for hint elements, staggered by 50ms
hints.forEach(function (element, index) {
  element.style = `transition-delay: ${index * 50}ms`;
});