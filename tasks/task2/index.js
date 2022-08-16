const formElement = document.forms['formElement'];

formElement.querySelectorAll("input").forEach((input) => {
    input.onfocus = (evt) => evt.target.classList.add('focused');
    input.onblur = (evt) => evt.target.classList.remove('focused');
})