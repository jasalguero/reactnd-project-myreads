import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookListRoute from "./routes/BookList";
import SearchRoute from "./routes/Search";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
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
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedBook => {
      // update the book shelf locally and the update the state
      const books = this.state.books;
      const bookIndex = books.findIndex(b => b.id === book.id);
      console.log('updating book', bookIndex);
      if (bookIndex > -1) {
        books[bookIndex].shelf = shelf;
        this.setState({ books });
      }
    });
  };

  /**
   * Perform a search on the query passed and updates the state 
   * @param {*} query 
   */
  searchBooks = query => {
    if (query) {
      BooksAPI.search(query, 100).then(result => {
        const books = result.length > 0 ? result : [];
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
              onMoveBook={this.moveBook}
            />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchRoute
              books={this.state.searchBooks}
              onSearch={this.searchBooks}
              onMoveBook={this.moveBook}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
