import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function SectionWrapper({
  children,
  className,
  id,
  padding = 'lg',
}: SectionWrapperProps) {
  const paddingVariants = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-20',
    lg: 'py-16 md:py-28',
    xl: 'py-24 md:py-36',
  };

  return (
    <section id={id} className={cn('w-full relative', paddingVariants[padding], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {children}
      </div>
    </section>
  );
}
