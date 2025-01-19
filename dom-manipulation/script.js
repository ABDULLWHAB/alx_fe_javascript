let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Fetch Quotes
async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.map(item => ({
    text: item.title,
    category: "General"
  }));
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
  document.getElementById("newQuote").addEventListener("click", filterQuotes);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

window.onload = initializeApp;
