import { useEffect, useState } from 'react';
const urlToFetch = 'https://zenquotes.io/api/random?t=' + new Date().getTime();
const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(urlToFetch);

const res = await fetch(proxyUrl);
const data = await res.json();
// process data ...


function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const saved = localStorage.getItem('favoriteQuotes');
    return saved ? JSON.parse(saved) : [];
  });

const getQuote = async () => {
  try {
    const urlToFetch = `https://zenquotes.io/api/random?t=${new Date().getTime()}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlToFetch)}`;

    const res = await fetch(proxyUrl);
    const data = await res.json();
    setQuote(data[0].q);
    setAuthor(data[0].a);
  } catch (err) {
    console.error('Error fetching quote:', err);
  }
};



  useEffect(() => {
    getQuote();
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  const saveFavorite = () => {
    // Avoid duplicates
    const exists = favorites.some(
      (item) => item.quote === quote && item.author === author
    );
    if (!exists && quote && author) {
      setFavorites([...favorites, { quote, author }]);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" 
                                — ${author}`
    )}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl text-center space-y-6 w-full">
        <h1 className="text-2xl font-bold text-gray-800">Random Quote Generator</h1>
        <p className="text-xl italic text-gray-700 min-h-[5rem]">"{quote}"</p>
        <p className="text-sm text-gray-600 mb-4">— {author}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={getQuote}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Loading...' : 'New Quote'}
          </button>

          <button
            onClick={saveFavorite}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
          >
            Save Favorite
          </button>

          <button
            onClick={shareOnTwitter}
            className="px-6 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all"
          >
            Share on Twitter
          </button>
        </div>
      </div>

      {/* Favorites List */}
      {favorites.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 max-w-xl w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Favorites</h2>
          <ul className="space-y-4 max-h-64 overflow-auto">
            {favorites.map(({ quote, author }, index) => (
              <li key={index} className="border-l-4 border-green-600 pl-4">
                <p className="italic text-gray-700">"{quote}"</p>
                <p className="text-sm text-gray-600">— {author}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
