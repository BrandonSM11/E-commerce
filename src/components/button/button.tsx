import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "default" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
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
