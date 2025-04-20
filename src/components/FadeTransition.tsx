"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function FadeTransition({ children }: { children: React.ReactNode }) {
  const [fadeState, setFadeState] = useState("fade-enter fade-enter-active");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    setFadeState("fade-exit fade-exit-active");
    timeoutRef.current = setTimeout(() => {
      setCurrentChildren(children);
      setFadeState("fade-enter fade-enter-active");
    }, 350); // match transition duration
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [children]);

  return (
    <div className={fadeState} style={{ width: "100%" }}>
      {currentChildren}
    </div>
  );
}
