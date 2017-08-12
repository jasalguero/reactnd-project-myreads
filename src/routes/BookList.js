import React from "react";
import AddBookLink from "../components/AddBookLink";
import BookShelf from "../components/BookShelf";

/**
 * Stateles component that renders the different shelves
 * @param {*} props 
 */
function BookListRoute(props) {
  const currentReadingBooks = [];
  const wantToReadBooks = [];
  const readBooks = [];

  // get the books for each shelf
  props.books.forEach(b => {
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
            onMoveBook={props.onMoveBook}
          />
          <BookShelf
            title="Want To Read"
            shelf="wantToRead"
            books={wantToReadBooks}
            onMoveBook={props.onMoveBook}
          />
          <BookShelf
            title="Read"
            shelf="read"
            books={readBooks}
            onMoveBook={props.onMoveBook}
          />
        </div>
      </div>
      <AddBookLink />
    </div>
  );
}

export default BookListRoute;
