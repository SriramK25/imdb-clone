import { useEffect } from "react";
import { useRef } from "react";

function Test2() {
  return (
    <div>
      <div style={{ height: "100vh", backgroundColor: "red" }}></div>
      <Section color="blue" />
    </div>
  );
}

export default Test2;

function Section({ color = "black" }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionEl = document.querySelector("section");
    sectionRef.current = sectionEl;

    function slideUp(info) {
      console.log(info[0].isIntersecting);
      if (info[0].isIntersecting) {
        sectionEl.style.opacity = 1;
        sectionEl.style.transform = `translateX(0)`;
      }
    }

    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const sectionObserver = new IntersectionObserver(slideUp, observerOptions);

    sectionObserver.observe(sectionRef.current);
  }, []);

  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: `${color}`,
        opacity: "0",
        transform: "translateX(-200px)",
        transition: "1s ease-in",
      }}
    >
      <div>This is a message.</div>
    </section>
  );
}
