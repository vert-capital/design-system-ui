import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  className?: string;
  classNameLabel?: string;
  children?: React.ReactNode;
}

const CheckBoxBasic = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ label, className, classNameLabel, children, ...props }, ref) => {
  return (
    <div className={"flex items-center"}>
      <CheckboxPrimitive.Root
        id={props.value?.toString()}
        ref={ref}
        className={cn(
          `peer h-5 w-5 shrink-0 rounded border border-muted-foreground ring-neutral_high-extra_light focus-visible:outline-none focus-visible:ring-4 ${
            !props.disabled
              ? "bg-background data-[state=checked]:bg-brand data-[state=checked]:text-background"
              : "cursor-not-allowed bg-neutral_high-medium text-muted-foreground opacity-50 data-[state=checked]:text-muted-foreground"
          } `,
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <label
        className={cn(
          "ml-2 text-[0.813rem] font-normal leading-normal text-neutral_low",
          classNameLabel,
        )}
        htmlFor={props.value?.toString()}
      >
        {children || label}
      </label>
    </div>
  );
});

export { CheckBoxBasic };
