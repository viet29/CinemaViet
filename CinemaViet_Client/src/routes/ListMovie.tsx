import React, { useEffect, useState } from "react";
import { getListMovie } from "../API/movies/moviesUtil";
import CardSection from "../components/CardSection";
import { IMovie } from "../Util/FormInit";
import { SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import { URL_IMAGE } from "../AppContains";
import { Helmet } from "react-helmet";
import conf from "../Config";

export default function LstMovie(props: any) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [allMovies, setAllMovies] = useState<IMovie[]>([]);

  const { text } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const name: String = text != undefined ? text.toLocaleLowerCase() : "";
    const dataFilter: IMovie[] = allMovies.filter((x) =>
      x.titile.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
    setMovies(dataFilter);
  }, [text]);

  const fetchData = async () => {
    const movieData: IMovie[] = await getListMovie();

    if (movieData) {
      if (text) {
        const dataFilter: IMovie[] = movieData.filter((x) =>
          x.titile.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );
        setMovies(dataFilter);
      } else {
        setMovies(movieData);
      }
      setAllMovies(movieData);
    }
  };

  return (
    <>
      <Helmet>
        <title>Movies - {conf.SITE_NAME}</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="ml-10 mr-10 pt-5">
          {text && (
            <div className="justify-center">
              Search Movie By : <span className="italic ">{text}</span>
            </div>
          )}
          {!movies ? (
            <div className="movie-section">
              <p className="movie-section-title">List Movie 👑</p>

              <div className="movie-section-loading">
                <i className="fa-solid fa-spinner-third"></i>
              </div>
            </div>
          ) : (
            // <CardSection title="Now Showing 👑" items={movies} />
            <div className="grid grid-cols-6 gap-4 pt-5">
              {movies &&
                movies.map((item: any) => (
                  <div key={item.id}>
                    <SwiperSlide key={item.id}>
                      <Link
                        to={`/movie/${item.id}`}
                        className="movie-card"
                        style={{
                          background: `url(${URL_IMAGE + item.thumail}) no-repeat center / cover `,
                        }}
                      >
                        <div className="movie-card-content">
                          <i className="fa-solid fa-ticket"></i>
                          <p>{item.titile}</p>
                          <p>{item.releaseDate}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
