/**
 * Button component with theme support
 * Supports multiple variants and sizes with intentional styling
 */

import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled || isLoading ? 'is-disabled' : '';

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-loader" aria-hidden="true"></span>}
      <span className={isLoading ? 'opacity-50' : ''}>{children}</span>
    </button>
  );
};
