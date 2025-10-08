import { useEffect, useRef, useState } from "react";

function useTypeEffect(
  texts: string[],
  minSpeed = 50, // ms
  maxSpeed = 100, // ms
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

      // 固定速度範圍
      const speed = deleting
        ? Math.max(minSpeed, Math.min(maxSpeed, minSpeed)) / 2
        : Math.max(minSpeed, Math.min(maxSpeed, minSpeed));

      if (time - lastTime.current >= speed) {
        lastTime.current = time;
        const current = texts[index];

        if (!deleting && subIndex < current.length) {
          setSubIndex((v) => v + 1);
          setDisplay(current.slice(0, subIndex + 1));
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
          setDisplay(current.slice(0, subIndex - 1));
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((v) => (v + 1) % texts.length);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [texts, index, subIndex, deleting, minSpeed, maxSpeed, pause, isVisible]);

  return display;
}

export const TypeWriter = ({ contents }: { contents: string[] }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const text = useTypeEffect(contents, 40, 100, 1200, isVisible);

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
