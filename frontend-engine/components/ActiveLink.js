import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={styles.card}>
      {children}
    </a>
  );
}

export default ActiveLink;
