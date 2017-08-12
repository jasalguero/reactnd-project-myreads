import React from "react";
import PropTypes from "prop-types";
import AddBookLink from "../components/AddBookLink";
import BookShelf from "../components/BookShelf";

/**
 * Stateles component that renders the different shelves
 * @param {*} props 
 */
function BookListRoute({ books, onMoveBook }) {
  const currentReadingBooks = [];
  const wantToReadBooks = [];
  const readBooks = [];

  // get the books for each shelf
  books.forEach(b => {
    switch (b.shelf) {
      case "currentlyReading":
        currentReadingBooks.push(b);
        break;
      case "wantToRead":
        wantToReadBooks.push(b);
        break;
      case "read":
        readBooks.push(b);
        break;
      default:
      //do nothing
    }
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            shelf="currentlyReading"
            books={currentReadingBooks}
            onMoveBook={onMoveBook}
          />
          <BookShelf
            title="Want To Read"
            shelf="wantToRead"
            books={wantToReadBooks}
            onMoveBook={onMoveBook}
          />
          <BookShelf
            title="Read"
            shelf="read"
            books={readBooks}
            onMoveBook={onMoveBook}
          />
        </div>
      </div>
      <AddBookLink />
    </div>
  );
}

BookListRoute.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default BookListRoute;
