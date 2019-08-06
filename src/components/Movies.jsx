import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//component
import MoviesTable from './MoviesTable';
//External data
import { getGenres } from '../services/genres';
import { getMovies, deleteMovie } from '../services/movies';

//common components
import Pagination from '../common/Pagination';
import ListGroup from '../common/ListGroup';
// utils
import { paginate } from '../utils/paginate';
import Search from '../common/Search';

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      page: 1,
      selectedGenre: '',
      foundBySearch: '',
      sortColumn: { path: 'title', order: 'asc' }
    };
  }

  async componentDidMount() {
    try {
      const getGenre = await getGenres();
      const getMovie = await getMovies();
      this.setState({
        movies: getMovie,
        genres: [{ name: 'All genres' }, ...getGenre]
      });
    } catch (err) {
      this.setState({
        movies: [],
        genres: []
      });
    }
  }

  getPageData = () => {
    const { movies, selectedGenre, foundBySearch, sortColumn } = this.state;

    //if movies found exists and is lower than all the movies
    if (Array.isArray(foundBySearch) && foundBySearch.length < movies.length) {
      // console.log('s');
      return { totalMovies: foundBySearch.length, data: foundBySearch };
    } else {
      //filter by genre
      //if selectGenre._id exist filter the movie by genre._id else return movies
      const filteredMovies = selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

      //sorting the filtered movies, either by titile etc
      const sortedMovies = _.orderBy(
        filteredMovies,
        [sortColumn.path],
        [sortColumn.order]
      );
      return { totalMovies: sortedMovies.length, data: sortedMovies };
    }
  };

  //deletes a movie
  deleteAMovie = async id => {
    //clone the movies
    console.log(id);
    const originalMovies = [...this.state.movies];
    const movies = originalMovies.filter(m => m._id !== id);

    this.setState({ movies: [...movies] });

    try {
      await deleteMovie(id);
    } catch (err) {
      if (err.response && err.response.status === 400)
        toast.error('Movie not found');

      this.setState({ movies: originalMovies });
    }
  };

  //Like a movies
  handleLike = id => {
    //clone the movies
    const movies = [...this.state.movies];
    //find the movie in the array
    const movie = movies.find(m => m._id === id);
    //remove the movie
    movie.liked ? (movie.liked = false) : (movie.liked = true);

    this.setState({ movies: [...movies] });
  };

  //change page
  handlePageChange = page => {
    //chnage the current page , pagination
    this.setState({ page: page });
  };

  //sort the movies by genre
  handleGenreSelect = genre => {
    //store the selected genre
    //this used for filtering movies above
    this.setState({ page: 1, selectedGenre: genre });
  };

  //sort movies by header(title, genre, ... )
  handleSortMovie = sortColumn => {
    this.setState({ sortColumn });
  };

  //Method that handles search
  handleSearch = ({ target }) => {
    //create a regular expression for the search
    let regex = new RegExp('^' + target.value, 'i');
    //find the movies corresponding to the search input
    let movies = this.state.movies.filter(movie =>
      regex.test(movie.title) ? movie : undefined
    );
    //set the data in pagination state
    this.setState({
      page: 1,
      foundBySearch: movies.length > 0 ? [...movies] : ''
    });
  };

  render() {
    const { genres, pageSize, page, selectedGenre, sortColumn } = this.state;
    const { user } = this.props;

    const { totalMovies, data } = this.getPageData();
    //paginate movies
    const paginatedMovies = paginate(data, page, pageSize);

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className='col'>
          {user && (
            <Link className='btn-primary btn m-2' to='/movies/new'>
              New Movie
            </Link>
          )}
          <p>There are {totalMovies} movie(s) avaliable</p>

          <Search onSearch={this.handleSearch} />

          <MoviesTable
            paginatedMovies={paginatedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.deleteAMovie}
            onSort={this.handleSortMovie}
          />
          <Pagination
            noOfMovies={totalMovies}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
