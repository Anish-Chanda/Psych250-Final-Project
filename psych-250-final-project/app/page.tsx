"use client";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Sidebar from "./components/Sidebar";

enum Category {
  Communication = "Communication",
  Hiring = "Hiring",
  Leadership = "Leadership",
  Motivation = "Motivation",
  OrganizationalCulture = "OrganizationalCulture",
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState({
    Hiring: 0,
    Leadership: 0,
    Motivation: 0,
    OrganizationalCulture: 0,
    Communication: 0,
  });

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
      category: Category.Communication,
    },
    {
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
      correctAnswer: "Tokyo",
      category: Category.Communication,
    },
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "New Delhi",
      category: Category.Leadership,
    },
  ];

  const handleAnswer = (answer: string) => {
    if (currentQuestion === questions.length - 1) {
      setIsGameOver(true);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    const category: Category = questions[currentQuestion].category;
    if (answer === questions[currentQuestion].correctAnswer) {
      console.log("correct answer...");
      console.log(questions[currentQuestion]);
      const prevScores = scores;
      prevScores[category] = prevScores[category] + 1;
      setScores(prevScores);
      console.log(scores.Communication);
    }
    setAnswers(newAnswers);
    setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1));
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculatePercentage = (score: number, category: Category) => {
    return (
      (score / questions.filter((q) => q.category === category).length) *
      100
    ).toFixed(2);
  };

  const handleStartSimulation = () => {
    setCurrentQuestion(0);
  };

  const handleSubmit = () => {
    console.log("answers submitted...");
    console.log({ answers });
  };

  return (
    <div className="flex ">
      <main className="p-6 flex flex-grow flex-col items-center justify-center h-screen">
        {/* Start Simulation button */}
        {currentQuestion === -1 && (
          <button
            onClick={handleStartSimulation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Simulation
          </button>
        )}
        {/* Questions and options */}
        {currentQuestion >= 0 && !isGameOver && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {questions[currentQuestion].question}
            </h1>
            <div className="space-y-4 flex flex-col items-center">
              {questions[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className="inline-flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-4"
                >
                  <input
                    type="radio"
                    key={index + currentQuestion}
                    name={`question-${currentQuestion}`}
                    className="form-radio h-5 w-5 text-blue-500"
                    onChange={() => handleAnswer(option)}
                  />
                  <span className="ml-3 text-lg">{option}</span>
                </label>
              ))}
            </div>
            {currentQuestion === questions.length - 1 && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            )}
            <div></div>
          </>
        )}
        {isGameOver === true && (
          <div className="flex flex-row space-x-4">
            {Object.keys(Category).map((key, index) => (
              <div key={index} className="flex flex-col items-center">
                <CircularProgressbar
                  value={Number(
                    calculatePercentage(
                      scores[key as keyof typeof Category],
                      Category[key as keyof typeof Category]
                    )
                  )}
                  text={`${calculatePercentage(
                    scores[key as keyof typeof Category],
                    Category[key as keyof typeof Category]
                  )}%`}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#4CAF50",
                    textColor: "#4CAF50",
                    trailColor: "#d6d6d6",
                  })}
                />
                <h2 className="text-center">
                  {Category[key as keyof typeof Category]}
                </h2>
              </div>
            ))}
          </div>
        )}
      </main>
      <Sidebar questions={questions} currentQuestion={currentQuestion} />
    </div>
  );
}
