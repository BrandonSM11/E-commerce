import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", ...props }, ref) => {
    // Clases base comunes
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium " +
      "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 " +
      "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

    // Variantes
    let variantClasses = "";
    switch (variant) {
      case "destructive":
        variantClasses =
          "bg-destructive text-destructive-foreground hover:bg-destructive/90";
        break;
      case "outline":
        variantClasses =
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
        break;
      case "secondary":
        variantClasses =
          "bg-secondary text-secondary-foreground hover:bg-secondary/80";
        break;
      case "ghost":
        variantClasses = "hover:bg-accent hover:text-accent-foreground";
        break;
      case "link":
        variantClasses = "text-primary underline-offset-4 hover:underline";
        break;
      default:
        variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
        break;
    }

    // Tamaños
    let sizeClasses = "";
    switch (size) {
      case "sm":
        sizeClasses = "h-9 rounded-md px-3";
        break;
      case "lg":
        sizeClasses = "h-11 rounded-md px-8";
        break;
      case "icon":
        sizeClasses = "h-10 w-10";
        break;
      default:
        sizeClasses = "h-10 px-4 py-2";
        break;
    }

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
