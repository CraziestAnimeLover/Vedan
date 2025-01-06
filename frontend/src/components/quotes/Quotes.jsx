import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';

const Quotes = () => {
  // Array of quotes and authors
  const quotes = [
    {
      quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      author: "----- Krishn ji ",
    },
    {
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      quote: "Get busy living or get busy dying.",
      author: "Stephen King",
    },
    {
      quote: "In three words I can sum up everything I've learned about life: it goes on.",
      author: "Robert Frost",
    },
    {
      quote: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.",
      author: "Ralph Waldo Emerson",
    },
  ];

  // State to track the current quote index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect to change the quote every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length); // Loop back to the first quote
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="h-[50vh] bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <div className="relative w-full max-w-2xl">
        <QuoteCard
          quote={quotes[currentIndex].quote}
          author={quotes[currentIndex].author}
        />
      </div>
    </div>
  );
};

export default Quotes;
