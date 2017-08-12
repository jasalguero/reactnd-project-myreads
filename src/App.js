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

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <BookListRoute books={this.state.books} />}
        />
        <Route path="/search" component={SearchRoute} />
      </div>
    );
  }
}

export default BooksApp;
