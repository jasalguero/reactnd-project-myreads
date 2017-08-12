import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function BookShelf({ title, books, shelf, onMoveBook }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book =>
            <li key={book.id}>
              <Book book={book} shelf={shelf} onMoveBook={onMoveBook} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default BookShelf;
