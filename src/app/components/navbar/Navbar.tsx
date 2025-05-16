import Link from 'next/link';
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}> 
      <Link href="/" className={styles.link}>Ana Sayfa</Link>
      <Link href="/about" className={styles.link}>Hakkımızda</Link>
      <Link href="/survey" className={styles.link}>Anketlerim</Link>
      <Link href="/survey/newSurvey" className={styles.link}>Yeni Anket Oluştur</Link>
    </nav>
  );
};

export default Navbar;
