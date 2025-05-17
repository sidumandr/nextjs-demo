"use client";
import styles from "../../page.module.css";
import newSurveyStyles from "./newSurvey.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSurvey } from "@/redux/surveySlice";
import { useRouter } from "next/navigation"; // isteğe bağlı yönlendirme için
import toast from "react-hot-toast";

export default function NewSurvey() {
  const dispatch = useDispatch();
  const router = useRouter(); // isteğe bağlı yönlendirme
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert("Başlık boş olamaz!");
    }

    const newSurvey = {
      id: Date.now(),
      title,
      description,
      createdBy: "admin",
      createdAt: new Date().toISOString(),
    };

    dispatch(addSurvey(newSurvey));
    toast.success("Anket Başarıyla Oluşturuldu.");
    setTitle("");
    setDescription("");
    router.push("/survey");
  };

  return (
    <div className={styles.page}>
      <div className={newSurveyStyles.wrapper}>
        <div className={newSurveyStyles.formContainer}>
          <h1>Yeni Anket Oluştur</h1>
          <form onSubmit={handleSubmit}>
            <div className={newSurveyStyles.formGroup}>
              <label htmlFor="title">Anket Başlığı:</label>
              <br />
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={newSurveyStyles.input}
              />
            </div>
            <div className={newSurveyStyles.formGroup}>
              <label htmlFor="description">Açıklama:</label>
              <br />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={newSurveyStyles.textarea}
              />
            </div>
            <button type="submit" className={newSurveyStyles.button}>
              Anketi Oluştur
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
