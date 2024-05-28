import React from 'react';
import { QuestionsRender } from '../components/users/QuestionsRender';
import { useGetAllQuestionQuery, useGetSolutionsQuery } from '../redux/slices/apiSlice';

const Home = () => {
  const { data, error, isLoading } = useGetAllQuestionQuery(); // Destructure query data
  const {
    data: solutionsData,
  } = useGetSolutionsQuery();


  if (isLoading) return <div>Loading questions...</div>; // Display loading indicator

  if (error) return <div>Error fetching questions: {error.message}</div>; // Handle errors gracefully

  return (
    <>
      {
        data.questions.map((question) => {
          return <QuestionsRender key={question._id} question={question} solutionsData={solutionsData} />
        })
      }
    </>
  );
};

export default Home;
