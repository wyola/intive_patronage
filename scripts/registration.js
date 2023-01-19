const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', handleSubmit);

for (const input of form.elements) {
    input.addEventListener('keydown', clearMessage);
}

function validateForm() {
    let isFormValid = true;

    const users = getUsers();
    
    // email - extra validation - aliases
    const userEmail = stripAlias(form.elements.email.value);

    for(const user of users) {
        if(stripAlias(user.email) === userEmail) {
            displayMessage(form.elements.email, 'istnieje już użytkownik z takim adresem email');
            isFormValid = false;
        }

        if(user.user === form.elements.userName.value) {
            displayMessage(form.elements.userName, 'istnieje już użytkownik o takiej nazwie');
            isFormValid = false;
        }
    }

    if (form.elements.email.value !== form.elements.confirmEmail.value) {
        displayMessage(form.elements.confirmEmail, 'adresy email muszą być takie same');
        isFormValid = false;
    }

    // username validation - at least 1 digit
    if(!form.elements.userName.value.match(/\d/)) {
        displayMessage(form.elements.userName, 'nazwa użytkownika powinna zawierać co najmniej jedną cyfrę');
        isFormValid = false;
    }

    // username validation - at least 5 letters
    const userNameLetters = form.elements.userName.value.replace(/[^a-zA-Z]+/g, '');
    if(userNameLetters.length < 5) {
        displayMessage(form.elements.userName, 'nazwa użytkownika powinna zawierać co najmniej 5 liter');
        isFormValid = false;
    }

    return isFormValid;
}

// email - extra validation - aliases
function stripAlias(email) {
    const alias = email.split('@')[0];
    const username = alias.split('+')[0];
    const domain = email.split('@')[1];
    const clearedEmail = username + '@' + domain;
    return clearedEmail;
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
    loginUser(user);
}

function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        registerUser();
    }
}