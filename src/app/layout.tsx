"use client";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/register"].includes(pathname);

  return (
    <html lang="tr">
      <body className={styles.page}>
        <Provider store={store}>
          {!hideLayout && <Navbar />}
          <Provider store={store}>{children}</Provider>
          <Footer />
          <Toaster position="bottom-center" />
        </Provider>
      </body>
    </html>
  );
}
