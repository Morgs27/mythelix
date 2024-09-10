import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-aria-components";
import "./Welcome.scss";

interface WelcomeProps {
  username: string;
  setIsOpen: (isOpen: boolean) => void;
  setWelcome: (welcome: boolean) => void;
}

const Welcome: React.FC<WelcomeProps> = ({
  username,
  setIsOpen,
  setWelcome,
}) => {
  return (
    <div className="modal-background">
      <div className="welcome-modal">
        Welcome //{" "}
        <div className="buttons">
          <button
            onClick={() => {
              setIsOpen(true);
              setWelcome(false);
            }}
          >
            Start Tutorial
          </button>
          <button onClick={() => setWelcome(false)}>Close</button>
        </div>
      </div>
    </div>
    // null
  );
};

export default Welcome;
