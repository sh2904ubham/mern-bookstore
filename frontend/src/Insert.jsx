import { useState } from 'react';
import axios from 'axios';

const Insert = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = { title, author, publishYear };
      await axios.post('http://localhost:3000/book', newBook);
      alert('Book added successfully');
      setTitle('');
      setAuthor('');
      setPublishYear('');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Publish Year:
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <br />
        </label>
        <button type="submit">Add Book</button>
        <br />
      </form>
    </div>
  );
};

export default Insert;
