type UseTutorialProps = {
  session: { user: { username: string } };
};

export const steps = [
  {
    selector: ".collection__page",
    content: "Welcome to the collection page",
    // placement: "top",
  },
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
