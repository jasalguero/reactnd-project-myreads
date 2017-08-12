import React from "react";

/**
 * Stateless component to handle changing a book's shelf
 * @param {*} param0 
 */
function BookShelfChanger({ shelf, onChangeShelf }) {
  return (
    <div className="book-shelf-changer">
      <select
        value={shelf}
        onChange={event => {
          onChangeShelf(event.target.value);
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

export default BookShelfChanger;
