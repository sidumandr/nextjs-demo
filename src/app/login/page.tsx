"use client";
import { useState } from "react";
import { login } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    //Mock user control

    if (username === "admin" && password === "91344") {
      dispatch(
        login({
          id: 1,
          username: "admin",
          role: "admin",
        })
      );
      router.push("/");
    } else if (username === "user" && password === "91344") {
      dispatch(
        login({
          id: 2,
          username: "user",
          role: "user",
        })
      );
      router.push("/");
    } else {
      alert("Kullanıcı adı veya şifre hatalı!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Giriş Yap</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}
