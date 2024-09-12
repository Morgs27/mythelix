import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-aria-components";
import "./WelcomeModal.scss";
import { IoCloseOutline } from "react-icons/io5";
import useFadeElements from "@/app/_hooks/useFadeElements";
import useAddObservers from "@/app/_hooks/useAddObservers";

interface WelcomeProps {
  username: string;
  setIsOpen: (isOpen: boolean) => void;
  setWelcome: (welcome: boolean) => void;
}

const description = `Dive into a collection of AI-crafted artistry, create your own digital bestiary where every card is a unique masterpiece and digital work of art.`;
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

  const addObservers = useAddObservers();

  useEffect(() => {
    addObservers();
  }, [username]);

  const closeModal = () => {
    setWelcome(false);
    localStorage.setItem("tutorialStarted", "true");
  }

  return (
    <div className="modal-background">
      <div className="welcome-modal ">
        <div className="header">
          <div className="logo fade-in fade-left fade-delay-0 fade-time-10">
            <img src="/logo-animation/Frame1.png" alt="Mythelix" />
          </div>
          <h1 className="fade-in fade-delay-5 fade-time-10">Welcome to Mythelix</h1>
          <div  className="close-button fade-in-right fade-time-10" onClick={closeModal}>
            <IoCloseOutline />
          </div>
        </div>
        <div className="content">
        <h1 className="fade-in fade-delay-5 fade-time-10 header-mobile">Welcome to Mythelix</h1>

          <p className="fade-in fade-left fade-delay-10 fade-time-10">{description}</p>
          <div className="cards-image fade-in fade-left fade-delay-15 fade-time-20">
            <img src="/cards.png" alt="Mythelix" />
          </div>
            <p className="fade-in fade-left fade-delay-25 fade-time-10">We have created some cards for you to get started. Click the button below to start the tutorial.</p>
        </div>
        <div className="buttons">
          <div className="username fade-in fade-left fade-delay-30 fade-time-10">{username}</div>
          <button
            onClick={handleStartTour}
            className="fade-in fade-left fade-delay-35 fade-time-10"
          >
            Start Tutorial
          </button>
        </div>
      </div>
    </div>
    // null
  );
};

export default WelcomeModal;
