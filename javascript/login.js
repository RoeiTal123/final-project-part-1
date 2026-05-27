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