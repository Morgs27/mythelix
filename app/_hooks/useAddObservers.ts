const useAddObservers = () => {
  const addObservers = () => {
    const fadeInElements = document.getElementsByClassName("fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add class to the element
          } else {
          }
        });
      },
      { threshold: 0.5 }
    );

    Array.from(fadeInElements).forEach((element) => {
      observer.observe(element);
    });

    console.log(`Observing ${fadeInElements.length} elements`);
  };

  return addObservers;
};

export default useAddObservers;
