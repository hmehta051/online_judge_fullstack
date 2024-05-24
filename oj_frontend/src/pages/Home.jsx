import React, { useEffect } from 'react';
import { QuestionsRender } from '../components/users/QuestionsRender';
import { useGetAllQuestionQuery } from '../redux/slices/apiSlice'; 

const Home = () => {
  const { data, error, isLoading, fetch } = useGetAllQuestionQuery(); // Destructure query data

  if (isLoading) return <div>Loading questions...</div>; // Display loading indicator

  if (error) return <div>Error fetching questions: {error.message}</div>; // Handle errors gracefully

  return (
    <div>
      <QuestionsRender questions={data} /> {/* Pass fetched data to QuestionsRender */}
    </div>
  );
};

export default Home;
