import { Card } from "@mui/material";
import { getUserInfoById } from "API/authentitication/auth";
import { listCast } from "API/cast/cast";
import { ListCategory } from "API/category/category";
import { listDirector } from "API/director/director";
import { UploadFileImage } from "API/movie/movie";
import { saveMovies } from "API/movies/movie";
import { getMoviesById } from "API/movies/movie";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { CustomListCast } from "layouts/utils/GetData";
import { CustomListCategory } from "layouts/utils/GetData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import ReactSelect from "./react-select";
import jwt_decode from "jwt-decode";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const EditMovie = () => {
  const { handleSubmit } = useForm();
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});
  const [lstCategory, setListCategory] = useState([]);
  const [lstDirector, setLstDirector] = useState([]);
  const [lstCast, setLstCast] = useState([]);
  const [videoID, setVideoID] = useState();
  const [listCate, setListCate] = useState([]);
  const [currentCate, setCurrentCate] = useState([]);
  const [currentCast, setCurrentCast] = useState([]);
  const [casts, setCasts] = useState([]);
  const [currentFileName, setCurrentFileName] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await ListCategory();
    const listDir = await listDirector();
    const castList = await listCast();
    const currentData = await getMoviesById(movieId);
    const customList = CustomListCategory(list);
    const lstCurrentCate = CustomListCategory(currentData.movieCate);
    const customListCast = CustomListCast(castList);
    const lstCurrentCast = CustomListCast(currentData.casts);
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    const user = await getUserInfoById(decoded.sub);
    if (user) {
      setUserInfo(user);
    }
    // console.log(currentData);
    setCurrentMovie(currentData);
    setCurrentCast(lstCurrentCast);
    setCurrentCate(lstCurrentCate);
    setListCategory(customList);
    setLstDirector(listDir);
    setLstCast(customListCast);
  };

  const onChangeCategory = (selectedOptions) => {
    setListCate(selectedOptions);
  };

  const onChangeCast = (selectedOptions) => {
    setCasts(selectedOptions);
  };

  const handleChange = (e) => {
    setVideoID(e.target.value.substring(e.target.value.search("=") + 1, e.target.value.length));
  };

  const handleOnchangeFile = async (e) => {
    const form_data = new FormData();
    const files = e.target.files;

    form_data.append("file", files[0]);
    const fileName = await UploadFileImage(form_data);

    setCurrentFileName(fileName);
  };

  const onSubmit = () => {
    var movieUpdate = {
      id: currentMovie.id,
      titile: currentMovie.titile,
      description: currentMovie.description,
      thumail: currentFileName != null ? currentFileName : currentMovie.thumail,
      trailer: videoID != null ? videoID : currentMovie.trailer,
      casts: casts.length > 0 ? casts : currentCast,
      movieCate: listCate.length > 0 ? listCate : currentCate,
      startNumber: currentMovie.startNumber,
      runningTime: currentMovie.runningTime,
      releaseDate: currentMovie.releaseDate,
      rated: currentMovie.rated,
      createById: userInfo.userId,
      directorId: currentMovie.directorId,
    };

    saveMovies(movieUpdate);
  };

  return (
    <div>
      {currentMovie && currentCast.length > 0 && currentCate.length > 0 && (
        <DashboardLayout>
          <DashboardNavbar />
          <SoftBox py={3}>
            <SoftBox mb={3}>
              <Card>
                <SoftBox onSubmit={handleSubmit(onSubmit)} component="form" role="form" p={2}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Title
                          </SoftTypography>
                        </SoftBox>

                        <input
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                          type={"text"}
                          value={currentMovie.titile}
                          onChange={(e) =>
                            setCurrentMovie({ ...currentMovie, titile: e.target.value })
                          }
                          required
                        />
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Desciption
                          </SoftTypography>
                        </SoftBox>
                        <input
                          type={"description"}
                          value={currentMovie.description ?? ""}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                          onChange={(e) =>
                            setCurrentMovie({ ...currentMovie, description: e.target.value })
                          }
                          required
                        />
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Thumnail
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput id="thumail" type="file" onChange={handleOnchangeFile} />
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Trailers
                          </SoftTypography>
                          <input
                            type="text"
                            onChange={handleChange}
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                            id="trailers"
                            placeholder="Link youtube"
                          />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Rated
                          </SoftTypography>
                          <input
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                            id="rated"
                            placeholder="Rated"
                            value={currentMovie.rated}
                            onChange={(e) =>
                              setCurrentMovie({ ...currentMovie, rated: e.target.value })
                            }
                            required
                          />
                        </SoftBox>
                      </SoftBox>
                    </div>
                    <div>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Director
                          </SoftTypography>
                        </SoftBox>
                        <select
                          id="director"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                          classNamePrefix="select"
                          value={currentMovie.directorId}
                          required
                        >
                          <option value={""}>Select</option>
                          {lstDirector.length > 0 &&
                            lstDirector.map((d) => (
                              <option key={d.directorId} value={d.directorId}>
                                {d.directorName}
                              </option>
                            ))}
                        </select>
                      </SoftBox>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Category
                          </SoftTypography>
                        </SoftBox>

                        <ReactSelect
                          options={lstCategory}
                          defaultValue={currentCate}
                          handleOnChange={onChangeCategory}
                        />
                      </SoftBox>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                              <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Hot
                              </SoftTypography>
                            </SoftBox>
                            <select
                              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                              value={currentMovie.startNumber}
                              onChange={(e) =>
                                setCurrentMovie({ ...currentMovie, startNumber: e.target.value })
                              }
                              required
                            >
                              <option value="">Select...</option>
                              <option value="1">Hot</option>
                              <option value="0">Normal</option>
                            </select>
                          </SoftBox>
                        </div>
                        <div>
                          <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                              <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Cast
                              </SoftTypography>
                            </SoftBox>
                            <ReactSelect
                              options={lstCast}
                              defaultValue={currentCast}
                              handleOnChange={onChangeCast}
                            />
                          </SoftBox>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                              <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Running Time
                              </SoftTypography>
                            </SoftBox>
                            <input
                              type={"text"}
                              value={currentMovie.runningTime ?? ""}
                              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                              onChange={(e) =>
                                setCurrentMovie({ ...currentMovie, runningTime: e.target.value })
                              }
                              required
                            />
                          </SoftBox>
                        </div>
                        <div>
                          <SoftBox mb={2}>
                            <SoftBox mb={1} ml={0.5}>
                              <SoftTypography component="label" variant="caption" fontWeight="bold">
                                Release Date
                              </SoftTypography>
                            </SoftBox>
                            <input
                              type="date"
                              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 "
                              value={currentMovie?.releaseDate}
                              onChange={(date) =>
                                setCurrentMovie({ ...currentMovie, releaseDate: date.target.value })
                              }
                              required
                            />
                          </SoftBox>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SoftBox mt={4} mb={1}>
                    <SoftButton type="submit" variant="gradient" color="info">
                      Update
                    </SoftButton>
                    <Link to="/movies" className="ml-4">
                      <SoftButton variant="gradient" color="secondary">
                        Back to List
                      </SoftButton>
                    </Link>
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
          <Footer />
        </DashboardLayout>
      )}
    </div>
  );
};

export default EditMovie;
