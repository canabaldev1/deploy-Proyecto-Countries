import React from "react";
import { useSelector } from "react-redux";
import styles from "./PageBar.module.css";

function PageBar({ setPage, page }) {
  const countriesToShow = useSelector((state) => state.countriesToShow);
  const length = 10;

  const totalPages = Math.ceil(countriesToShow.length / length);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (event) => {
    event.preventDefaul;
    const selectPage = Number(event.target.value);
    setPage(selectPage);
  };

  return (
    <div className={styles.container}>
      {pages.map((p) => {
        return (
          <button
            key={`keypage${p}`}
            value={p}
            onClick={handleClick}
            className={
              p === page ? styles.selectedPage : styles.notSelectedPage
            }
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

export default PageBar;
