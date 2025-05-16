import styles from "../page.module.css";
import { surveys } from "./data";
import surveyStyles from "./survey.module.css";
import Link from "next/link";

export default function Survey() {
  return (
    <div className={`${styles.page} ${surveyStyles.surveyMain}`}>
      <h1>Anket Sayfası</h1>
      <ul>
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
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Anketi Görüntüle
            </Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}
