import { Button as ReactEmailButton } from "@react-email/components";
import { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "red" | "green" | "outline";
  width?: string;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export const Button = ({ 
  href, 
  children, 
  className = "", 
  variant = "red", 
  width = "600px",
  fullWidth = false,
  style,

  ...props 
}: ButtonProps) => {
  const buttonWidth = fullWidth ? "100%" : width;
  
  return (
    <ReactEmailButton
      href={href}
      style={{
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '54px',
        backgroundColor: variant === 'red'
          ? '#C90932'
          : variant === 'green'
          ? '#09C943'
          : '#FFFFFF',
        color: variant === 'outline' ? '#C90932' : '#FFFFFF',
        width: buttonWidth,
        height: '54px',
        borderRadius: '28px',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        border: variant === 'outline' ? '2px solid #C90932' : 'none',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </ReactEmailButton>
  );
};

export default Button;