import { assert } from "console";
import { surveys } from "../data";
import { notFound } from "next/navigation";

type SurveyProps = {
  params: {
    id: string;
  };
};

export default function SurveyDetail({ params }: SurveyProps) {
  const survey = surveys.find((s) => s.id === parseInt(params.id));

  if (!survey) return notFound();

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
    </div>
  );
}
