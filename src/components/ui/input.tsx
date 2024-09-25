import { useIMask } from "react-imask";
import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, LegacyRef, useEffect } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: any; // Mask configuration for react-imask
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Change handler from react-hook-form
  unmasked?: boolean; // Whether to return the unmasked value
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      placeholder,
      mask,
      unmasked = false, // Define o comportamento para retornar valor sem máscara
      value = "", // Valor inicial do react-hook-form
      onChange, // Função de callback para onChange, vindo do react-hook-form via { ...field }
      ...props
    },
    ref,
  ) => {
    const { ref: inputRef, maskRef } = useIMask({ mask });

    // Sync initial value with the input (masked or unmasked)
    useEffect(() => {
      if (mask && maskRef.current) {
        maskRef.current[unmasked ? "unmaskedValue" : "value"] =
          String(value) || "";
      } else if (inputRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputRef.current.value = value; // Update into DOM directly
      }
    }, [value, unmasked, maskRef, mask, inputRef]);

    // Handle input change and propagate correct value (masked or unmasked)
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      let updatedValue = event.target.value;

      if (mask && maskRef.current) {
        updatedValue = unmasked
          ? maskRef.current.unmaskedValue || ""
          : maskRef.current.value || "";
      }

      onChange?.({
        ...event,
        target: {
          ...event.target,
          value: updatedValue, // Atualiza o valor correto, mascarado ou não
        },
      });
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground autofill:shadow-[inset_0_0_0px_1000px_rgba(0,116,122,0.1)] focus:border-[#727575] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAAAAA80] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={mask ? (inputRef as LegacyRef<HTMLInputElement>) : ref} // Pass input ref for react-imask if mask is present
        placeholder={placeholder}
        value={mask ? maskRef.current?.value || "" : value} // Display masked or unmasked value
        onInput={handleInput}
        {...props} // Spread remaining props from react-hook-form or other sources
      />
    );
  },
);

export { Input };
