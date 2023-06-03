import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getListMovieById, getListMovieDayByMovieId } from "../API/movies/moviesUtil";
import { IMovie, IMovieDay } from "../Util/FormInit";
import { URL_IMAGE } from "../AppContains";
export default function MovieDay() {
  const { movieId } = useParams();

  const [movieDay, setMovieDay] = useState<IMovieDay[]>([]);
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data: IMovieDay[] = await getListMovieDayByMovieId(Number(movieId));
    const data2: IMovie = await getListMovieById(Number(movieId));
    if (data) {
      setMovieDay(data);
    }

    if (data2) {
      setMovie(data2);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <img className="" src={URL_IMAGE + movie?.thumail} />
            </div>
            <div className="">
              <p className="video-meta-desc">{movie?.description}</p>
              <div className="uppercase pt-3">
                RATING:
                <span className="video-meta-length capitalize">{movie?.rated}</span>
              </div>
              <div className="uppercase pt-3">
                Running time:
                <span className="video-meta-length lowercase">
                  {Math.floor(Number(movie?.runningTime) / 60)}h {Number(movie?.runningTime) % 60}m
                </span>
              </div>
              <div className="uppercase pt-3">
                RELEASED:
                <span className="video-meta-length">{movie?.releaseDate}</span>
              </div>
              <div className="uppercase pt-3 flex">
                <h3 className="mt-2">GENRE:</h3>
                {movie?.movieCate.map((cate: any) => (
                  <div key={cate.categoryId} className="video-meta-genre-cast">
                    <p>{cate.categoryName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5">
          <p>Show times:</p>
          {movieDay &&
            movieDay.map((item, index) => (
              <div key={index} className="video-meta">
                <p className="video-meta-title">{item.roomName}</p>
                {item?.lstSubMovied?.map((sub, i) => (
                  <div key={i}>
                    <p className="video-meta-title pl-10"></p>
                    <div className="video-meta-genres pl-12">
                      {sub.showDate}
                      {sub?.lstShowTime &&
                        sub?.lstShowTime?.map((itemSub: any, index) => (
                          <Link key={index} to={"/movie/booking/order/" + itemSub.movieDayId} className="ml-2">
                            <div className="video-meta-genre-show-time">
                              <p>{itemSub.showTime}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
