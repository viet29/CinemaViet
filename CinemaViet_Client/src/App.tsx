import { Routes, Route } from "react-router-dom";

import Footer from "./views/Footer";
import Header from "./views/Header";

import Home from "./routes/Home";
import Movie from "./routes/Movie";
import E404 from "./routes/E404";
import Booking from "./routes/Booking";
import MovieDay from "./routes/MovieDay";
import Contact from "./routes/Contact";
import AboutUs from "./routes/AboutUs";
import SignIn from "./routes/authentication/Sign-in";
import SignUp from "./routes/authentication/Sign-up";
import { useEffect, useState } from "react";
import Profile from "./routes/Profile";
import LstMovie from "./routes/ListMovie";

function App() {
  const [auth, setAuth] = useState<String>();

  useEffect(() => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      setAuth(token);
    }
  }, []);


  return (
    <>
      {auth ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/movie/:id" element={<Movie />} />

            <Route path="/movie/booking/time/:movieId" element={<MovieDay />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/about_us" element={<AboutUs />} />

            <Route path="/movie/booking/order/:movieId" element={<Booking />} />

            <Route path="/profile/:userId" element={<Profile />} />

            <Route path="/list_movie" element={<LstMovie />} />

            <Route path="*" element={<E404 />} />

            <Route path="/list_movie/:text" element={<LstMovie />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
          {window.location.pathname != "/login" && window.location.pathname != "/register" ? (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about_us" element={<AboutUs />} />
                <Route path="/list_movie" element={<LstMovie />} />
                <Route path="/list_movie/:text" element={<LstMovie />} />
              </Routes>
              <Footer />
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default App;
