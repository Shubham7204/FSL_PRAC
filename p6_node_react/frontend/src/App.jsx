import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axios.post("http://localhost:5000/api/books", book);
      setBooks([...books, response.data]);
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const updateBook = async (book) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${book._id}`, book);
      const updatedBooks = books.map((b) =>
        b._id === book._id ? response.data : b
      );
      setBooks(updatedBooks);
      setEditBook(null);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>Book Manager</h1>
      <BookForm
        addBook={addBook}
        updateBook={updateBook}
        editBook={editBook}
      />
      <BookList
        books={books}
        deleteBook={deleteBook}
        setEditBook={setEditBook}
      />
    </div>
  );
};

export default App;
