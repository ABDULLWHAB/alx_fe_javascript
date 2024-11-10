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

// Function to create and display the form dynamically
function createAddQuoteForm() {
    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    
    // Create the input fields
    const quoteTextInput = document.createElement('input');
    quoteTextInput.setAttribute('type', 'text');
    quoteTextInput.setAttribute('id', 'newQuoteText');
    quoteTextInput.setAttribute('placeholder', 'Enter a new quote');
    
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.setAttribute('type', 'text');
    quoteCategoryInput.setAttribute('id', 'newQuoteCategory');
    quoteCategoryInput.setAttribute('placeholder', 'Enter quote category');
    
    // Create the add quote button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.onclick = addQuote;
    
    // Append the inputs and button to the form container
    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
    
    // Append the form container to the body or another container
    document.body.appendChild(formContainer);
}

// Event listener to show a new quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Display an initial random quote when the page loads
window.onload = function() {
    showRandomQuote();
    createAddQuoteForm(); // Dynamically create the form to add quotes
};
