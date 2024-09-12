import { useState } from "react";

type UseTutorialProps = {
  session: { user: { username: string } };
};

export const useTutorial = ({ session }: UseTutorialProps) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const shouldShowTutorial =
    session?.user?.username?.startsWith("guest_") &&
    localStorage.getItem("tutorialStarted") &&
    !localStorage.getItem("tutorialCompleted");

  const shouldShowWelcome =
    session?.user?.username?.startsWith("guest_") &&
    !localStorage.getItem("tutorialStarted") &&
    !localStorage.getItem("tutorialCompleted");

  return {
    showTutorial,
    setShowTutorial,
    shouldShowTutorial,
    shouldShowWelcome,
  };
};
