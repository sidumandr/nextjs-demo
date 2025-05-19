"use client";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={styles.page}>
        <Provider store={store}>
          <Navbar />
          <Provider store={store}>{children}</Provider>
          <Footer />
          <Toaster position="bottom-center" />
        </Provider>
      </body>
    </html>
  );
}
