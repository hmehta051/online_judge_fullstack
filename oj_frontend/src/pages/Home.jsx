import React from 'react';
import { QuestionsRender } from '../components/users/QuestionsRender';
import { useGetAllQuestionQuery } from '../redux/slices/apiSlice';

const Home = () => {
  const { data, error, isLoading } = useGetAllQuestionQuery(); // Destructure query data

  if (isLoading) return <div>Loading questions...</div>; // Display loading indicator

  if (error) return <div>Error fetching questions: {error.message}</div>; // Handle errors gracefully

  return (
    <QuestionsRender questions={data} />
  );
};

export default Home;
