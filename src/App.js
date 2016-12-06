import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import MovieList from './MovieList';
import SearchBar from './SearchBar';


class App extends Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
      userInput: '',
      movieList: []
    };
  }

  componentDidMount() {
    // Check local storage to see if we have anything previously saved.
    const savedMovieList = JSON.parse(localStorage.getItem('movieList'));

    // If we found any movies we want to update our state
    if (savedMovieList) {
      this.setState({
        ...this.state,
        movieList: savedMovieList
      });
    }
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      movieList: this.state.movieList,
      searchText: event.target.value
    });
  }

  getFilteredmovieList() {
    // Remove any white space, and convert the searchText to lowercase
    const term = this.state.searchText.trim().toLowerCase();
    const movieList = this.state.movieList;

    // If our term is an empty string, we want to return all of the movieList
    if (!term) {
      return movieList;
    }

    // Filter will return a new array of movieList, the movieList will
    // be included in the array if the function returns true,
    // and excluded if the function returns false
    return movieList.filter(movie => {
      return movie.title.toLowerCase().search(term) >= 0;
    });
  }

  handleAddItem(e) {
    // combine the current userInput with the current userInputList
    const userInput = {"title": this.state.title, "genre": this.state.genre, "year": this.state.year,
                       "rating": this.state.rating, "actors": this.state.actors};
    const movieList = [userInput, ...this.state.movieList];

    // Set our state
    this.setState({
      userInput: '',
      movieList: movieList
    });

    // set our userInputList in local storage using JSON.stringify
    localStorage.setItem('movieList', JSON.stringify(movieList));
    e.preventDefault();
  }

  handleTitleChange(e) {
     this.setState({title: e.target.value});
  }
  handleGenreChange(e) {
     this.setState({genre: e.target.value});
  }
  handleYearChange(e) {
     this.setState({year: e.target.value});
  }
  handleRatingChange(e) {
     this.setState({rating: e.target.value});
  }
  handleActorsChange(e) {
     this.setState({actors: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="col-md-4">
          <form onSubmit={this.handleAddItem.bind(this)} name="movie_input" className="movie_input">
              <p>Title:</p>
                <input onChange={this.handleTitleChange.bind(this)} name="tile" type="text" className="title_input" required />
              <p>Genre:</p>
                <input onChange={this.handleGenreChange.bind(this)} name="genre" type="text" className="genre_input" required />
              <p>Year:</p>
                <input onChange={this.handleYearChange.bind(this)} name="year" type="text" className="year_input" required />
              <p>Actors:</p>
                <input onChange={this.handleActorsChange.bind(this)} name="actors" type="text" className="actors_input" required />
              <p>Rotten Tomatoes Rating:</p>
                <input onChange={this.handleRatingChange.bind(this)} name="rating" type="text" className="rating_input" maxLength="2" required />
                <input type="submit" value="Add Movie" className="button"/>
            </form>
          </div>
          <div className="col-md-8">
              <div className="thumbnail">
                  <img src="movie_banner.jpg" className="img-responsive" alt="movie banner" />
                  <div className="caption-full">
                      <h3>React Movie Database</h3>
                      <span>Search: </span><SearchBar value={this.state.searchText} onChange={this.handleChange.bind(this)}/>
                  </div>
              </div>
            <div>
              <MovieList movies={this.getFilteredmovieList()} />
            </div>
          </div>
        </div>
      );
  }
}

export default App;