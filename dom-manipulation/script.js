// Array to store quotes
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { text: "An unexamined life is not worth living.", category: "Philosophy" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Use innerHTML to include the quote and its category
  quoteDisplay.innerHTML = `"${quote.text}" <br><em>(${quote.category})</em>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    alert("Quote added successfully!");
    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill out both fields before adding a quote.");
  }
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
  addButton.setAttribute("id", "addQuoteBtn");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append inputs and button to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Append the form container to the body
  document.body.appendChild(formContainer);
}

// Initialize the application
function initializeApp() {
  // Attach event listener for showing random quotes
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);

  // Dynamically create the add quote form
  createAddQuoteForm();
}

// Run the initialization when the window loads
window.onload = initializeApp;
