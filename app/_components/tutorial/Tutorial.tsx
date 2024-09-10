"use client";

import { useState } from "react";
import "./Tutorial.scss";

const Tutorial = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "Welcome to Mythelix! This is your collection page.",
    "Here you can view and manage your cards.",
    "Click on a card to see more details.",
    "You can create new cards or trade with other players.",
    "Enjoy your stay and have fun!",
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // End tutorial
      localStorage.setItem("tutorialCompleted", "true");
    }
  };

  return (
    <div className="tutorial">
      <div className="tutorial-content">
        <p>{steps[step]}</p>
        <button onClick={handleNext}>
          {step < steps.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
