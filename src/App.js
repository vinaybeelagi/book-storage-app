import React, { useState, useEffect } from 'react';
import View from './components/View'; // Corrected import
import './App.css';
const App = () => {
  const getDatafromLS = () => {
    const data = localStorage.getItem('books');
    console.log(data);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [books, setBooks] = useState(getDatafromLS());
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, { name, author, isbn }]);
    setName('');
    setAuthor('');
    setIsbn('');
  };

  //delete books
  const deleteBook = (isbn) => {
    const filteredBooks = books.filter((element) => {
      return element.isbn !== isbn;
    });
    setBooks(filteredBooks);
  };

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  return (
    <div className="container">
      <h1>Book Library</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN#
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      {/* Display your list of books here */}
      <div className="view-container">
        {books.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook} />
                </tbody>
              </table>
            </div>
            <button className="btn btn-danger btn-md" onClick={() => setBooks([])}>
              Remove All
            </button>
          </>
        )}
        {books.length < 1 && <div>No books are added yet</div>}
      </div>
    </div>
  );
};

export default App;
