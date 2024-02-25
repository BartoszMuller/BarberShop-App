import styles from "./navbar.module.scss";
import Link from "next/link";
import OptionsBar from "./OptionsBar";

const UserNavbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link className={styles.current} href="/panel">
          Terminarz
        </Link>
        <Link href="/panel/moje-konto">Moje konto</Link>
      </div>

      <OptionsBar />
    </div>
  );
};
export default UserNavbar;
