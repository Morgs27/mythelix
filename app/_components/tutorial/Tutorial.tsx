"use client";

import { useState, useEffect, useRef } from "react";
import "./Tutorial.scss";

type TutorialProps = {
  setShowTutorial: (show: boolean) => void;
};

type Step = {
  selector: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

const steps: Step[] = [
  {
    selector: ".collection__page",
    content: "This is your collection page where you can see all your cards.",
    position: 'top',
  },
  {
    selector: ".type-filter",
    content: "Here you can filter your cards to see only the ones you want.",
    position: 'bottom',
  },
  {
    selector: ".crystal",
    content: "Here is where your crystal balance is displayed.",
    position: 'left',
  },
  {
    selector: "[aria-label='create-card']",
    content: "Click here to create a new card which will cost you crystals.",
    position: 'bottom',
  },
  {
    selector: ".card",
    content: "Click on a card to see more details and options.",
    position: 'right',
  },
];


const Tutorial = ({ setShowTutorial }: TutorialProps) => {
  const EDGE_PADDING = screen.width > 768 ? 50 : 20; // Minimum distance from screen edges in pixels
  const ARROW_SIZE = 15; // Size of the arrow in pixels
  const MODAL_PADDING = 25; // Additional padding between modal and component

  const [step, setStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const tutorialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const element = document.querySelector(steps[step].selector);
      if (element && tutorialRef.current) {
        const rect = element.getBoundingClientRect();
        const tutorialRect = tutorialRef.current.getBoundingClientRect();
        let newTop = 0;
        let newLeft = 0;
        let arrowTop = 0;
        let arrowLeft = 0;

        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        switch (steps[step].position) {
          case 'top':
            newTop = rect.top - tutorialRect.height - MODAL_PADDING - ARROW_SIZE;
            newLeft = elementCenterX - tutorialRect.width / 2;
            arrowTop = tutorialRect.height;
            arrowLeft = tutorialRect.width / 2 - ARROW_SIZE;
            break;
          case 'right':
            newTop = elementCenterY - tutorialRect.height / 2;
            newLeft = rect.right + MODAL_PADDING + ARROW_SIZE;
            arrowTop = tutorialRect.height / 2 - ARROW_SIZE;
            arrowLeft = -ARROW_SIZE * 2;
            break;
          case 'bottom':
            newTop = rect.bottom + MODAL_PADDING + ARROW_SIZE;
            newLeft = elementCenterX - tutorialRect.width / 2;
            arrowTop = -ARROW_SIZE * 2;
            arrowLeft = tutorialRect.width / 2 - ARROW_SIZE;
            break;
          case 'left':
            newTop = elementCenterY - tutorialRect.height / 2;
            newLeft = rect.left - tutorialRect.width - MODAL_PADDING - ARROW_SIZE;
            arrowTop = tutorialRect.height / 2 - ARROW_SIZE;
            arrowLeft = tutorialRect.width;
            break;
        }

        // Calculate the adjustment needed due to screen edge constraints
        const topAdjustment = Math.max(0, EDGE_PADDING - newTop);
        const bottomAdjustment = Math.max(0, newTop + tutorialRect.height + EDGE_PADDING - window.innerHeight);
        const leftAdjustment = Math.max(0, EDGE_PADDING - newLeft);
        const rightAdjustment = Math.max(0, newLeft + tutorialRect.width + EDGE_PADDING - window.innerWidth);

        // Apply the adjustments
        newTop += topAdjustment - bottomAdjustment;
        newLeft += leftAdjustment - rightAdjustment;

        // Adjust arrow position based on the modal's position change
        switch (steps[step].position) {
          case 'top':
          case 'bottom':
            arrowLeft -= leftAdjustment - rightAdjustment;
            break;
          case 'left':
          case 'right':
            arrowTop -= topAdjustment - bottomAdjustment;
            break;
        }

        setPosition({ top: newTop, left: newLeft });
        setArrowPosition({ top: arrowTop, left: arrowLeft });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [step]);

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // End tutorial
      endTutorial();
    }
  };

  const endTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialCompleted", "true");
  }

  return (
    <div className="tutorial-overlay">
      <div
        ref={tutorialRef}
        className="tutorial"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <div className="tutorial-content">
          <div className="step-counter">Step {step + 1} of {steps.length}</div>
          <p>{steps[step].content}</p>
          <div className="button-container">
            {
              step === 0 ? <button className="previous-button" onClick={endTutorial}>Skip Tutorial</button> :  <button className="previous-button" onClick={handlePrevious} >Previous</button> 
            }
            <button className="next-button" onClick={handleNext}>
              {step < steps.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
        <div 
          className={`tutorial-arrow ${steps[step].position}`}
          style={{ 
            top: `${arrowPosition.top}px`, 
            left: `${arrowPosition.left}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Tutorial;
