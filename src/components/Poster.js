import React, { Component } from "react";
import "../css/Poster.css";

class Poster extends Component {
  render() {
    const { title, poster_path } = this.props;
    return (
      <div className="Poster">
        {poster_path && title ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="Poster-img"
          />
        ) : (
          <div className="Poster-error">
            <p className="Poster-error-text">No image available</p>
          </div>
        )}
      </div>
    );
  }
}

export default Poster;
