import { X } from 'lucide-react';
import { SelectItemOptions } from '.';
import {
  FormControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui';

type Props = {
  field?: any;
  placeholder?: string;
  options: SelectItemOptions[];
  disabledClear?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
};

export function SelectBasic({
  field,
  placeholder,
  options,
  disabledClear,
  disabled,
  onChange,
}: Props) {
  const clear = () => {
    field?.onChange('');
    if (onChange) onChange('');
  };
  return (
    <Select
      value={field?.value}
      onValueChange={(value) => {
        field?.onChange(value);
        if (onChange) onChange(value);
      }}
      disabled={disabled}
    >
      <FormControl>
        <div className="relative">
          <SelectTrigger>
            <SelectValue
              placeholder={!field?.value ? placeholder : field.value}
            />
          </SelectTrigger>
          {field?.value && !disabledClear ? (
            <div
              title="Limpar"
              className="absolute right-6 bottom-[0.55rem] flex flex-col justify-center items-center p-1 mt-0.5 mx-1.5 rounded-full hover:bg-muted cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                clear();
              }}
            >
              <X className="h-3.5 w-3.5 opacity-50 stroke-muted-foreground" />
            </div>
          ) : null}
        </div>
      </FormControl>
      <SelectContent>
        {options?.map(({ label, value, description }) => (
          <SelectItem key={value} value={`${value}`} className="cursor-pointer">
            {label}
            {description && (
              <div className="text-xs text-muted-foreground">{description}</div>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
