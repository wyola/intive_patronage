fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
  .then((response) => response.json())
  .then((data) => renderTransactions(data.transactions, data.transacationTypes)); // typo! -> transacAtionTypes

function renderTransactions(transactions, transactionTypes) {
  const tableBody = document.getElementsByTagName('tbody')[0];

  for (const transaction of transactions) {
    const dataRow = document.createElement('tr');
    tableBody.appendChild(dataRow);

    const dateCell = document.createElement('td');
    dateCell.innerText = transaction.date;
    dataRow.appendChild(dateCell);

    const iconCell = document.createElement('td');
    iconCell.innerText = 'ikona' // TODO: find icons !!!
    dataRow.appendChild(iconCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.innerText = transaction.description;
    dataRow.appendChild(descriptionCell);

    const amountCell = document.createElement('td');
    amountCell.innerText = transaction.amount;
    dataRow.appendChild(amountCell);

    const balanceCell = document.createElement('td');
    balanceCell.innerText = transaction.balance;
    dataRow.appendChild(balanceCell);

    const mobileRow = document.createElement('tr');
    tableBody.appendChild(mobileRow);

    const mobileRowView = document.createElement('td');
    mobileRow.setAttribute('colspan', 5);    
    mobileRow.appendChild(mobileRowView);

    const mobileRowDate = document.createElement('div');
    mobileRowDate.innerText = `Data: ${transaction.date}`;
    mobileRowView.appendChild(mobileRowDate);

    const mobileRowBalance = document.createElement('div');
    mobileRowBalance.innerText = `Saldo: ${transaction.balance}`;
    mobileRowView.appendChild(mobileRowBalance);
  }
}  