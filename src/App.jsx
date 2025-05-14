import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const getQuote = async () => {
    try {
      const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
      const data = await res.json();
      const quoteObj = JSON.parse(data.contents)[0];
      setQuote(quoteObj.q);
      setAuthor(quoteObj.a);
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };
  
  

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.quoteBox}>
        <p style={styles.quote}>"{quote}"</p>
        <p style={styles.author}>— {author}</p>
        <button onClick={getQuote} style={styles.button}>New Quote</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quoteBox: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  quote: {
    fontSize: '1.5rem',
    fontStyle: 'italic'
  },
  author: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#555'
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};

export default App;
