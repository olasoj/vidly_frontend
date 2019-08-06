import React from 'react';

//import common comonent
import Like from '../common/Like';
import Table from '../common/Table';
import { Link } from 'react-router-dom';

import auth from '../services/authService';

const MoviesTable = ({
  paginatedMovies,
  onLike,
  onDelete,
  onSort,
  sortColumn
}) => {
  //for table headers and table body
  const columns = [
    {
      id: 1,
      label: 'title',
      path: 'title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
    },
    { id: 2, label: 'genre', path: 'genre.name' },
    { id: 3, label: 'stock', path: 'numberInStock' },
    { id: 4, label: 'rate', path: 'dailyRentalRate' },
    {
      id: 5,
      content: movie => (
        <Like onClick={() => onLike(movie._id)} liked={movie.liked} />
      )
    },
    {
      id: 6,
      content: auth.checkIfIsAdmin()
        ? movie => (
            <button
              className='btn btn-danger btn-sm'
              onClick={e => onDelete(movie._id)}
            >
              Delete
            </button>
          )
        : null
    }
  ];

  return (
    <Table
      data={paginatedMovies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
