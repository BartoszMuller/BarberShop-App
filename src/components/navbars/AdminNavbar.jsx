import styles from "./navbar.module.scss";
import Link from "next/link";
import OptionsBar from "./OptionsBar";

const AdminNavbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="/admin">Terminarz</Link>
        <Link href="/admin/dni-pracy">Dni pracy</Link>
        <Link href="/admin/godziny-wolne">Godziny wolne</Link>
        <Link href="/admin/tresci">Treści strony</Link>
        <Link href="/admin/uslugi">Usługi</Link>
        <Link href="/admin/uzytkownicy">Użytkownicy</Link>
      </div>

      <OptionsBar />
    </div>
  );
};
export default AdminNavbar;
