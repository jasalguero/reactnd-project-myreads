import React from "react";
import BookShelfChanger from "./BookShelfChanger";

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
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks
                        .smallThumbnail}")`
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
                  {book.authors.map((author, index) =>
                    <span key={`author-${index + 1}`}>
                      {author} {index > book.authors.length && " ,"}
                    </span>
                  )}
                </div>
              </div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;