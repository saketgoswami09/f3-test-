// Fetch data using .then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => renderTable(data))
  .catch(error => console.error('Error fetching data:', error));

// Fetch data using async/await
async function fetchDataAsync() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';
  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${crypto.image}" alt="${crypto.name}" width="50">${crypto.name}</td>
      <td>${crypto.symbol}</td>
      <td>${crypto.current_price}</td>
      <td>${crypto.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

function search() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#cryptoTableBody tr');
  rows.forEach(row => {
    const name = row.getElementsByTagName('td')[0].innerText.toLowerCase();
    if (name.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function sortByMarketCap() {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));
  rows.sort((a, b) => {
    const priceA = parseFloat(a.getElementsByTagName('td')[2].innerText);
    const priceB = parseFloat(b.getElementsByTagName('td')[2].innerText);
    return priceB - priceA;
  });
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

function sortByPercentChange() {
  const tableBody = document.getElementById('cryptoTableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));
  rows.sort((a, b) => {
    const changeA = parseFloat(a.getElementsByTagName('td')[4].innerText);
    const changeB = parseFloat(b.getElementsByTagName('td')[4].innerText);
    return changeB - changeA;
  });
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}
