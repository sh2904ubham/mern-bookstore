import { useState } from 'react';

const Search = () => {
  const [title, setTitle] = useState('');
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/title/${title}`);
      const data = await response.json();
      if (response.ok) {
        setBook(data);
        setMessage('Book Find Successfully');
      } else {
        setBook(null);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred, please try again.');
    }
  };

  return (
    <div>
      <h2>Search Book</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Title: {book.title}</p>
          <p>Publish Year: {book.publishYear}</p>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Search;
