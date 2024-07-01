import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

const tagsVariants = cva(
  'rounded-xl inline-flex justify-center items-center whitespace-nowrap text-xs font-bold cursor-default',
  {
    variants: {
      variant: {
        default: 'bg-neutral_high-extra_light text-neutral_low font-normal',
        primary: 'bg-brand text-white',
        secondary: 'bg-helper text-white',
        transparent: 'bg-transparent text-brand',
        success: 'bg-success-extra_light text-success',
        helper: 'bg-helper-extra_light text-helper-medium',
        warning: 'bg-warning-extra_light text-warning',
        info: 'bg-brand-extra_light text-brand',
      },
      size: {
        default: 'py-1 px-2 h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagsVariants> {
  label: string;
  closeable?: boolean;
  className?: string;
  onClose?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    { label, closeable = false, className, variant, size, onClose, ...props },
    ref,
  ) => {
    const closeableStyle =
      variant === 'primary' || variant === 'secondary'
        ? 'text-white'
        : 'text-brand';
    return (
      <span
        className={cn(tagsVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div>{label}</div>
        {closeable && (
          <div className="ml-2 flex justify-center items-center h-full">
            <X
              className={`w-3 h-3 text-brand ${closeableStyle} hover:cursor-pointer font-bold`}
              onClick={onClose}
            ></X>
          </div>
        )}
      </span>
    );
  },
);

export { Tag, tagsVariants };
