import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookListRoute from "./routes/BookList";
import SearchRoute from "./routes/Search";

class BooksApp extends React.Component {
  state = {
    books: [], // existing books
    searchBooks: [] // books matching searh
  };

  /**
   * Retrieve all the books in the shelfs
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  /**
   * Call the API to update the book's shelf and the update the state
   * @param {*} book 
   * @param {*} shelf 
   */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedBook => {
      if (shelf === "none") {
        this.removeBookFromShelf(book, shelf);
      } else {
        this.moveBook(book, shelf);
      }
    });
  };

  /**
   * Move book to another shelf
   * @param {*} book 
   * @param {*} shelf 
   */
  moveBook(book, shelf) {
    const books = this.state.books;
    const bookIndex = books.findIndex(b => b.id === book.id);

    // book exists
    if (bookIndex > -1) {
      books[bookIndex].shelf = shelf;
      this.setState({ books });
    } else {
      book.shelf = shelf;
      this.setState({ books: this.state.books.concat([book]) });
    }
  }

  /**
   * Remove book from the shelf
   * @param {*} book 
   */
  removeBookFromShelf(book) {
    this.setState({ books: this.state.books.filter(b => b.id !== book.id) });
  }

  /**
   * Perform a search on the query passed and updates the state 
   * @param {*} query 
   */
  searchBooks = query => {
    if (query) {
      BooksAPI.search(query, 100).then(result => {
        const books = result.length > 0 ? result : [];
        // mark the searched books with the corresponding shelves
        books.forEach(b => {
          const foundBook = this.state.books.find(book => book.id === b.id);
          b.shelf = foundBook ? foundBook.shelf : "none";
        });

        this.updateSearchBooks(books);
      });
    } else {
      this.updateSearchBooks([]);
    }
  };

  /**
   * Updates the state with new search books
   * @param {*} books 
   */
  updateSearchBooks(books) {
    this.setState({ searchBooks: books });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BookListRoute
              books={this.state.books}
              onMoveBook={this.updateBook}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchRoute
              books={this.state.searchBooks}
              onSearch={this.searchBooks}
              onMoveBook={this.updateBook}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
