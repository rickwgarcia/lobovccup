import type { ElementType, ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  as?: ElementType;
  size?: 'h2' | 'h3' | 'h4';
  className?: string;
  bgClassName?: string;
}

const sizeClasses: Record<NonNullable<SectionLabelProps['size']>, string> = {
  h2: 'text-3xl sm:text-h2',
  h3: 'text-2xl sm:text-h3',
  h4: 'text-h4-mobile sm:text-h4',
};

export default function SectionLabel({
  children,
  as: Tag = 'h2',
  size = 'h2',
  className = '',
  bgClassName = 'bg-turquoise',
}: SectionLabelProps) {
  return (
    <div className={`inline-flex flex-col items-start rounded-pill ${bgClassName} px-[7px] ${className}`}>
      <Tag className={`font-grotesk font-medium leading-tight text-black ${sizeClasses[size]}`}>
        {children}
      </Tag>
    </div>
  );
}
