// Array to hold quotes
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Believe you can and you're halfway there.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Get the quote display element
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Update the DOM with a new quote
    quoteDisplay.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Validate inputs
    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        
        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Event listener to show a new quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Display an initial random quote when the page loads
window.onload = showRandomQuote;
