import { useState } from 'react';

const Delete = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/title/${title}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred, please try again.');
    }
  };

  return (
    <div>
      <h2>Delete Book</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button onClick={handleDelete}>Delete</button>
      <p>{message}</p>
    </div>
  );
};

export default Delete;
