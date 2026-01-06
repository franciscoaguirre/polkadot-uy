import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

interface EvervaultBackgroundProps {
  className?: string;
}

export const EvervaultBackground = ({ className }: EvervaultBackgroundProps) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const containerRef = useRef<HTMLDivElement>(null);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const str = generateRandomString(15000);
    setRandomString(str);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);

        const str = generateRandomString(15000);
        setRandomString(str);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className || ""}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={style}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle,#74acdd_0%,#b8dcf6_100%)] opacity-70 pointer-events-none" />
            <div className="absolute inset-0 text-xs text-white font-mono break-all leading-relaxed p-4 select-none mix-blend-overlay pointer-events-none">
              {randomString}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
