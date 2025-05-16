"use client";
import styles from "../../page.module.css";
import newSurveyStyles from "./newSurvey.module.css";

import { useState } from "react";

export default function NewSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Anket Başlığı: ${title}\nAçıklama: ${description}`);
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
