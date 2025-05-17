// src/app/survey/[id]/page.tsx
"use client";

import styles from "@/app/survey/[id]/detail.module.css";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function SurveyDetail() {
  const { id } = useParams<{ id: string }>();
  const survey = useSelector((state: RootState) =>
    state.surveys.list.find((s) => s.id === Number(id))
  );

  if (!survey) {
    return <div>Anket bulunamadı.</div>;
  }

  return (
    <div className={styles.detailMain}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <p>
        <strong>Hazırlayan:</strong> {survey.createdBy}
      </p>
      <p>
        <strong>Oluşturulma Tarihi:</strong>{" "}
        {new Date(survey.createdAt).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {survey.answeredBy && survey.answeredAt ? (
        <>
          <p>
            <strong>Yanıtlayan:</strong> {survey.answeredBy}
          </p>
          <p>
            <strong>Yanıt Tarihi:</strong>{" "}
            {new Date(survey.answeredAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </>
      ) : (
        <p style={{ fontStyle: "italic", color: "#999" }}>
          Bu anket henüz yanıtlanmamış.
        </p>
      )}
    </div>
  );
}
