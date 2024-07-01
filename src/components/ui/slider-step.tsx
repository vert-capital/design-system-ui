import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const StepMarkers = ({
  min,
  max,
  step,
  currentValue,
}: {
  min: number;
  max: number;
  step: number;
  currentValue: number;
}) => {
  const range = max - min;
  const numberOfSteps = range / step;
  return (
    <>
      {Array.from({ length: numberOfSteps + 1 }, (_, index) => {
        const value = min + index * step;
        const isPast = value <= currentValue;
        return (
          <div
            key={index}
            className={`absolute h-1.5 w-1.5 rounded-full cursor-pointer ${
              isPast ? 'bg-brand' : 'bg-muted-foreground/60'
            }`}
            style={{
              left: `${(index / numberOfSteps) * 100}%`,
              top: '40%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }}
          />
        );
      })}
    </>
  );
};

const SliderStep = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-brand" />
    </SliderPrimitive.Track>
    <StepMarkers
      min={props.min || 12}
      max={props.max || 22}
      step={props.step || 2}
      currentValue={props.defaultValue?.length ? props.defaultValue[0] : 16}
    />
    <SliderPrimitive.Thumb className="block h-3 w-3 cursor-grab rounded-full border-none border-transparent bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:pointer-events-none" />
  </SliderPrimitive.Root>
));
SliderStep.displayName = SliderPrimitive.Root.displayName;

export { SliderStep };
