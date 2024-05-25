import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetQuestionQuery } from "../../redux/slices/apiSlice";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';


const SingleQuestion = () => {
    const { quesId } = useParams();
    const { data: question, error, isLoading } = useGetQuestionQuery(quesId);
    const [value, setValue] = useState("console.log('hello world!');");
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    const handleLanguageChange = useCallback((e) => {
        const selectedLanguage = e.target.value;
        setSelectedLanguage(selectedLanguage);
        resetCodeMirror();
    }, []);

    const resetCodeMirror = () => {
        setValue(initialCode[selectedLanguage] || '');
    };

    const initialCode = {
        javascript: "console.log('hello world!');",
        java: "public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println('Hello, World!');\n\t}\n}",
        python: "print('Hello, World!')",
        cpp: "#include <iostream>\n\nint main() {\n\tstd::cout << 'Hello, World!' << std::endl;\n\treturn 0;\n}",
        nodejs: "console.log('hello world!');"
    };

    useEffect(() => {
        resetCodeMirror();
    }, [question, selectedLanguage]);

    let languageExtension;
    switch (selectedLanguage) {
        case 'javascript':
            languageExtension = javascript({ jsx: true });
            break;
        case 'java':
            languageExtension = java();
            break;
        case 'python':
            languageExtension = python();
            break;
        case 'cpp':
            languageExtension = cpp();
            break;
        default:
            languageExtension = javascript({ jsx: true }); // Default to JavaScript
    }

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
            <div className="text-2xl">Question: {question.question.title}</div>
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
                <div className="text-xl">Description</div>
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

            <div className="flex items-center mb-4">
                <label htmlFor="language" className="mr-2 text-gray-700">Select Language:</label>
                <select id="language" value={selectedLanguage} onChange={handleLanguageChange} className="bg-gray-100 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                </select>
            </div>

            <div className="border-2 border-black">
                <CodeMirror value={value} height="500px" extensions={[languageExtension]} onChange={onChange} />
                <div className="w-full p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-center gap-4">

                        <textarea placeholder="Input"
                            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>

                        <textarea placeholder="Output"
                            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"></textarea>
                    </div>

                    <div className="flex justify-center items-center my-4">
                        <div className="flex space-x-4">

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                Run
                            </button>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleQuestion;
