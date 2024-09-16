import { useIMask } from "react-imask";
import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, LegacyRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  parser?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, mask, parser, ...props }, ref) => {
    const {
      ref: inputRef,
      maskRef,
      unmaskedValue,
    } = useIMask({
      mask,
    });

    return (
      <div ref={ref}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground autofill:shadow-[inset_0_0_0px_1000px_rgba(0,116,122,0.1)] focus:border-[#727575] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAAAAA80] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={mask ? (inputRef as LegacyRef<HTMLInputElement>) : ref}
          placeholder={placeholder}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            if (mask) {
              props?.onChange?.({
                // @ts-ignore
                target: { value: maskRef.current?.masked?.value },
              });
              parser?.(unmaskedValue);
            } else {
              props?.onChange?.(event);
            }
          }}
          {...props}
        />
      </div>
    );
  },
);

export { Input };
