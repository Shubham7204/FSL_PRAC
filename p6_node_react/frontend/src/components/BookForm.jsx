import React, { useState, useEffect } from "react";

const BookForm = ({ addBook, updateBook, editBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
    }
  }, [editBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author };

    if (editBook) {
      updateBook({ ...book, _id: editBook._id });
    } else {
      addBook(book);
    }

    setTitle("");
    setAuthor("");
  };

  return (
    <div className="form-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author name"
      />
      <button onClick={handleSubmit}>
        {editBook ? "Update Book" : "Add Book"}
      </button>
    </div>
  );
};

export default BookForm;