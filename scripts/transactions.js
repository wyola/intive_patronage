const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if(!currentUser) {
  location = 'login.html';
}
else {
  document.querySelector('header .content span').innerText = currentUser.user;
}

const defaultDataLink = 'https://api.npoint.io/38edf0c5f3eb9ac768bd';
const dataLink = currentUser.dataLink || defaultDataLink;

fetch(dataLink)
  .then((response) => response.json())
  .then((data) => {
    renderTransactions(data.transactions, data.transacationTypes); // typo in data! -> transacAtionTypes
    renderCharts(data.transactions, data.transacationTypes);
  });

const icons = {
  1: 'assets/transaction-icons/income-other.png',
  2: 'assets/transaction-icons/expense-shopping.png',
  3: 'assets/transaction-icons/income.png',
  4: 'assets/transaction-icons/expense.png'
};

const currencyFormatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 2, minimumFractionDigits: 2 });

function renderTransactions(transactions, transactionTypes) {
  const tableBody = document.getElementsByTagName('tbody')[0];
  
  for (const transaction of transactions) {
    const dataRow = document.createElement('tr');
    dataRow.classList.add("main-row");
    dataRow.addEventListener('click', openRow);
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
        
    const description = document.createElement('div');
    description.innerHTML = transaction.description;
    descriptionCell.appendChild(description);

    const type = document.createElement('div');
    type.innerHTML = transactionTypes[transaction.type];
    type.classList.add('transaction-type', 'hide-on-mobile')
    descriptionCell.appendChild(type);

    dataRow.appendChild(descriptionCell);

    const amountCell = document.createElement('td');
    amountCell.innerText = currencyFormatter.format(transaction.amount);
    dataRow.appendChild(amountCell);

    const balanceCell = document.createElement('td');
    balanceCell.classList.add("hide-on-mobile");
    balanceCell.innerText = currencyFormatter.format(transaction.balance);
    dataRow.appendChild(balanceCell);

    const mobileRow = document.createElement('tr');
    mobileRow.classList.add("mobile-row");
    tableBody.appendChild(mobileRow);

    const mobileRowView = document.createElement('td');
    mobileRowView.colSpan = 5;    
    mobileRow.appendChild(mobileRowView);

    const mobileRowDate = document.createElement('div');
    mobileRowDate.innerText = `Data: ${transaction.date}`;
    mobileRowView.appendChild(mobileRowDate);

    const mobileRowBalance = document.createElement('div');
    mobileRowBalance.innerText = `Saldo: ${currencyFormatter.format(transaction.balance)}`;
    mobileRowView.appendChild(mobileRowBalance);

    const mobileRowType = document.createElement('div');
    mobileRowType.innerText = `Typ: ${transactionTypes[transaction.type]}`;
    mobileRowView.appendChild(mobileRowType);
  }
}

function openRow(event) {
  const row = event.currentTarget;

  const openRows = document.getElementsByClassName('mobile-row-show')

  for(const openRow of openRows) {
    if (openRow !== row.nextSibling) {
      openRow.classList.remove('mobile-row-show');
    }
  }
  row.nextSibling.classList.toggle('mobile-row-show');
}

// --- CHARTS --- //

function renderCharts(transactions, transactionTypes) {

  doughnutChart(transactions, transactionTypes);
  barChart(transactions)
}

// --- doughnut chart --- //

function doughnutChart(transactions, transactionTypes) {
  
  const types = Object.values(transactionTypes);
  const transactionCounts = (new Array(types.length)).fill(0);

  for(const transaction of transactions) {
      transactionCounts[transaction.type - 1]++;
  }

  new Chart(
    document.getElementById('doughnut-chart'),
    {
      type: 'doughnut',
      data: {
        labels: types,
        datasets: [{
          label: 'Udział transakcji',
          data: transactionCounts.map( count => count / transactions.length),
          backgroundColor: [
            'rgb(101,177,117)',
            'rgb(174,36,99)',
            'rgb(0 151 192)',
            'rgb(0 58 192)',
          ],
          hoverOffset: 12
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed !== null) {
                        label += `${(context.parsed * 100).toFixed(2)}%`;
                    }
                    return label;
                }
            }
          },
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Procentowy podział typów transakcji',
            color: 'white'
          }
        },
        layout: {
          padding: 10
        }
      }
    }
  );
}

// --- bar chart --- //

function barChart(transactions) {

  const uniqueDates = [];
  const balances = [];

  let lastCheckedDate = '';
  for(const transaction of transactions) {
    if (lastCheckedDate !== transaction.date) {      
      uniqueDates.push(transaction.date);
      balances.push(transaction.balance);
      lastCheckedDate = transaction.date;
    }
  }

  const barColors = balances.map(value => value >= 0 ? 'green' : 'red');

  new Chart(
    document.getElementById('bar-chart'),
    {
      type: 'bar',
      data: {
        labels: uniqueDates.reverse(),
        datasets: [{
          label: 'Saldo',
          data: balances.reverse(),
          backgroundColor: barColors.reverse(),
          borderColor: 'white',
          borderWidth: 2,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Saldo konta na koniec dnia',
            color: 'white'
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'white',
              zeroLineWidth: 10,
            },
            title: {
              display: true,
              color: 'white',
              text: 'dzień',
            },
            ticks: {
              color: 'white',
            },
          },
          y: {
            grid: {
              color: 'white',
            },
            title: {
              display: true,
              color: 'white',
              text: 'saldo',
            },
            ticks: {
              color: 'white',
            },
          }
        }
      }      
    }
  );
} 