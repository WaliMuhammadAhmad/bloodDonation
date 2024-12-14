import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ActionButtonProps {
  text: string;
  link: string;
  showIcon?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  link,
  showIcon = true,
  className = "",
}) => {
  if (!text) return null;

  return (
    <Link
      to={link}
      className={`bg-background text-text border-text w-fit flex flex-wrao gap-2 justify-center items-center text-center sm:text-left pl-2 pr-1 py-1 font-light text-xs md:text-md rounded-full border-2 uppercase ${className}`}>
      {text}
      {showIcon && (
        <div className='hidden sm:flex w-7 h-7 items-center justify-center border-2 rounded-full sm:w-6 sm:h-6 md:w-7 md:h-7'>
          <span className='rotate-[45deg]'>
            <FaArrowUpLong />
          </span>
        </div>
      )}
    </Link>
  );
};

export default ActionButton;
