let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.map(item => ({
    text: item.title,
    category: "General"
  }));
}

async function postQuoteToServer(quote) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: quote.text,
        body: quote.category,
        userId: 1
      })
    });
    const result = await response.json();
    console.log('Quote posted to server:', result);
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

async function syncDataWithServer() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const mergedQuotes = [...serverQuotes, ...localQuotes].reduce((acc, curr) => {
      if (!acc.some(quote => quote.text === curr.text && quote.category === curr.category)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    notifyUser('Data has been synced with the server!');
  } catch (error) {
    console.error('Error syncing data with server:', error);
  }
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    postQuoteToServer(newQuote);
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}

function notifyUser(message) {
  const notificationContainer = document.getElementById('notification');
  notificationContainer.innerHTML = message;
  notificationContainer.style.display = 'block';
  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 5000);
}

document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

function initializeApp() {
  syncDataWithServer();
  setInterval(syncDataWithServer, 30000);
}

window.onload = initializeApp;

