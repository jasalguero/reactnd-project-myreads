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

  render() {
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
            {this.props.books.map(book =>
              <li key={book.id}>
                <Book book={book} shelf="none" onMoveBook={this.props.onMoveBook} />
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
