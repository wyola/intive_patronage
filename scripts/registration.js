const form = document.getElementsByTagName('form')[0];
form.addEventListener("submit", handleSubmit);

for (const input of form.elements) {
    input.addEventListener('keydown', clearError);
}

function clearError(event) {
    const input = event.target;

    if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        input.parentNode.nextSibling.remove();
    } 
}

function displayError(input, errorMessage) {
    clearError({target: input});
    const error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = errorMessage;
    input.parentNode.after(error);

    input.classList.add('invalid');
}

function getUsers() {
    let users = JSON.parse(localStorage.getItem('users'));

    if (!Array.isArray(users)) {
        users = [];
    }

    return users;
}

function validateForm() {
    let isFormValid = true;

    const users = getUsers();

    for(const user of users) {
        if(user.email === form.elements.email.value) {
            displayError(form.elements.email, 'istnieje już użytkownik z takim adresem email')
            isFormValid = false;
        }

        if(user.user === form.elements.userName.value) {
            displayError(form.elements.userName, 'istnieje już użytkownik o takiej nazwie')
            isFormValid = false;
        }
    }

    if (form.elements.email.value !== form.elements.confirmEmail.value) {
        displayError(form.elements.confirmEmail, 'adresy email muszą być takie same')
        isFormValid = false;
    }

    return isFormValid;
}

function registerUser() {

    const users = getUsers();

    const user = {
        user: form.elements.userName.value,
        email: form.elements.email.value,
        password: form.elements.password.value
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    console.log(users);
}


function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        registerUser();
    }
}