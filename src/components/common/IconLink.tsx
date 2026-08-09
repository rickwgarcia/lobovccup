import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: string;
  iconAlt: string;
  children: ReactNode;
  underline?: boolean;
}

export default function IconLink({
  icon,
  iconAlt,
  children,
  underline = false,
  className = '',
  ...anchorProps
}: IconLinkProps) {
  return (
    <a
      className={`inline-flex items-center gap-[15px] font-grotesk text-lg leading-7 ${underline ? 'underline decoration-solid underline-offset-2' : ''} ${className}`}
      {...anchorProps}
    >
      <img src={icon} alt={iconAlt} className="size-[41px] shrink-0" />
      <span>{children}</span>
    </a>
  );
}
