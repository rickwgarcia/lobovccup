import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: 'solid' | 'solid-turquoise';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  solid: 'bg-brand-gray text-white',
  'solid-turquoise': 'bg-turquoise text-black',
};

export default function Button({
  children,
  variant = 'solid',
  className = '',
  ...anchorProps
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-btn border border-brand-gray px-[35px] py-[20px] text-center font-grotesk text-lg leading-7 transition-opacity hover:opacity-90 ${variantClasses[variant]} ${className}`}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
