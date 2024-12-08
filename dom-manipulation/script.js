
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { text: "An unexamined life is not worth living.", category: "Philosophy" }
];


function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = '';

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = 'No quotes available for this category.';
  } else {
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" <br><em>(${quote.category})</em>`;
  }
}


function populateCategories() {
  const categories = new Set(quotes.map(quote => quote.category)); 
  const categoryFilter = document.getElementById("categoryFilter");

  
  categoryFilter.innerHTML = '';

  
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Categories";
  categoryFilter.appendChild(allOption);

  
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}


function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
  }

 
  displayQuotes(filteredQuotes);

  
  localStorage.setItem('selectedCategory', selectedCategory);
}


function loadSelectedFilter() {
  const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  const categoryFilter = document.getElementById("categoryFilter");

  
  categoryFilter.value = lastSelectedCategory;

  
  filterQuotes();
}


function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    
    populateCategories();

    
    filterQuotes();
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}


document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);


function initializeApp() {
  
  populateCategories();
  loadSelectedFilter();  
}


window.onload = initializeApp;
