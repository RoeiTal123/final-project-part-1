document.addEventListener("DOMContentLoaded", Main)

function Main ()
{
    console.log("Hello")
}

function removeNumbers(event) {
    event.target.value = event.target.value.replace(/\d/g, '');
}

function removeLetters(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
}

function formatPhoneNumber(event) {
    let num = event.target.value.replace(/\D/g, '');

    if (num.length <= 3) {
        event.target.value = num;
    } 
    else if (num.length <= 6) {
        event.target.value = `${num.slice(0, 3)} ${num.slice(3)}`;
    } 
    else {
        event.target.value = `${num.slice(0, 3)} ${num.slice(3, 6)}-${num.slice(6, 10)}`;
    }
}

function countLetters(textarea) {
  const display = document.getElementById("word-count-display");
  const maxLetters = 1000;

  let letterCount = textarea.value.length;
  
  if (letterCount > maxLetters) {
    textarea.value = textarea.value.slice(0, maxLetters);
    letterCount = maxLetters;
  }
  
  display.textContent = `${letterCount}/${maxLetters}`;
}