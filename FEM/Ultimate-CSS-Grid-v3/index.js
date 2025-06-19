const checkbox = document.querySelector('#theme-box');
const colortest = document.querySelector('.color-test');

checkbox.addEventListener('change', colorTheme);
 
function colorTheme(e) {
  // runs when checkbox changes
  if (checkbox.checked == false) {
  colortest.style.setProperty('--dark-theme', 'false');
  } else {
    colortest.style.setProperty('--dark-theme', 'true');
  }
} 