import React from "react";
import { useNavigate } from "react-router-dom";

export const QuestionsRender = ({ question, solutionsData }) => {
  const navigate = useNavigate();

  // Filter solutionsData for the current question
  const filteredSolutions = solutionsData ? solutionsData.filter((data) => data.questionId === question._id) : [];

  // Check if any submission is accepted
  const isAccepted = filteredSolutions.some((data) => data.submitted);

  return (
    <>
      <div onClick={() => navigate(`/question/${question._id}`)} className="flex flex-col border rounded shadow-md p-4 mb-4" key={question._id}>
        <div className="font-bold text-lg mb-2">
          {question.title}
          {isAccepted && (
            <span className="bg-green-100 text-green-800 text-xs font-medium ms-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Accepted
            </span>
          )}
        </div>
        <div className="flex items-center text-sm">
          <span className="mr-2 font-medium">Difficulty:</span>
          <span className="badge bg-blue-500 text-white px-2 py-1 rounded">{question.difficulty}</span>
          <span className="ml-2 font-medium">Topic:</span>
          <span className="text-gray-600">{question.topic}</span>
        </div>
      </div>
    </>
  );
};
