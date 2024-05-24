import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuestionQuery } from "../../redux/slices/apiSlice";

export const SingleQuestion = () => {
    const { quesId } = useParams();
    const { data: question, error, isLoading, fetch } = useGetQuestionQuery(quesId); // Destructure query data for specific question (quesId)
    //   useEffect(() => {
    //     fetch(); // Fetch question data on component mount
    //   }, [fetch, quesId]); // Add fetch and quesId as dependencies


    if (isLoading) {
        return <div className="loading text-center text-gray-600">Loading question...</div>;
    }

    if (error) {
        return (
            <div className="error text-center text-red-500">
                Error fetching question: {error.message}
            </div>
        );
    }

    if (!question) {
        return <div className="not-found text-center text-gray-600">Question not found.</div>;
    }

    return (
        <div className="question-container container mx-auto px-4 py-8">
            <h2>{question.question.title}</h2>
            <div className="details flex items-center justify-between mb-4">
                <div>
                    <span className="label text-gray-600 text-sm font-medium">Difficulty:</span>
                    <span className="ml-2 text-gray-700">{question.question.difficulty}</span>
                </div>
                <div>
                    <span className="label text-gray-600 text-sm font-medium">Topic:</span>
                    <span className="ml-2 text-gray-700">{question.question.topic}</span>
                </div>
            </div>
            <div className="description mb-4">
                <p>{question.question.description}</p>
                <p className="constraints text-gray-600 mt-2">
                    <strong>Constraints:</strong> {question.question.constraints}
                </p>
            </div>
            <div className="test-cases">
                <h3>Test Cases</h3>
                {question.question.testCase.map((testCase) => (
                    <div className="test-case border border-gray-200 rounded p-4 mb-4" key={testCase.input}>
                        <div className="input flex items-center mb-2">
                            <span className="text-gray-600 text-sm font-medium mr-2">Input:</span>
                            <pre className="break-words overflow-auto">{testCase.input}</pre>
                        </div>
                        <div className="output flex items-center">
                            <span className="text-gray-600 text-sm font-medium mr-2">Output:</span>
                            <pre className="break-words overflow-auto">{testCase.output}</pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleQuestion;