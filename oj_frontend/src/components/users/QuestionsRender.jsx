import React from "react";
import { useNavigate } from "react-router-dom";

export const QuestionsRender = ({ questions }) => {
  const questionsData = questions.questions;
  const navigate = useNavigate();
  return (
    <>
      {questionsData.map((question) => (
        <div onClick={()=>navigate(`/question/${question._id}`)} className="flex flex-col border rounded shadow-md p-4 mb-4" key={question._id}> {/* Base structure with Tailwind classes */}
          <div className="font-bold text-lg mb-2">{question.title}</div> {/* Title styling */}
          <div className="flex items-center text-sm"> {/* Difficulty and topic container */}
            <span className="mr-2 font-medium">Difficulty:</span>
            <span className="badge bg-blue-500 text-white px-2 py-1 rounded">{question.difficulty}</span> {/* Difficulty badge */}
            <span className="ml-2 font-medium">Topic:</span>
            <span className="text-gray-600">{question.topic}</span>
          </div>
        </div>
      ))}
    </>
  );
};
