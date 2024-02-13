import React from 'react';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';

const View = ({ books, deleteBook }) => {
  return (
    <>
      {books.map((book) => (
        <tr key={book.isbn}>
          <td>{book.isbn}</td>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td className="delete-btn" onClick={() => deleteBook(book.isbn)}>
            <Icon icon={trash} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default View;
