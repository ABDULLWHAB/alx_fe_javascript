// Initialize the quotes array (load from local storage if available)
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    // Default quotes if local storage is empty
    quotes = [
      { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
      { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
      { text: "An unexamined life is not worth living.", category: "Philosophy" }
    ];
    saveQuotes();
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display the last viewed quote using session storage
function displayLastViewedQuote() {
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = lastViewed;
  }
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Use innerHTML to include the quote and its category
  const quoteHTML = `"${quote.text}" <br><em>(${quote.category})</em>`;
  quoteDisplay.innerHTML = quoteHTML;

  // Save the last viewed quote in session storage
  sessionStorage.setItem("lastViewedQuote", quoteHTML);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    alert("Quote added successfully!");
    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format. Please upload a valid JSON file.");
      }
    } catch (error) {
      alert("Error reading file. Please upload a valid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to dynamically create the form for adding quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  // Create input for the quote text
  const quoteInput = document.createElement("input");
  quoteInput.setAttribute("id", "newQuoteText");
  quoteInput.setAttribute("type", "text");
  quoteInput.setAttribute("placeholder", "Enter a new quote");

  // Create input for the category
  const categoryInput = document.createElement("input");
  categoryInput.setAttribute("id", "newQuoteCategory");
  categoryInput.setAttribute("type", "text");
  categoryInput.setAttribute("placeholder", "Enter quote category");

  // Create the add button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Create the export button
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportToJsonFile);

  // Create the import file input
  const importInput = document.createElement("input");
  importInput.setAttribute("type", "file");
  importInput.setAttribute("accept", ".json");
  importInput.addEventListener("change", importFromJsonFile);

  // Append inputs and buttons to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  formContainer.appendChild(exportButton);
  formContainer.appendChild(importInput);

  // Append the form container to the body
  document.body.appendChild(formContainer);
}

// Initialize the application
function initializeApp() {
  loadQuotes();
  displayLastViewedQuote();
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  createAddQuoteForm();
}

// Run the initialization when the window loads
window.onload = initializeApp;
