import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
}) => {
  const cardClasses = `
    bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <div className="text-gray-800">
        {children}
      </div>
    </div>
  );
};

export default Card;
