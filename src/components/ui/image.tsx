import { cn } from '@/lib/utils';
import { ImageOffIcon } from 'lucide-react';
import * as React from 'react';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const onError = () => {
      setHasError(true);
    };
    return (
      <div className={cn('relative rounded')}>
        {hasError ? (
          <div
            className={cn(
              'flex justify-center bg-gray-100 justify-items-center content-center items-center inset-0',
              className,
            )}
          >
            <ImageOffIcon className={cn('h-20 w-20 text-gray-400')} />
          </div>
        ) : null}

        <div
          className={cn(
            'flex justify-center justify-items-center content-center items-center inset-0',
          )}
        >
          <img
            className={cn(hasError ? 'hidden' : 'block')}
            ref={ref}
            {...props}
            onError={onError}
          />
        </div>
      </div>
    );
  },
);
Image.displayName = 'Image';
export { Image };
