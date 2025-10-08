import { useEffect, useRef, useState } from "react";

interface TypeWriterProps {
  contents: string[];
  typingSpeed?: number;
  pause?: number;
  deletingSpeedFactor?: number;
}

export const TypeWriter = ({
  contents,
  typingSpeed = 70,
  pause = 1200,
  deletingSpeedFactor = 0.5,
}: TypeWriterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>();
  const lastTime = useRef<number>(0);
  const isPaused = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        setIsVisible(visible);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      isPaused.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    isPaused.current = false;
    lastTime.current = performance.now();

    const animate = (time: number) => {
      if (isPaused.current) return;

      const currentText = contents[index];
      const speed = deleting ? typingSpeed * deletingSpeedFactor : typingSpeed;

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
            setIndex((v) => (v + 1) % contents.length);
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [contents, index, subIndex, deleting, typingSpeed, pause, deletingSpeedFactor, isVisible]);

  return (
    <span
      ref={ref}
      className="inline-block max-w-full whitespace-normal break-words leading-snug"
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      {display}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};
