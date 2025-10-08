import React, { useEffect, useRef, useState } from "react";


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
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<number | null>(null);


  // IntersectionObserver 判斷可見性
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

  useEffect(() => {
    if (!isVisible) return;

    const currentText = contents[index];
    const speed = deleting ? typingSpeed * deletingSpeedFactor : typingSpeed;

    if (!deleting && subIndex < currentText.length) {
      timeoutRef.current = setTimeout(() => {
        setSubIndex((v) => v + 1);
        setDisplay(currentText.slice(0, subIndex + 1));
      }, speed);
    } else if (!deleting && subIndex === currentText.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && subIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setSubIndex((v) => v - 1);
        setDisplay(currentText.slice(0, subIndex - 1));
      }, speed);
    } else if (deleting && subIndex === 0) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setIndex((v) => (v + 1) % contents.length);
      }, speed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [subIndex, deleting, index, contents, typingSpeed, pause, deletingSpeedFactor, isVisible]);

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
