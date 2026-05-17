import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BasePanelProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export function BasePanel({ children, className, isActive = false }: BasePanelProps) {
  return (
    <div
      className={cn(
        "w-[100vw] h-[100vh] flex-shrink-0 relative overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
