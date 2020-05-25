import React from "react";

import Poster from "../Poster/Poster";
import HeadingGroup from "../HeadingGroup/HeadingGroup";
import VoteBox from "../VoteBox/VoteBox";
import "./Summary.css";

function Summary({ data, type }) {
  const getGenres = () => {
    const { genres } = data;
    return Array.isArray(genres) && genres.length > 0
      ? genres.map((genre) => genre.name).join(", ")
      : "No genres";
  };

  const getYear = () => {
    const { release_date } = data;
    return release_date ? release_date.slice(0, 4) : "No year";
  };

  const getMovieJSX = () => {
    return (
      <div className="Summary-grid">
        <div className="Summary-side">
          <Poster posterPath={data.poster_path} title={data.title} />
        </div>
        <div className="Summary-main">
          <HeadingGroup heading={data.title} subheading={getGenres()} />
          <VoteBox
            voteAverage={data.vote_average}
            voteCount={data.vote_count}
          />
          {data.tagline && (
            <div className="Summary-tagline">{`"${data.tagline}"`}</div>
          )}
          <p className="Summary-body">
            {data.overview ? data.overview : "No overview"}
          </p>
        </div>
      </div>
    );
  };

  const getTVJSX = () => {
    return (
      <div className="Summary-grid">
        <div className="Summary-side">
          <Poster posterPath={data.poster_path} title={data.name} />
        </div>
        <div className="Summary-main">
          <HeadingGroup heading={data.name} subheading={getGenres()} />
          <VoteBox
            voteAverage={data.vote_average}
            voteCount={data.vote_count}
          />
          <p className="Summary-body">
            {data.overview ? data.overview : "No overview"}
          </p>
        </div>
      </div>
    );
  };

  const getPersonJSX = () => {
    return (
      <div className="Summary-grid">
        <div className="Summary-side">
          <Poster posterPath={data.profile_path} alt={data.name} />
        </div>
        <div className="Summary-main">
          <HeadingGroup heading={data.name} subheading={getGenres()} />
          <p className="Summary-body">{data.bio ? data.bio : "No biography"}</p>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    switch (type) {
      case "movie":
        return getMovieJSX();
      case "tv":
        return getTVJSX();
      case "person":
        return getPersonJSX();
      default:
        console.log("renderSummary type not found!");
    }
  };

  return <div className="Summary">{renderSummary()}</div>;
}

export default Summary;
