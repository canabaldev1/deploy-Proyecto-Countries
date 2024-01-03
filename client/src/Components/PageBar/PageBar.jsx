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

  const handleSelectPage = (event) => {
    const selectPage = Number(event.target.value);
    setPage(selectPage);
  };

  const handleNextPage = (event) => {
    setPage(page + 1);
  };
  const handlePrevPage = (event) => {
    setPage(page - 1);
  };

  return (
    <div className={styles.container}>
      {totalPages > 1 && page !== 1 && (
        <button onClick={handlePrevPage} className={styles.navButton}>
          Prev
        </button>
      )}
      {pages.map((p) => {
        return (
          <button
            key={`keypage${p}`}
            value={p}
            onClick={handleSelectPage}
            className={
              p === page ? styles.selectedPage : styles.notSelectedPage
            }
          >
            {p}
          </button>
        );
      })}
      {totalPages > 1 && page !== totalPages && (
        <button onClick={handleNextPage} className={styles.navButton}>
          Next
        </button>
      )}
    </div>
  );
}

export default PageBar;
