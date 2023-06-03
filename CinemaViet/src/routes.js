/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import TablesUser from "layouts/member";
import TablesCategory from "layouts/category";
import Tables from "layouts/movies";
import TablesCast from "layouts/cast";
import TablesDirector from "layouts/director";
import TablesRoom from "layouts/room";
import TablesSeat from "layouts/seat";
import TableMovieDay from "layouts/movieDay";
import TableBookingDepot from "layouts/Booking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChair,
  faFilm,
  faHouseChimney,
  faMask,
  faTicket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import SpaceShip from "examples/Icons/SpaceShip";
import Cube from "examples/Icons/Cube";
import Basket from "examples/Icons/Basket";

const routes = [
  { type: "title", title: "Dashboard Pages", key: "dashboard-pages" },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  { type: "title", title: "Member Pages", key: "member-pages" },
  {
    type: "collapse",
    name: "Member",
    key: "member",
    route: "/member",
    icon: <CustomerSupport size="12px" />,
    component: <TablesUser />,
    noCollapse: true,
  },
  { type: "title", title: "Film Pages", key: "film-pages" },
  {
    type: "collapse",
    name: "Movies",
    key: "movies",
    route: "/movies",
    icon: <FontAwesomeIcon className="text-xs" icon={faFilm} />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    route: "/category",
    icon: <SpaceShip size="12px" />,
    component: <TablesCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Cast",
    key: "cast",
    route: "/cast",
    icon: <FontAwesomeIcon className="text-xs" icon={faMask} />,
    component: <TablesCast />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Director",
    key: "director",
    route: "/director",
    icon: <FontAwesomeIcon className="text-xs" icon={faUserSecret} />,
    component: <TablesDirector />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Room",
    key: "room",
    route: "/room",
    icon: <FontAwesomeIcon className="text-xs" icon={faHouseChimney} />,
    component: <TablesRoom />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Seat",
  //   key: "seat",
  //   route: "/seat",
  //   icon: <FontAwesomeIcon className="text-xs" icon={faChair} />,
  //   component: <TablesSeat />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Movie Day",
    key: "movieDay",
    route: "/movieDay",
    icon: <Office size="12px" />,
    component: <TableMovieDay />,
    noCollapse: true,
  },
  { type: "title", title: "Order Pages", key: "order-pages" },
  {
    type: "collapse",
    name: "Booking Depot",
    key: "bookings",
    route: "/bookings",
    icon: <FontAwesomeIcon className="text-xs" icon={faTicket} />,
    component: <TableBookingDepot />,
    noCollapse: true,
  },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },
];

export default routes;
