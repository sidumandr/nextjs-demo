"use client";
import styles from "../page.module.css";
import surveyStyles from "./survey.module.css";
import Link from "next/link";
import { useSelector } from "react-redux"; // küçük harfle olmalı!
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deleteSurvey } from "@/redux/surveySlice";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import confirmStyles from "@/app/confirm/confirm.module.css";
import { useRouter } from "next/router";

export default function Survey() {
  // Redux store'dan anket listesini çekiyoruz
  const surveys = useSelector((state: RootState) => state.surveys.list);
  const dispatch = useDispatch();

  const handleDelete = (id: number, title: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={confirmStyles.modalContainer}>
            <h1 className={confirmStyles.title}>Sil</h1>
            <p className={confirmStyles.message}>
              "{title}" anketini silmek istediğinize emin misiniz?
            </p>
            <button
              className={`${confirmStyles.button} ${confirmStyles.buttonDelete}`}
              onClick={() => {
                dispatch(deleteSurvey(id));
                toast.success("Anket Başarıyla Silindi!");
                onClose();
              }}
            >
              Sil
            </button>
            <button
              className={`${styles.button} ${styles.buttonCancel}`}
              onClick={onClose}
            >
              İptal
            </button>
          </div>
        );
      },
      overlayClassName: confirmStyles.customOverlay,
    });
  };

  return (
    <div className={`${styles.page} ${surveyStyles.surveyMain}`}>
      <h1>Anket Sayfası</h1>
      <ul>
        {surveys.length === 0 && <p>Henüz anket yok.</p>}
        {surveys.map((survey) => (
          <li
            key={survey.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: 8,
            }}
          >
            <h2>{survey.title}</h2>
            <p>{survey.description}</p>
            <Link
              href={`/survey/${survey.id}`}
              style={{
                color: "blue",
                textDecoration: "underline",
                marginRight: "1rem",
              }}
            >
              Anket Durumunu Görüntüle
            </Link>
            <Link
              href={`survey/edit/${survey.id}`}
              style={{ color: "yellow", textDecoration: "underline" }}
            >
              Düzenle
            </Link>
            <button onClick={() => handleDelete(survey.id, survey.title)}>
              Anketi Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
