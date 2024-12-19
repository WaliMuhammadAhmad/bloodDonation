import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, to, className = "" }) => {
  const defaultStyles =
    "w-full py-3 px-5 text-sm text-center font-medium border text-primary border-primary rounded-md hover:bg-primary hover:text-text focus:outline-none focus:ring-0";
  const buttonStyles = `${defaultStyles} ${className}`;

  return (
    <Link to={to} className={buttonStyles}>
      {children}
    </Link>
  );
};

export default Button;
