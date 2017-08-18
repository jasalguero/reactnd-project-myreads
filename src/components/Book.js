import React from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

function Book({ book, shelf, onMoveBook }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
          }}
        />
        <BookShelfChanger
          shelf={shelf}
          onMoveBook={newShelf => {
            onMoveBook(book, newShelf);
          }}
        />
      </div>
      <div className="book-title">
        {book.title}
      </div>
      <div className="book-authors">
        {book.authors ? book.authors.join(", ") : ""}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default Book;
