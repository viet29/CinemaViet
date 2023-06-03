import { useEffect, useState } from "react";
import { editUser, getUserInfoById, handleLogout } from "../API/authentication/authUtil";
import { ITokenObject } from "../Util/FormInit";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { VALIDATIONEMAIL } from "../AppContains";
import TableHistoryOrder from "./HistoryOrder";

function Profile() {
  const [username, setUsername] = useState<any>("");
  const [fullName, setFullName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [gender, setGender] = useState<any>();
  const [userId, setUserId] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationEmail = {
    ...register("email", {
      required: true,
      pattern: VALIDATIONEMAIL,
    }),
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      var decoded: ITokenObject = jwt_decode(token);
      const user = await getUserInfoById(decoded?.sub);
      if (user) {
        setUsername(user.userName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);
        setGender(user.gender);
        setFullName(user.fullName);
        setUserId(user.userId);
      }
    }else{
      await handleLogout();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (data: any) => {
    data.username = username;
    data.userId = userId;
    console.log(data);
    editUser(data);
  };

  return (
    <div className="container max-auto">
      <div className="flex justify-center pt-4">
        <h3 className="uppercase text-xl ">Dashboard</h3>
      </div>
      <div className="pt-4">
        <div className="grid grid-cols-2">
          <div className="">
            <img
              className=" w-1/2 rounded-full"
              src="https://i.pinimg.com/originals/f5/2d/9e/f52d9e5db510110be8831566fac88cb2.gif"
              alt="Rounded avatar"
            />
          </div>
          <div className="">
            <div className="flex justify-center pb-2">
              <span className="">Card number</span>
            </div>
            <div className="flex justify-center">
              <img
                src="https://www.barcodesinc.com/generator/image.php?code=9992219994611054&style=196&type=C128B&width=220&height=80&xres=1&font=3"
                alt="card number"
              />
            </div>
          </div>
        </div>
        <div className="pt-1">
          <p className="font-bold">
            Hi <span className="capitalize">{fullName},</span>
          </p>
          <p className="text-gray-400">
            From this dashboard, you can have an overview of your account and update any information
            easily.
          </p>
        </div>
        <div className="pt-4">
          <h3 className=" text-xl font-bold  border-b-4 border-red-500">Account Information</h3>
          <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Username</label>
                  <input
                    type="text"
                    id="userName"
                    value={username}
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
                    placeholder="name@flowbite.com"
                    required
                    {...validationEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    placeholder="Full Name"
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    required
                    {...register("fullName", { required: true })}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    required
                    {...register("phoneNumber", { required: true })}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    required
                    placeholder="Address"
                    {...register("address", { required: true })}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <label className="block text-sm font-medium pr-2">Gender</label>
                  <select
                    className="bg-[#242424] w-full border border-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    {...register("gender", { required: true })}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>

          <TableHistoryOrder userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
