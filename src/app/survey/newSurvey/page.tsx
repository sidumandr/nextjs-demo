"use client";
import styles from "../../page.module.css";
import newSurveyStyles from "./newSurvey.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey } from "@/redux/surveySlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";

export default function NewSurvey() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  // Şimdilik örnek kullanıcılar (backend'den alınacak)
  const dummyUsers = [
    { id: 1, name: "Ahmet Yılmaz" },
    { id: 2, name: "Zeynep Demir" },
    { id: 3, name: "Mehmet Kaya" },
  ];

  useEffect(() => {
    if (currentUser === null) return;
    if (currentUser.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [currentUser, router]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const toggleUser = (userId: number) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Başlık boş olamaz!");
    }

    if (selectedUserIds.length === 0) {
      return toast.error("Lütfen en az bir kullanıcı seçin!");
    }

    const newSurvey = {
      id: Date.now(),
      title,
      description,
      questions,
      users: selectedUserIds,
      createdBy: "admin",
      createdAt: new Date().toISOString(),
    };

    dispatch(addSurvey(newSurvey));
    toast.success("Anket başarıyla oluşturuldu.");
    setTitle("");
    setDescription("");
    setQuestions([""]);
    setSelectedUserIds([]);
    router.push("/survey");
  };

  return (
    <div className={newSurveyStyles.wrapper}>
      <div className={newSurveyStyles.formContainer}>
        <h1>Yeni Anket Oluştur</h1>
        <form onSubmit={handleSubmit} className={newSurveyStyles.form}>
          {/* Anket Başlığı */}
          <div className={newSurveyStyles.formGroup}>
            <label htmlFor="title" className={newSurveyStyles.label}>
              Anket Başlığı:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={newSurveyStyles.input}
            />
          </div>

          {/* Açıklama */}
          <div className={newSurveyStyles.formGroup}>
            <label htmlFor="description" className={newSurveyStyles.label}>
              Açıklama:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className={newSurveyStyles.textarea}
            />
          </div>

          {/* Dinamik Sorular */}
          <div className={newSurveyStyles.questionsContainer}>
            <label className={newSurveyStyles.label}>Sorular:</label>
            {questions.map((question, index) => (
              <div key={index} className={newSurveyStyles.questionRow}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className={newSurveyStyles.input}
                  placeholder={`Soru ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className={newSurveyStyles.removeButton}
                >
                  Sil
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className={newSurveyStyles.addButton}
            >
              + Soru Ekle
            </button>
          </div>

          {/* Kullanıcı Seçimi */}
          <div className={newSurveyStyles.formGroup}>
            <label className={newSurveyStyles.label}>Kime Gönderilecek:</label>
            <div className={newSurveyStyles.usersContainer}>
              {dummyUsers.map((user) => (
                <label key={user.id} className={newSurveyStyles.userCheckbox}>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                  {user.name}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className={newSurveyStyles.button}>
            Anketi Oluştur
          </button>
        </form>
      </div>
    </div>
  );
}
