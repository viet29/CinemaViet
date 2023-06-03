import { Card, FormHelperText } from "@mui/material";
import { getUserInfoById } from "API/authentitication/auth";
import { listCast } from "API/cast/cast";
import { ListCategory } from "API/category/category";
import { listDirector } from "API/director/director";
import { UploadFileImage } from "API/movie/movie";
import { saveMovies } from "API/movies/movie";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { CustomListCast } from "layouts/utils/GetData";
import { CustomListCategory } from "layouts/utils/GetData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const { default: Footer } = require("examples/Footer");
const { default: DashboardLayout } = require("examples/LayoutContainers/DashboardLayout");
const { default: DashboardNavbar } = require("examples/Navbars/DashboardNavbar");

const Createnew = () => {
  const [lstCategory, setListCategory] = useState([]);
  const [lstDirector, setLstDirector] = useState([]);
  const [lstCast, setLstCast] = useState([]);
  const [videoID, setVideoID] = useState();
  const [listCate, setListCate] = useState([]);
  const [listcast, setListCast] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [currentFileName, setCurrentFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.thumail = currentFileName;
    data.trailer = videoID;
    data.casts = listcast;
    data.movieCate = listCate;
    data.createById = userInfo.userId;
    saveMovies(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await ListCategory();
    const customList = CustomListCategory(list);
    setListCategory(customList);

    const listDir = await listDirector();
    setLstDirector(listDir);

    const castList = await listCast();
    const customlistCast = CustomListCast(castList);
    setLstCast(customlistCast);

    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    var decoded = jwt_decode(token);

    const user = await getUserInfoById(decoded.sub);
    if (user) {
      setUserInfo(user);
    }
  };

  const onChangeCategory = (selectedOptions) => {
    setListCate(selectedOptions);
    console.log(selectedOptions);
  };

  const onChangeCast = (selectedOptions) => {
    setListCast(selectedOptions);
    console.log(selectedOptions);
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

  return (
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
                    <SoftInput
                      id="titile"
                      placeholder="Title"
                      {...register("titile", { required: true })}
                    />
                    {errors.titile && (
                      <FormHelperText error id="component-error-text">
                        Title is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Desciption
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      id="description"
                      placeholder="Desciption"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <FormHelperText error id="component-error-text">
                        Desciption is required
                      </FormHelperText>
                    )}
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
                        id="trailer"
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
                        {...register("rated", { required: true })}
                      />
                      {errors.rated && (
                        <FormHelperText error id="component-error-text">
                          Rated is required
                        </FormHelperText>
                      )}
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
                      id="directorId"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                      classNamePrefix="select"
                      {...register("directorId", { required: true })}
                    >
                      <option value={""}>Select</option>
                      {lstDirector.length > 0 &&
                        lstDirector.map((d) => (
                          <option key={d.directorId} value={d.directorId}>
                            {d.directorName}
                          </option>
                        ))}
                    </select>
                    {errors.director && (
                      <FormHelperText error id="component-error-text">
                        Director is required
                      </FormHelperText>
                    )}
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Category
                      </SoftTypography>
                    </SoftBox>
                    <Select
                      className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full "
                      isMulti
                      name="category"
                      options={lstCategory}
                      classNamePrefix="select"
                      onChange={onChangeCategory}
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
                          {...register("hot")}
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
                        <Select
                          className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full"
                          name="cast"
                          isMulti
                          options={lstCast}
                          classNamePrefix="select"
                          onChange={onChangeCast}
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
                        <SoftInput
                          id="runningTime"
                          placeholder="Running Time"
                          {...register("runningTime", { required: true })}
                        />
                        {errors.runningTime && (
                          <FormHelperText error id="component-error-text">
                            Running Time is required
                          </FormHelperText>
                        )}
                      </SoftBox>
                    </div>
                    <div>
                      <SoftBox mb={2}>
                        <SoftBox mb={1} ml={0.5}>
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Release Date
                          </SoftTypography>
                        </SoftBox>
                        <SoftInput type="date" id="releaseDate" {...register("releaseDate")} />
                      </SoftBox>
                    </div>
                  </div>
                </div>
              </div>
              <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="info">
                  Create
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
  );
};

export default Createnew;
