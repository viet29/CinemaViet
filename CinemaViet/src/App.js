import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CreateUser from "layouts/member/create";
import EditUser from "layouts/member/edit";
import CreateCategory from "layouts/category/create";
import UpdateCategory from "layouts/category/update";
import Createnew from "layouts/movies/create";
import EditMovie from "layouts/movies/edit";
import DetailMovie from "layouts/movies/detail";
import CreateCast from "layouts/cast/create";
import UpdateCast from "layouts/cast/edit";
import DetailCast from "layouts/cast/detail";
import CreateDirector from "layouts/director/create";
import UpdateDirector from "layouts/director/edit";
import CreateRoom from "layouts/room/create";
import UpdateRoom from "layouts/room/edit";
import UpdateSeat from "layouts/seat/edit";
import CreateSeat from "layouts/seat/create";
import CreateMovieDay from "layouts/movieDay/create";
import DetailDirector from "layouts/director/detail";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="CinemaViet"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        {layout === "vr"}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="CinemaViet"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        {layout === "vr"}

        <Routes>
          {getRoutes(routes)}
          {/* authentication */}
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          <Route path="/authentication/sign-in" element={<SignIn />} />
          <Route path="/authentication/sign-up" element={<SignUp />} />
          {/* movies */}
          <Route path="/movies/create" element={<Createnew />} />
          <Route path="/movies/edit/:movieId" element={<EditMovie />} />
          <Route path="/movies/detail/:movieId" element={<DetailMovie />} />
          {/* member */}
          <Route path="/member/create" element={<CreateUser />} />
          <Route path="/member/edit/:userId" element={<EditUser />} />
          {/* category */}
          <Route path="/category/create" element={<CreateCategory />} />
          <Route path="/category/edit/:cateId" element={<UpdateCategory />} />
          {/* cast */}
          <Route path="/cast/create" element={<CreateCast />} />
          <Route path="/cast/edit/:castId" element={<UpdateCast />} />
          <Route path="/cast/detail/:castId" element={<DetailCast />} />
          {/* director */}
          <Route path="/director/create" element={<CreateDirector />} />
          <Route path="/director/edit/:directorId" element={<UpdateDirector />} />         
          <Route path="/director/detail/:directorId" element={<DetailDirector />} />
          {/* room */}
          <Route path="/room/create" element={<CreateRoom />} />
          <Route path="/room/edit/:roomId" element={<UpdateRoom />} />
          {/* seat */}
          <Route path="/seat/create" element={<CreateSeat />} />
          <Route path="/seat/edit/:seatId" element={<UpdateSeat />} />
          {/* movie_day */}
          <Route path="/movie_day/create" element={<CreateMovieDay />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
