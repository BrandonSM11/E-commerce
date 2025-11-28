// 'use client';

// import React from 'react';

// export interface ButtonProps {
//   label: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   type?: 'button' | 'submit' | 'reset';
//   'aria-label'?: string;
// }

// const Button: React.FC<ButtonProps> = ({
//   label,
//   onClick,
//   disabled = false,
//   type = 'button',
//   ...aria
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className="px-4 py-2 rounded-md border focus:outline-none focus:ring"
//       {...aria}
//     >
//       {label}
//     </button>
//   );
// };

// export default Button;
import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  type = "button",
  onClick,
  
}: ButtonProps) => {
  const variantClass = {
    default: styles.default,
    outline: styles.outline,
    destructive: styles.destructive,
  }[variant];

  const sizeClass = {
    sm: styles.sm,
    default: styles.defaultSize,
    lg: styles.lg,
    icon: styles.icon,
  }[size];

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
