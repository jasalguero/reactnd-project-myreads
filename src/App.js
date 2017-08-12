import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookListRoute from "./routes/BookList";
import SearchRoute from "./routes/Search";

class BooksApp extends React.Component {
  state = {
    books: []
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
   */
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedBook => {
      // update the book shelf locally and the update the state
      const books = this.state.books;
      const bookIndex = books.findIndex(b => b.id === book.id);
      if (bookIndex > -1) {
        books[bookIndex].shelf = shelf;
        this.setState({ books });
      }
    });
  };

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
        <Route path="/search" component={SearchRoute} />
      </div>
    );
  }
}

export default BooksApp;
