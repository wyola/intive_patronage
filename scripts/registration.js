const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', handleSubmit);

for (const input of form.elements) {
    input.addEventListener('keydown', clearMessage);
}

const dataLinks = [
    'https://api.npoint.io/38edf0c5f3eb9ac768bd',
    'https://api.npoint.io/b67529eeab508d2e8f94',
    'https://api.npoint.io/3b0bffd5eea7f572ab19'
]

function validateForm() {
    let isFormValid = true;
    const users = getUsers();

    const {email, userName, confirmEmail} = form.elements;
    
    // email - extra validation - aliases
    const userEmail = stripAlias(email.value);

    for (const user of users) {
        if (stripAlias(user.email) === userEmail) {
            displayMessage(email, 'istnieje już użytkownik z takim adresem email');
            isFormValid = false;
        }

        if (user.user === userName.value) {
            displayMessage(userName, 'istnieje już użytkownik o takiej nazwie');
            isFormValid = false;
        }
    }

    if (email.value !== confirmEmail.value) {
        displayMessage(confirmEmail, 'adresy email muszą być takie same');
        isFormValid = false;
    }

    // username validation - at least 1 digit
    if (!userName.value.match(/\d/)) {
        displayMessage(userName, 'nazwa użytkownika powinna zawierać co najmniej jedną cyfrę');
        isFormValid = false;
    }

    // username validation - at least 5 letters
    const userNameLetters = userName.value.replace(/[^a-zA-Z]+/g, '');
    if (userNameLetters.length < 5) {
        displayMessage(userName, 'nazwa użytkownika powinna zawierać co najmniej 5 liter');
        isFormValid = false;
    }

    return isFormValid;
}

// email - extra validation - aliases
function stripAlias(email) {
    const [alias, domain] = email.split('@');
    const username = alias.split('+')[0];
    const clearedEmail = username + '@' + domain;
    return clearedEmail;
}

function registerUser() {

    const users = getUsers();

    const user = {
        user: form.elements.userName.value,
        email: form.elements.email.value,
        password: hashPassword(form.elements.password.value),
        dataLink: dataLinks[Math.floor((Math.random() * dataLinks.length))]
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