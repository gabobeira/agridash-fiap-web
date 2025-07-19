import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className }) => {
  const cardClasses = `bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 ${className || ''}`;
  
  return (
    <div 
      className={cardClasses}
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        padding: '2rem',
        transition: 'box-shadow 0.15s ease-in-out'
      }}
    >
      {title && (
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      <div className="text-gray-800">
        {children}
      </div>
    </div>
  );
};

export default Card;
