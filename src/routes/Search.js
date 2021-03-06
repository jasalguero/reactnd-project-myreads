import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as Functions from "../utils/functions";

class SearchRoute extends Component {
  state = {
    query: ""
  };

  /**
   * Debounced function that is only called every 250ms at most
   */
  triggerSearch = Functions.debounce(query => {
    this.props.onSearch(query);
  }, 250);

  updateQuery(query) {
    this.setState({ query: query.trim() });
    this.triggerSearch(query);
  }

  /**
   * Return the array with the result of books after matching them with the existing ones
   */
  getBooks() {
    // clone the array so the component doesn't modify props
    let books = this.props.results.slice();
    books.forEach(b => {
      const foundBook = this.props.books.find(book => book.id === b.id);
      b.shelf = foundBook ? foundBook.shelf : "none";
    });

    return books;
  }

  render() {
    const books = this.getBooks();

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={book.shelf}
                  onMoveBook={this.props.onMoveBook}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

SearchRoute.propTypes = {
  onSearch: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default SearchRoute;
