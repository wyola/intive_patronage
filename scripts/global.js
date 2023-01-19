function clearMessage(event) {
    const input = event.target;

    if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        input.parentNode.nextSibling.remove();
    } 
}

function displayMessage(input, message, isError = true) {
    clearMessage({target: input});
    const messageElement = document.createElement('div');
    messageElement.classList.add('field-message');

    if (isError) {
        messageElement.classList.add('error-message');
    }
    
    messageElement.innerText = message;
    input.parentNode.after(messageElement);
    input.classList.add('invalid');
}

function getUsers() {
    let users = JSON.parse(localStorage.getItem('users'));

    if (!Array.isArray(users)) {
        users = [];
    }

    return users;
}

function loginUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    location = 'transactions.html';
}

function hashPassword(password) {
    return btoa(password);
}