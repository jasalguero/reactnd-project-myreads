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
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
          }}
        />
        <BookShelfChanger
          shelf={shelf}
          onChangeShelf={newShelf => {
            onMoveBook(book, newShelf);
          }}
        />
      </div>
      <div className="book-title">
        {book.title}
      </div>
      <div className="book-authors">
        {book.authors &&
          book.authors.map((author, index) =>
            <span key={`author-${index + 1}`}>
              {author}
              {index + 1 < book.authors.length && ", "}
            </span>
          )}
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
