import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import conf from "../Config";
import { Client, IClient, ITokenObject } from "../Util/FormInit";
import { getUserInfoById, handleLogout } from "../API/authentication/authUtil";
import jwt_decode from "jwt-decode";

function Header() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState(false);
  const [userInfo, setUserInfo] = useState<IClient>(Client);
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [auth, setAuth] = useState<String>();
  const [results, setResults] = useState<any>();
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClick() {
    setResults(null);
    setSearch("");
    setMobileSearch(false);
  }

  async function getResults() {
    const req = await fetch(conf.API_URL + "/search?query=" + search);
    const res = await req.json();

    if (res.success) {
      setResults(res.results);
    } else {
      setResults(null);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      getResults();
    }
  }, [search]);

  useEffect(() => {
    fetchData();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      setAuth(token);
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (token) {
      setIsLogin(true);
      var decoded: ITokenObject = jwt_decode(token);
      const user = await getUserInfoById(decoded?.sub);
      if (user) {
        setUserInfo(user);
      } else {
        await handleLogout();
      }
    }
  };
  const onLogout = () => {
    handleLogout();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      navigate("/list_movie/" + search);
    }
  };

  return (
    <>
      <div className="top-bar">
        <Link to="/" className="top-bar-logo">
          <img className="" src="/logo2.png" alt={conf.SITE_NAME} />
        </Link>

        <div className="top-bar-search">
          <Link to="/">
            <h3 className="item-nav-margin">Home</h3>
          </Link>
          <Link to={"/list_movie"}>
            <h3 className="item-nav-margin">Movie</h3>
          </Link>
          <Link to={"/about_us"}>
            <h3 className="item-nav-margin">About Us</h3>
          </Link>
          <Link to={"/contact"}>
            <h3 className="item-nav-margin">Contact</h3>
          </Link>

          <div className="grid ">
            <input type="text" value={search} className="input-nav-margin" placeholder="Search" onChange={(e) => onChange(e)} onKeyDown={handleKeyDown} />
            <i className={`${"fa-solid fa-search "} ${isLogin ? "icon-nav-margin-with-auth" : "icon-nav-margin"}`}></i>
          </div>
          {auth ? (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center shadow-sm px-4 py-2 font-medium text-white outline-none "
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={(e) => setOpen(!isOpen)}
                >
                  {userInfo?.userName}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isOpen ? (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                // tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <Link to={"/profile/" + userInfo.userId} className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-300">
                      Profile
                    </Link>
                  </div>
                  <div className="py-1" role="none">
                    <Link to={"/profile/" + userInfo.userId} className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-300">
                      History
                    </Link>
                  </div>
                  <div className="py-1" role="none">
                    <button
                      type="submit"
                      className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-300"
                      role="menuitem"
                      // tabindex="-1"
                      id="menu-item-3"
                      onClick={(e) => {
                        onLogout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <button className="button-nav">
              <Link to={"/login"}>Sign In</Link>
            </button>
          )}
        </div>

        <div className="top-bar-mobile">
          <i className="fa-solid fa-search" onClick={() => setMobileSearch(true)}></i>
        </div>
      </div>

      {mobileSearch && (
        <div className="mobile-search">
          <div className="mobile-search-close" onClick={() => setMobileSearch(false)}>
            <i className="fa-solid fa-times"></i>
          </div>

          <div className="mobile-search-input">
            <input type="text" value={search} placeholder="Search" onChange={(e) => onChange(e)} />

            <i className="fa-solid fa-search"></i>
          </div>

          <div className="mobile-search-results">
            {search.length > 0 &&
              results &&
              results.map((result: any) => (
                <Link to={"/" + result.type + "/" + result.id} onClick={() => onClick()} className="mobile-search-item">
                  <i className="fa-solid fa-play-circle"></i>

                  <p className="title">{result.title}</p>

                  <div className="tag">
                    <p>{result.type}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
