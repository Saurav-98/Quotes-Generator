// Getting All DOM ELements

const quoteContainer = document.getElementById("quote-container");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};
// Get Quotes From API

let apiQuotes = [];
const getRandomQuote = () => {
  showLoadingSpinner();
  // To Pick a Random Quote from quotes array
  const randomID = Math.floor(Math.random() * apiQuotes.length);
  const displayQuote = apiQuotes[randomID];
  quote.textContent = displayQuote.text;

  author.textContent = !displayQuote.author ? "Unknown" : displayQuote.author;

  //   Check for long Quotes
  if (displayQuote.text.length > 100) {
    quote.classList.add("long-quote");
  } else {
    quote.classList.remove("long-quote");
  }
  hideLoadingSpinner();
};

const getQuotes = async () => {
  showLoadingSpinner();
  const APIURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(APIURL);
    apiQuotes = await response.json();
    getRandomQuote();
  } catch (error) {
    console.error(error);
  }
};

const tweetYourQuote = () => {
  const twiiterURl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twiiterURl, "_blank");
};

// Attaching TwitterBtn to the tweetQuote Function

twitterBtn.addEventListener("click", tweetYourQuote);

// Attaching New Quote BTN
newQuoteBtn.addEventListener("click", getRandomQuote);
getQuotes();
