const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', validateLogin);

for (const input of form.elements) {
    input.addEventListener('keydown', clearMessage);
}

function validateLogin(event) {
    event.preventDefault();

    let isFormValid = false;

    const users = getUsers();

    for(const user of users) {

        if((form.elements.login.value === user.user || form.elements.login.value === user.email) &&
            form.elements.password.value === user.password) {
                isFormValid = true;
                loginUser(user);
                return user;
            } 
    }

    // user and password not found - check if password is correct OR if there is a user with given username/email
    let userExists = false;
    for(const user of users) {
        if(form.elements.login.value === user.user || form.elements.login.value === user.email) {
            userExists = true;
            break;
        }
    }

    if(userExists) {
        displayMessage(form.elements.password, 'niepoprawne hasło');
    }
    else {
        displayMessage(form.elements.login, 'użytkownik nie istnieje - zarejestruj się!', false);
    }
    return isFormValid;
}