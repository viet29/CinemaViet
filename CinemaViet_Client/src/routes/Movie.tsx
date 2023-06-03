import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import conf from "../Config";
import CardSection from "../components/CardSection";
import Loading from "../views/Loading";
import { IMovie } from "../Util/FormInit";
import { getListMovieById } from "../API/movies/moviesUtil";
import { URL_IMAGE } from "../AppContains";

function Movie() {
  const { id } = useParams();
  const [data, setData] = useState<IMovie>();
  const [auth, setAuth] = useState<String>();

  async function getMovie() {
    const req = await getListMovieById(Number(id));
    console.log(req);
    if (req) {
      setData(req);
    }
  }

  useEffect(() => {
    getMovie();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      setAuth(token);
    }
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <Helmet>
        <title>{data.titile + " - " + data.releaseDate}</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="video-frame">
          <iframe src={"https://www.youtube.com/embed/" + data?.trailer}></iframe>
        </div>

        <div className="video-meta">
          <p className="video-meta-title">{data.titile}</p>
          <div className="video-meta-row">
            <p className="video-meta-year">
              {data.startNumber === 1 ? (
                <i className="fa-solid fa-star hot"></i>
              ) : (
                <i className="fa-solid fa-star normal"></i>
              )}
            </p>
            <p className="video-meta-year">{data.releaseDate}</p>
            <p className="video-meta-length">
              {Math.floor(Number(data.runningTime) / 60)}h {Number(data.runningTime) % 60}m
            </p>
          </div>
          <h3 className="video-meta-desc">Author : {data.directorName}</h3>
          <h3 className="video-meta-desc">Rated : {data.rated}</h3>

          <div className="video-meta-genres">
            <h3 className="video-meta-desc ml-1">Cast: </h3>
            {data.casts.map((cast: any) => (
              <div key={cast.castId} className="video-meta-genre-cast">
                <p>{cast.castName}</p>
              </div>
            ))}
          </div>
          <p className="video-meta-desc">{data.description}</p>
          <div className="grid grid-cols-2 ">
            <div>
              {auth ? (
                <Link to={"/movie/booking/time/" + data.id}>
                  <div>
                    <button className="movie-hero-play">
                      <i className="fa-solid fa-ticket"></i>
                      <p>Buy Ticket</p>
                    </button>
                  </div>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <div>
                    <button className="movie-hero-play">
                      <i className="fa-solid fa-ticket"></i>
                      <p>Buy Ticket</p>
                    </button>
                  </div>
                </Link>
              )}
            </div>
            <div>
              <div className="video-meta-share justify-end">
                <FacebookShareButton
                  url={location.href}
                  quote={`Watch ${data.titile} - ${data.releaseDate} for free at ${location.href}`}
                  className="video-meta-button"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={location.href}
                  title={`Watch ${data.titile} - ${data.releaseDate} for free at`}
                  className="video-meta-button"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <TelegramShareButton
                  url={location.href}
                  title={`Watch ${data.titile} - ${data.releaseDate} for free at ${location.href}`}
                  className="video-meta-button"
                >
                  <TelegramIcon size={40} round />
                </TelegramShareButton>
              </div>
              <div className="video-meta-genres justify-end">
                {data.movieCate.map((cate: any) => (
                  <div key={cate.categoryId} className="video-meta-genre">
                    <p>{cate.categoryName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-container">
            {data.directorImage && (
              <div>
                <img className="" src={URL_IMAGE + data.directorImage} />
                <p className="video-meta-genre-cast-text">{data.directorName}</p>
              </div>
            )}
            {data.casts.map((cast: any) => {
              if (cast.image) {
                return (
                  <div key={cast.castId}>
                    {cast?.image && (
                      <div>
                        <img className="" src={URL_IMAGE + cast.image} />
                        <p className="video-meta-genre-cast-text">{cast.castName}</p>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* <CardSection title="Recommended Movies 👍" items={data.recommendations} /> */}
      </div>
    </div>
  );
}

export default Movie;
