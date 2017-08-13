import React from "react";
import PropTypes from "prop-types";

/**
 * Stateless component to handle changing a book's shelf 
 */
function BookShelfChanger({ shelf, onMoveBook }) {
  return (
    <div className="book-shelf-changer">
      <select
        value={shelf}
        onChange={event => {
          onMoveBook(event.target.value);
        }}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default BookShelfChanger;
