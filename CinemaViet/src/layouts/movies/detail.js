import { Card } from "@mui/material";
import { getMoviesById } from "API/movies/movie";
import { URL } from "AppConstants";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { CustomListCast } from "layouts/utils/GetData";
import { CustomListCategory } from "layouts/utils/GetData";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const DetailMovie = () => {
  const movieId = useParams();
  const [movieInfo, setMovieInfo] = useState();
  const [castNames, setCastName] = useState([]);
  const [cateNames, setCateName] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const movie = await getMoviesById(movieId.movieId);
    const lstCurrentCate = CustomListCategory(movie.movieCate);
    const lstCurrentCast = CustomListCast(movie.casts);

    setCateName(lstCurrentCate);
    setCastName(lstCurrentCast);

    setMovieInfo(movie);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={2}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Title:</span>
                    <span className="uppercase text-base">{movieInfo?.titile}</span>
                  </div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Desciption:</span>
                    <span className="text-base">{movieInfo?.description}</span>
                  </div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Category:</span>
                    {cateNames.length > 0 &&
                      cateNames.map((item) => (
                        <div
                          data-te-chip-init
                          data-te-ripple-init
                          className="[word-wrap: break-word] mr-4 flex h-[26px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                          data-te-close="true"
                        >
                          {item.label}
                        </div>
                      ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex pt-3">
                      <span className="pr-3 text-base font-medium">Running Time:</span>
                      <span className="text-base">{movieInfo?.runningTime}</span>
                    </div>
                    <div className="flex pt-3">
                      <span className="pr-3 text-base font-medium">Release Date:</span>
                      <span className="text-base">{movieInfo?.releaseDate}</span>
                    </div>
                    <div className="flex pt-3">
                      <span className="pr-3 text-base font-medium">Hot:</span>
                      {movieInfo?.startNumber !== 1 ? (
                        <div
                        data-te-chip-init
                        data-te-ripple-init
                        className="[word-wrap: break-word] mr-4 flex h-[26px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                        data-te-close="true"
                      >
                        Normal
                      </div>
                      ) : (
                        <div
                          data-te-chip-init
                          data-te-ripple-init
                          className="[word-wrap: break-word] mr-4 flex h-[26px] cursor-pointer items-center justify-between rounded-[16px] bg-red-500 py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]"
                          data-te-close="true"
                        >
                          Hot
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Director:</span>
                    <span className="text-base">{movieInfo?.directorName}</span>
                  </div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Cast:</span>
                    {castNames.length > 0 &&
                      castNames.map((item) => (
                        <div className="break-words mr-4 flex h-[26px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]">
                          {item.label}
                        </div>
                      ))}
                  </div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Trailers:</span>
                    <iframe
                      className="w-full h-64"
                      id="video"
                      title="movie"
                      src={"https://www.youtube.com/embed/" + movieInfo?.trailer}
                    ></iframe>
                  </div>
                </div>
                <div>
                  <div className="flex pt-3">
                    <span className="pr-3 text-base font-medium">Thumnail:</span>
                    <img src={"http://localhost:8080" + movieInfo?.thumail} alt="img title" />
                  </div>
                </div>
              </div>
            </SoftBox>
            <SoftBox mt={4} mb={1} ml={2}>
              <Link to="/movies">
                <SoftButton variant="gradient" color="secondary">
                  Back to List
                </SoftButton>
              </Link>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default DetailMovie;
