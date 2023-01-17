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
    const error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = errorMessage;
    input.parentNode.after(error);

    input.classList.add('invalid');
}

let users = [
    {
        user: 'wyola123',
        email: 'wyola@gmail.com',
        password: 'Test123'
    },
    {
        user: 'michal123',
        email: 'michal@gmail.com',
        password: 'Michal123'
    },
    {
        user: 'rico123',
        email: 'rico@gmail.com',
        password: 'Rico123'
    },
]


function validateForm() {
    let isFormValid = true;

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
    // JSON.stringify()
    // JSON.parse()
}


function handleSubmit(event) {
    event.preventDefault();
    console.log('test');
    const {userName, password, email, confirmEmail} = event.target.elements;

    validateForm();
}