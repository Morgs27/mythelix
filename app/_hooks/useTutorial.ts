type UseTutorialProps = {
  session: { user: { username: string } };
};

export const steps = [
  {
    selector: ".collection__page",
    content: "Welcome to the collection page. Let's explore its features!",
  },
  {
    selector: ".cardOptions",
    content: "Here you can filter and sort your card collection.",
  },
  {
    selector: "[aria-label='create-card']",
    content: "Click here to create a new card.",
  },
  {
    selector: ".crystal",
    content: "This shows your current crystal balance. Click to visit the store.",
  },
  // Add more steps as needed
];

export const useTutorial = ({ session }: UseTutorialProps) => {
  const showTutorial = () => {
    return (
      session?.user?.username?.startsWith("guest_") &&
      !localStorage.getItem("tutorialCompleted")
    );
  };

  return {
    showTutorial,
  };
};
