"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateSurvey } from "@/redux/surveySlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditSurvey() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const router = useRouter();

  const survey = useSelector((state: RootState) =>
    state.surveys.list.find((s) => s.id === Number(id))
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (survey) {
      setTitle(survey.title);
      setDescription(survey.description);
    }
  }, [survey]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return alert("Başlık boş olamaz!");
    if (!survey) {
      return <div>Anket Bulunamadı.</div>;
    }

    dispatch(
      updateSurvey({
        id: survey.id,
        title,
        description,
        createdBy: survey.createdBy,
        createdAt: survey.createdAt,
        answeredBy: survey.answeredBy,
        answeredAt: survey.answeredAt,
      })
    );
    router.push("/survey");
    toast.success("Anket Güncellendi");
  };

  if (!survey) return <div>Anket bulunamadı</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Anketi Düzenle</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Başlık:</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Açıklama:</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}
