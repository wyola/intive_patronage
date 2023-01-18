const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if(!currentUser) {
  location = 'login.html';
}
else {
  document.querySelector('header .content span').innerText = currentUser.user;
}

fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
  .then((response) => response.json())
  .then((data) => renderTransactions(data.transactions, data.transacationTypes)); // typo! -> transacAtionTypes

const icons = {
  1: 'assets/transaction-icons/income-other.png',
  2: 'assets/transaction-icons/expense-shopping.png',
  3: 'assets/transaction-icons/income.png',
  4: 'assets/transaction-icons/expense.png'
}

function renderTransactions(transactions, transactionTypes) {
  const tableBody = document.getElementsByTagName('tbody')[0];

  for (const transaction of transactions) {
    const dataRow = document.createElement('tr');
    tableBody.appendChild(dataRow);

    const dateCell = document.createElement('td');
    dateCell.classList.add("hide-on-mobile");
    dateCell.innerText = transaction.date;
    dataRow.appendChild(dateCell);

    const iconCell = document.createElement('td');
    iconCell.classList.add('transaction-icon')
    iconCell.innerHTML = `<img src="${icons[transaction.type]}" width="32px" height="32px" alt="${transactionTypes[transaction.type]}" >`
    dataRow.appendChild(iconCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.innerText = transaction.description;
    dataRow.appendChild(descriptionCell);

    const amountCell = document.createElement('td');
    amountCell.innerText = transaction.amount;
    dataRow.appendChild(amountCell);

    const balanceCell = document.createElement('td');
    balanceCell.classList.add("hide-on-mobile");
    balanceCell.innerText = transaction.balance;
    dataRow.appendChild(balanceCell);

    const mobileRow = document.createElement('tr');
    tableBody.appendChild(mobileRow);

    const mobileRowView = document.createElement('td');
    mobileRowView.classList.add("mobile-row");
    mobileRowView.colSpan = 5;    
    mobileRow.appendChild(mobileRowView);

    const mobileRowDate = document.createElement('div');
    mobileRowDate.innerText = `Data: ${transaction.date}`;
    mobileRowView.appendChild(mobileRowDate);

    const mobileRowBalance = document.createElement('div');
    mobileRowBalance.innerText = `Saldo: ${transaction.balance}`;
    mobileRowView.appendChild(mobileRowBalance);
  }
}  