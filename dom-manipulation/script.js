let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Fetch Quotes from the Server
async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.map(item => ({
    text: item.title,
    category: "General"
  }));
}

// Post New Quote to the Server
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

// Sync Local Quotes with Server
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    // Handle conflict resolution: Server data takes precedence
    const mergedQuotes = [...localQuotes, ...serverQuotes].reduce((acc, curr) => {
      const existingQuote = acc.find(q => q.text === curr.text && q.category === curr.category);
      if (!existingQuote) {
        acc.push(curr);
      }
      return acc;
    }, []);

    // Update local storage with merged quotes
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    
    // Notify the user about the sync status
    notifyUser('Quotes synced with server! Server data has been updated.');
  } catch (error) {
    console.error('Error syncing data with server:', error);
  }
}

// Display a Notification to the User
function notifyUser(message) {
  const notificationContainer = document.getElementById('message');
  notificationContainer.innerHTML = message;
  notificationContainer.style.display = 'block';
  setTimeout(() => {
    notificationContainer.style.display = 'none';
  }, 5000);
}

// Populate Categories Dynamically
function populateCategories() {
  const categoriesSet = new Set();
  quotes.forEach(quote => categoriesSet.add(quote.category));
  const categorySelect = document.getElementById("categoryFilter");

  categoriesSet.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Load last selected filter from localStorage
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
  categorySelect.value = lastSelectedCategory;

  // Apply filter based on the last selected category
  filterQuotes();
}

// Filter Quotes Based on Selected Category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  // Display Filtered Quotes
  displayQuotes(filteredQuotes);

  // Save the selected filter in localStorage
  localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Display Quotes on the Page
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
  } else {
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.textContent = randomQuote.text;
  }
}

// Add New Quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    postQuoteToServer(newQuote);  // Post the new quote to the server
    populateCategories();  // Re-populate categories when a new quote is added
    filterQuotes();        // Reapply the current filter
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}

// Initialize the App
function initializeApp() {
  populateCategories();
  syncQuotes();  // Initial sync with server
  setInterval(syncQuotes, 30000);  // Sync every 30 seconds
  document.getElementById("newQuote").addEventListener("click", filterQuotes);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

window.onload = initializeApp;
