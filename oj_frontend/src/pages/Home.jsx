import React from "react";
import { QuestionsRender } from "../components/users/QuestionsRender";
import {
  useGetAllQuestionQuery,
  useGetSolutionsQuery,
} from "../redux/slices/apiSlice";

const Home = () => {
  const { data, error, isLoading } = useGetAllQuestionQuery();
  const { data: solutionsData } = useGetSolutionsQuery();

  if (isLoading) return <div>Loading questions...</div>; 

  if (error) return <div>Error fetching questions: {error.message}</div>;

  return (
    <>
      {data.questions.map((question) => {
        return (
          <QuestionsRender
            key={question._id}
            question={question}
            solutionsData={solutionsData}
          />
        );
      })}
    </>
  );
};

export default Home;
