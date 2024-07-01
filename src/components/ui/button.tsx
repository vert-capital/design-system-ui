import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground/70 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border bg-brand text-brand-foreground hover:bg-brand/90 focus-visible:bg-brand/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:bg-destructive/90',
        outline:
          'border border-input border-brand bg-background hover:bg-brand text-brand hover:text-primary-foreground focus-visible:bg-brand/90 focus-visible:text-primary-foreground',
        secondary:
          'bg-secondary text-brand hover:bg-secondary/80 focus-visible:bg-secondary/80 focus-visible:text-brand/90',
        ghost: 'text-brand hover:bg-secondary focus-visible:bg-secondary',
        link: 'text-brand underline-offset-4 hover:underline focus-visible:bg-transparent',
      },
      size: {
        default: 'h-10 px-8',
        sm: 'h-6 px-5 px-8',
        lg: 'h-12 px-10',
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
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
