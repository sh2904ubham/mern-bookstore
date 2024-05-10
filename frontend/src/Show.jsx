import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Show.css'
const Show = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('http://localhost:3000/book');
            setBooks(result.data.data);
        }
        fetchData();
    }, []);

  return (
    <div>
         <h1 className='title'>Books Details From the Server</h1>
            <h2>Total Books: {books.length}</h2>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>Title : {book.title} 
                    <br /> Author: {book.author}
                    <br /> publishYear: {book.publishYear}
                    <br /> Created At: {book.createdAt}
                    <br /> Updated At: {book.updatedAt}
                    </li>

                ))}
            </ul>
    </div>
  )
}

export default Show