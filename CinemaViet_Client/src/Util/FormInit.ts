export interface IMovie {
  id: Number,
  titile: String,
  description: String,
  thumail: String,
  trailer: String,
  startNumber: Number,
  runningTime: String,
  releaseDate: string,
  rated: String,
  createById: string,
  createByName: String,
  createByEmail: String,
  movieCate: [],
  casts: [],
  directorId: Number,
  directorName: String,
  directorImage: String;
}

export interface IMovieDay {
  movieId: Number,
  movieDayId: Number,
  showDate: String,
  movieName: String,
  roomName: String,
  roomId: String,
  lstSubMovied: [
    {
      showDate: String,
      lstShowTime: [],
    }
  ],
}

export interface IMovieDayDetail {
  id: Number,
  movieRes: {
    id: Number,
  },
  roomId: Number,
  roomName: String,
  showDate: String,
  showTime: String,
}

export interface IBookingMovie {
  lstSeat: [],
  movieId: Number,
  movieDayId: Number,
  roomId: Number,
  seatId: Number,
  orderDate: String,
  discount: Number,
  status: Number,
  userId: String,
}

export interface ISeatedBooking {
  seatName: String,
}

export interface IClient {
  address: String,
  dateOfBirth: String,
  email: String,
  fullName: String,
  gender: Number,
  phoneNumber: String,
  roles: [{ roleId: Number, roleName: String }],
  userId: String,
  userName: String,
}

export const Client: IClient = {
  address: "",
  dateOfBirth: "",
  email: "",
  fullName: "",
  gender: 0,
  phoneNumber: "",
  roles: [{ roleId: 0, roleName: "" }],
  userId: "",
  userName: "",
}

export interface ITokenObject {
    sub: string,
    tokens: [],
    iss: String,
    exp: Number
}

export interface IHistoryBooking{
    bookingId: Number ,
    movieDayId: Number ,
    movieId: Number ,
    status: Number ,
    roomId: Number ,
    seatName: String ,
    roomName: String ,
    movieName: String ,
    userId: String ,
    userFullName: String ,
    email: String ,
    showDate: String ,
    showTime: String ,
    orderDate: String ,
}