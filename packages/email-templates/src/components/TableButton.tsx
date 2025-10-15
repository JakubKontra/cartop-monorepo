import { Button as ReactEmailButton } from "@react-email/components";
import { ReactNode } from "react";

interface TableButtonProps {
  href?: string;
  children: ReactNode;
  className?: string;
}

export const TableButton = ({ href, children, className = "", ...props }: TableButtonProps) => {
  return (
    <ReactEmailButton
      href={href}
      style={{
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '18px',
        backgroundColor: '#C90932',
        color: '#FFFFFF',
        padding: '10px 20px',
        borderRadius: '24px',
        textDecoration: 'none',
        display: 'inline-block',
        textTransform: 'uppercase',
        textAlign: 'center',
        border: 'none',
        cursor: 'pointer',
        verticalAlign: 'middle',
      }}
      {...props}
    >
      {children}
    </ReactEmailButton>
  );
};

export default TableButton;