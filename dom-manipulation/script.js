// Array to store quotes
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { text: "An unexamined life is not worth living.", category: "Philosophy" }
];

// Function to display quotes based on the selected filter
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = '';

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = 'No quotes available for this category.';
  } else {
    filteredQuotes.forEach(quote => {
      quoteDisplay.innerHTML += `"${quote.text}" <br><em>(${quote.category})</em><br><br>`;
    });
  }
}

// Function to populate the category filter dropdown
function populateCategories() {
  const categories = new Set(quotes.map(quote => quote.category));
  const categoryFilter = document.getElementById("categoryFilter");

  // Add categories to the dropdown
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Add the "All Categories" option as the first item
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Categories";
  categoryFilter.insertBefore(allOption, categoryFilter.firstChild);
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }

  // Display the filtered quotes
  displayQuotes(filteredQuotes);

  // Save the selected filter to localStorage
  localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to load the last selected filter from localStorage
function loadSelectedFilter() {
  const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  const categoryFilter = document.getElementById("categoryFilter");

  // Set the dropdown to the last selected category
  categoryFilter.value = lastSelectedCategory;

  // Apply the filter
  filterQuotes();
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Update categories in the dropdown
    populateCategories();

    // Refresh the displayed quotes
    filterQuotes();
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Initialize the app
function initializeApp() {
  // Populate categories and display the quotes
  populateCategories();
  loadSelectedFilter();  // Load last selected filter from localStorage
}

// Run the initialization when the window loads
window.onload = initializeApp;

