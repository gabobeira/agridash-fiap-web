'use client';

import { ReactNode } from 'react';

export interface FIconProps {
  readonly children: ReactNode;
  readonly size?: number;
  readonly color?: string;
  readonly className?: string;
}

export default function FIcon({ 
  children, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}: Readonly<FIconProps>) {
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ color, width: size, height: size }}
    >
      {children}
    </div>
  );
}
