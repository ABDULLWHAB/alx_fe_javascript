
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];


function fetchQuotesFromServer() {
  return fetch('https://jsonplaceholder.typicode.com/posts') 
    .then(response => response.json())
    .then(data => {
      return data.map(item => ({
        text: item.title,
        category: "General"
      }));
    });
}


function syncDataWithServer() {
  fetchQuotesFromServer()
    .then(serverQuotes => {
      const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      const mergedQuotes = [...serverQuotes, ...localQuotes].reduce((acc, curr) => {
        if (!acc.some(quote => quote.text === curr.text && quote.category === curr.category)) {
          acc.push(curr);
        }
        return acc;
      }, []);
      
      localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
      notifyUser('Data has been synced with the server!');
    })
    .catch(error => {
      console.error('Error syncing data with server:', error);
    });
}


setInterval(syncDataWithServer, 30000);


function notifyUser(message) {
  const notificationContainer = document.getElementById('notification');
  notificationContainer.innerHTML = message;
  notificationContainer.style.display = 'block';

  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 5000);
}


function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}


document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);


function initializeApp() {
  
  syncDataWithServer(); 
  setInterval(syncDataWithServer, 30000); 
}


window.onload = initializeApp;
