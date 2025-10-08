import { useEffect, useRef, useState } from "react";

function useTypeEffect(
  texts: string[],
  typingSpeed = 70,
  pause = 1200,
  isVisible = true
) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const rafRef = useRef<number>();
  const lastTime = useRef<number>(0);
  const isPaused = useRef(false);

  useEffect(() => {
    if (!isVisible) {
      isPaused.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    isPaused.current = false;

    const animate = (time: number) => {
      if (isPaused.current) return;
      const currentText = texts[index];
      const speed = deleting ? typingSpeed / 2 : typingSpeed;

      const delta = time - lastTime.current;
      const steps = Math.floor(delta / speed);

      if (steps > 0) {
        lastTime.current = lastTime.current + steps * speed;

        if (!deleting) {
          const nextIndex = Math.min(subIndex + steps, currentText.length);
          setSubIndex(nextIndex);
          setDisplay(currentText.slice(0, nextIndex));
          if (nextIndex === currentText.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          const nextIndex = Math.max(subIndex - steps, 0);
          setSubIndex(nextIndex);
          setDisplay(currentText.slice(0, nextIndex));
          if (nextIndex === 0) {
            setDeleting(false);
            setIndex((v) => (v + 1) % texts.length);
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [texts, index, subIndex, deleting, typingSpeed, pause, isVisible]);

  return display;
}


export const TypeWriter = ({ contents }: { contents: string[] }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const text = useTypeEffect(contents);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="whitespace-normal break-words text-balance">
      {text}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};
