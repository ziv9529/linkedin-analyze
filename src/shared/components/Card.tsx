/**
 * Card component for content grouping
 * Provides visual hierarchy and containment with theme support
 */

import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
  return <div className={`card card--${variant} ${className}`}>{children}</div>;
};
