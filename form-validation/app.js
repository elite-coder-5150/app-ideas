const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const showError = (input, message) => {
    const formControl = input.parentElement
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
};

const showSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input);
    }
}

const checkRequired = (inputArr) => {
    let isRequired = false;

    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = false;
        } else {
            showSuccess(input)
        }
    })

    return isRequired // true or false
}
const checkLength = (input, min, max) => {
    if (input.value.trim() < min) {
        showError(input, `${getFieldName(input) }must be at least ${min} characters`)
    } else if (input.value.trim() > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

const checkPasswordMatch = (password, confirmPassword) => {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'password does not match');
    }
}
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkRequired([username, email, password, confirmPassword])) {
        checkLength(username, 3, 15);
        checkLength(email,6, 16);
        checkEmail(email);
        checkPasswordMatch(password, confirmPassword);
    }
});
