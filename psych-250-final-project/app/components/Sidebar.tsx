import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Sidebar({
  currentQuestion,
  questions,
}: {
  currentQuestion: number;
  questions: any[];
}) {
  return (
    <aside className="p-6 w-64">
      <p className="mb-2">
        Question {currentQuestion + 1} of {questions.length}
      </p>
      <CircularProgressbar
        value={currentQuestion + 1}
        maxValue={questions.length}
        styles={buildStyles({
          textSize: "16px",
          pathColor: "#4CAF50",
          textColor: "#4CAF50",
          trailColor: "#d6d6d6",
        })}
        text={
          Math.floor(
            (Math.max(0, currentQuestion + 1) / questions.length) * 100
          ) + "%"
        }
      />

      {/* <progress
          className="w-full"
          value={currentQuestion + 1}
          max={questions.length}
        ></progress> */}
    </aside>
  );
}
