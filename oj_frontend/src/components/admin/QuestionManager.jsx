// src/components/QuestionManager.js
import React, { useState, useEffect } from "react";
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
  useGetQuestionQuery,
} from "../../redux/slices/apiSlice";
import { useParams, useNavigate } from "react-router-dom";

const QuestionManager = () => {
  const navigate = useNavigate();
  const { quesId } = useParams();

  const [addQuestion] = useAddQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const {
    data: questions,
    error,
    isLoading,
    refetch,
  } = useGetAllQuestionQuery();

  const { data: question, isLoading: isQuestionLoading } = useGetQuestionQuery(
    quesId,
    { skip: !quesId }
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    constraints: "",
    topic: "",
    initialCode: "",
    boilerPlate: "",
    testCase: [{ input: "", output: "" }],
  });

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const testCases = [...formData.testCase];
    testCases[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      testCase: testCases,
    }));
  };

  const handleAddTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCase: [...prev.testCase, { input: "", output: "" }],
    }));
  };

  const handleRemoveTestCase = (index) => {
    setFormData((prev) => ({
      ...prev,
      testCase: prev.testCase.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (quesId) {
        await updateQuestion({ quesId, ...formData }).unwrap();
      } else {
        await addQuestion(formData).unwrap();
      }
      // Reset form or provide feedback to user
      setFormData({
        title: "",
        description: "",
        difficulty: "Easy",
        constraints: "",
        topic: "",
        initialCode: "",
        boilerPlate: "",
        testCase: [{ input: "", output: "" }],
      });
      refetch();
    } catch (error) {
      console.error("Failed to save the question: ", error);
    }
  };

  const handleDelete = async (quesId) => {
    try {
      await deleteQuestion(quesId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete the question: ", error);
    }
  };

  if (isLoading) return <div>Loading questions...</div>;
  if (isQuestionLoading) return <div>Loading question details...</div>;
  if (error) return <div>Error loading questions</div>;

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 my-4">
        {quesId ? "Update Question" : "Add Question"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Difficulty
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Constraints
          </label>
          <input
            type="text"
            name="constraints"
            value={formData.constraints}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Initial Code
          </label>
          <textarea
            name="initialCode"
            value={formData.initialCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Boiler Plate
          </label>
          <textarea
            name="boilerPlate"
            value={formData.boilerPlate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Test Cases
          </label>
          {formData.testCase.map((testCase, index) => (
            <div key={index} className="mb-4 border p-4 rounded-md">
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  Input
                </label>
                <input
                  type="text"
                  name="input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  Output
                </label>
                <input
                  type="text"
                  name="output"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveTestCase(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
              >
                Remove Test Case
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            Add Test Case
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {quesId ? "Update" : "Submit"}
        </button>
      </form>
      {!questions ? (
        "Loading..."
      ) : questions.questions.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 my-4">
            Questions List
          </h1>

          <ul>
            {questions.questions.map((question) => (
              <li
                key={question._id}
                className="mb-4 p-4 border rounded-md shadow-sm"
              >
                <h2 className="text-xl font-semibold">{question.title}</h2>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => navigate(`/admin/update/question/${question._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(question._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default QuestionManager;
