import Link from "next/link";
import styles from "./navbar.module.css";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>
        Ana Sayfa
      </Link>
      <Link href="/about" className={styles.link}>
        Hakkımızda
      </Link>
      <Link href="/survey" className={styles.link}>
        Anketlerim
      </Link>
      {currentUser?.role === "admin" && (
        <Link href="/survey/newSurvey" className={styles.link}>
          Anket Oluştur
        </Link>
      )}
      {currentUser && (
        <span className={styles.user}>Merhaba, {currentUser.username}</span>
      )}
    </nav>
  );
};

export default Navbar;
