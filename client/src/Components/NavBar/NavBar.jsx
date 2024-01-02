import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoSimple from "../../assets/logo_simple.svg";
import style from "./NavBar.module.css";

function NavBar() {
  const [menuTogleShown, setMenuTogleShown] = useState(true);
  const [menuTogle, setMenuTogle] = useState(style.navList);

  const handleShowMenu = (event) => {
    if (menuTogleShown) {
      setMenuTogleShown(false);
      setMenuTogle(`${style.navList} ${style.menuOpen}`);
    } else {
      setMenuTogleShown(true);
      setMenuTogle(`${style.navList}`);
    }
  };
  return (
    <div className={style.container}>
      <Link to="/">
        <img className={style.logo} src={logoSimple} alt="Logo" />
      </Link>

      <ul className={menuTogle}>
        <li>
          <Link className={style.link} to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className={style.link} to="/activity">
            Activities
          </Link>
        </li>
        <li>
          <Link className={style.link} to="/activity/create">
            Create Activity
          </Link>
        </li>
      </ul>
      <p onClick={handleShowMenu} className={style.menuTogle}>
        menu
      </p>
    </div>
  );
}

export default NavBar;
