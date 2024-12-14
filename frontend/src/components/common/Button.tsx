import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  to: string;
  variant?: "filled" | "outlined"; // Optional variant prop
  className?: string; // Optional class for additional styles
}

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  variant = "filled", // Default to "filled" if no variant is provided
  className = "",
}) => {
  // Base styles for the button
  const baseStyles = `text-center text-pretty px-6 py-3 rounded-lg border-2 transition-colors ${className}`;

  // Styles for the "filled" variant
  const filledStyles =
    "bg-background text-text border-primary hover:bg-secondary";

  // Styles for the "outlined" variant
  const outlinedStyles =
    "text-background border-background hover:bg-background hover:text-text";

  // Combine base styles with variant-specific styles
  const buttonStyles = `${baseStyles} ${
    variant === "filled" ? filledStyles : outlinedStyles
  }`;

  return (
    <Link to={to} className={buttonStyles}>
      {children}
    </Link>
  );
};

export default Button;
