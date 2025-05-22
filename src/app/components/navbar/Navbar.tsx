import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hideGreeting, setHideGreeting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setShowGreeting(true);
      const fadeTimer = setTimeout(() => {
        setHideGreeting(true);
      }, 3000);

      const removeTimer = setTimeout(() => {
        setShowGreeting(false);
      }, 4000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [currentUser]);

  const handleLogut = () => {
    dispatch(logout());
    toast.success("Başarıyla Çıkış Yapıldı!");
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>
        Ana Sayfa
      </Link>
      <Link href="/about" className={styles.link}>
        Hakkımızda
      </Link>
      {currentUser?.role !== "admin" && (
        <Link href="/survey" className={styles.link}>
          Anketlerim
        </Link>
      )}
      {currentUser?.role === "admin" && (
        <Link href="/survey/newSurvey" className={styles.link}>
          Anket Oluştur
        </Link>
      )}

      {showGreeting && (
        <span
          className={`${styles.greeting} ${hideGreeting ? styles.hidden : ""}`}
        >
          Merhaba, {currentUser?.username}
        </span>
      )}

      {currentUser && (
        <button onClick={handleLogut} className={styles.logoutButton}>
          Çıkış Yap
        </button>
      )}
    </nav>
  );
};

export default Navbar;
