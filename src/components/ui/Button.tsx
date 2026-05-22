import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // We need to create this

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-site-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide',
  {
    variants: {
      variant: {
        default: 'relative overflow-hidden bg-gradient-to-r from-site-accent to-site-accent-dark text-[#0a0e14] shadow-[0_0_15px_rgba(226,194,117,0.3)] hover:shadow-[0_0_25px_rgba(226,194,117,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5',
        outline: 'border border-site-accent/50 text-site-accent hover:bg-site-accent/10 hover:border-site-accent shadow-sm backdrop-blur-md transition-all duration-300',
        ghost: 'hover:bg-white/5 hover:text-site-accent transition-colors duration-300',
        link: 'text-site-accent underline-offset-8 hover:underline decoration-site-accent/30 hover:decoration-site-accent transition-all',
      },
      size: {
        default: 'h-11 px-8 py-2',
        sm: 'h-9 rounded-md px-4',
        lg: 'h-14 rounded-md px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
