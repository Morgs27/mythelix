import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-aria-components";
import "./WelcomeModal.scss";

interface WelcomeProps {
  username: string;
  setIsOpen: (isOpen: boolean) => void;
  setWelcome: (welcome: boolean) => void;
}

const WelcomeModal: React.FC<WelcomeProps> = ({
  username,
  setIsOpen,
  setWelcome,
}) => {

  const handleStartTour = () => {
    setIsOpen(true);
    setWelcome(false);
    localStorage.setItem("tutorialStarted", "true");
  }

  return (
    <div className="modal-background">
      <div className="welcome-modal">
        Welcome {username}
        <div className="buttons">
          <button
            onClick={() => {
              setIsOpen(true);
              setWelcome(false);
            }}
          >
            Start Tutorial
          </button>
          <button onClick={() => handleStartTour()}>Close</button>
        </div>
      </div>
    </div>
    // null
  );
};

export default WelcomeModal;
