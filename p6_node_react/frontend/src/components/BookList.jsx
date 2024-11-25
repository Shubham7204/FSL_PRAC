import React from "react";

const BookList = ({ books, deleteBook, setEditBook }) => {
  return (
    <div className="books-list">
      <h2>Books:</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
