import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: ElementType;
  bordered?: boolean;
  shadow?: boolean;
}

export default function Card({
  children,
  as: Tag = 'div',
  bordered = true,
  shadow = true,
  className = '',
  ...rest
}: CardProps) {
  return (
    <Tag
      className={`rounded-card ${bordered ? 'border border-ink' : ''} ${shadow ? 'shadow-hard' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
