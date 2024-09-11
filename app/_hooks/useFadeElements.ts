const useFadeElements = () => {
  const fadeElements = () => {
    var fade_elements = document.querySelectorAll(".fade-in-normal");
    fade_elements.forEach((element) => {
      element.classList.add("fade-in-normal-active");
    });
  };
  return fadeElements;
};

export default useFadeElements;
