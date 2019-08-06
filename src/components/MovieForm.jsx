import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import Form from '../common/Form';
import { getGenres } from '../services/genres';
import { getMovie, saveMovie } from '../services/movies';

class MovieForm extends Form {
  constructor() {
    super();
    this.state = {
      data: { title: '', dailyRentalRate: '', numberInStock: '', genreId: '' },
      errors: { title: '', genreId: '', dailyRentalRate: '' },
      genres: [],
      movies: []
    };
  }

  populateGenres = async () => {
    const getGenre = await getGenres();
    this.setState({ genres: getGenre });
  };

  populateMovies = async () => {
    const { history, match } = this.props;
    try {
      const movieId = match.params.id;
      if (movieId === 'new') return;
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie.data) });
    } catch (err) {
      if (err.response && err.response.status === 404)
        return history.replace('/not-found');
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  schema = {
    title: Joi.string()
      .required()
      .label('Title'),
    genres: Joi.array(),
    genreId: Joi.required(),

    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label('Rate'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in Stock'),
    _id: Joi.optional()
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput('Title', 'title')}
          {this.renderSelect()}
          {this.renderInput('Rate', 'dailyRentalRate')}
          {this.renderInput('Number in Stock', 'numberInStock')}
          {this.renderButton('Save')}
        </form>
      </Fragment>
    );
  }
}

export default MovieForm;
