import styles from "./Error404.module.css";
import NavBar from "../../Components/NavBar/NavBar";

function Error404(params) {
  return (
    <div className={styles.container}>
      <NavBar />
      <h1>PAGE NOT FOUND</h1>
    </div>
  );
}

export default Error404;
