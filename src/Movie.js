import React, {Component, PropTypes } from 'react';
import preventDefault from 'react-prevent-default';
import ToggleDisplay from 'react-toggle-display';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      key: this.props.id,
      title: this.props.title,
      genre: this.props.genre,
      year: this.props.year,
      actors: this.props.actors,
      rating: this.props.rating,
      edit_movie: false
    };
  }

   handleDisplayEditForm(e) {
     this.setState({edit_movie: true});
   }

   handleUpdateMovie(props){
    this.setState({edit_movie: false});
    this.props.updateMovieList(this.state);
   }

   handleDeleteClick(props) {
     this.props.deleteMovie(this.state);
   }

   handleEditChange(stateName, e) {
      this.setState({[stateName]: e.target.value});
   }

   render(){
      return (
        <div className="row" id={this.state.id}>
          <ol className="col-lg-12 movie_div">
            <img src="del.jpg" className="delete_img" onClick={preventDefault(this.handleDeleteClick.bind(this))} />

            <ToggleDisplay hide={this.state.edit_movie}>
              <span className="item">{this.state.title}</span>
              <span className="item">{this.state.genre}</span>
              <span className="item">{this.state.year}</span>
              <span className="item">{this.state.rating + '%'}</span>
              <span className="item">{this.state.actors}</span>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.edit_movie}>
              <form name="car_edit" className="car_edit" onSubmit={preventDefault(this.handleUpdateMovie.bind(this))}>
                <input name="movie title" type="text" id="make_edit" value={this.state.title} onChange={this.handleEditChange.bind(this,'title')} required />
                <input name="movie genre" type="text" id="make_edit" value={this.state.genre} onChange={this.handleEditChange.bind(this,'genre')} required />
                <input name="movie year" type="text" id="year_edit" value={this.state.year} onChange={this.handleEditChange.bind(this,'year')} maxLength="4" required />
                <input name="movie rating" type="text" id="year_edit" value={this.state.rating} onChange={this.handleEditChange.bind(this,'rating')} maxLength="2" required />
                <input name="movie actors" type="text" id="make_edit" value={this.state.actors} onChange={this.handleEditChange.bind(this,'actors')} required />
                <input type="submit" value="update" className="button" id="update_submit" />
              </form>
            </ToggleDisplay>

            <a href="#" onClick={this.handleDisplayEditForm.bind(this)} className="editLink">update</a>
            <hr />
          </ol>
        </div>
      );
   }
}

Movie.PropTypes = {
  updateMovieList: React.PropTypes.func.isRequired,
  deleteMovie: React.PropTypes.func.isRequired
};

export default Movie;
