document.addEventListener('DOMContentLoaded', () => {
    const quoteInput = document.getElementById('quote-input');
    const authorInput = document.getElementById('author-input');
    const addQuoteBtn = document.getElementById('add-quote-btn');
    const quotesSection = document.getElementById('quotes-section');

    // Function to add a quote
    const addQuote = () => {
        const quoteText = quoteInput.value.trim();
        const authorText = authorInput.value.trim();

        if (quoteText === '' || authorText === '') {
            alert('Please fill out both the quote and author fields.');
            return;
        }

        const quote = {
            text: quoteText,
            author: authorText
        };

        const key = `quote-${Date.now()}`;
        localStorage.setItem(key, JSON.stringify(quote));
        
        displayQuotes();
        quoteInput.value = '';
        authorInput.value = '';
    };

    // Function to display stored quotes
    const displayQuotes = () => {
        quotesSection.innerHTML = '';
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('quote-')) {
                const quote = JSON.parse(localStorage.getItem(key));
                const quoteElement = document.createElement('div');
                quoteElement.className = 'quote';
                quoteElement.innerHTML = `
                    <p>"${quote.text}" - <em>${quote.author}</em></p>
                    <button class="remove-quote-btn" data-key="${key}">Remove</button>
                `;
                quotesSection.appendChild(quoteElement);
            }
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-quote-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const key = e.target.getAttribute('data-key');
                localStorage.removeItem(key);
                displayQuotes();
            });
        });
    };

    // Add event listener to the add button
    addQuoteBtn.addEventListener('click', addQuote);

    // Display quotes on page load
    displayQuotes();
});
