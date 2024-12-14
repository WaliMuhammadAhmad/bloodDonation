import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className = "" }) => {
  return (
    <h1
      className={`uppercase text-[5vw] leading-[6vw] tracking-tighter text-text ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
