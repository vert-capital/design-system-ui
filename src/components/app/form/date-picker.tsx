import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, dateDisplay } from '@/index';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { PropsWithChildren, useMemo, useState } from 'react';

type DateRange = {
  from: Date;
  to?: Date;
};

type Props = {
  field?: any;
  closeAfterSelect?: boolean;
  disabledRange?: DateRange;
  disabledDays?: Date[];
  disabledClear?: boolean;
  disabled?: boolean;
  enableDays?: Date[];
  enableRange?: DateRange;
  onChange?: (value: any) => void;
  [key: string]: any;
};

export function DatePicker({
  field,
  closeAfterSelect = true,
  disabledRange,
  disabledDays = [],
  disabledClear,
  enableDays,
  enableRange,
  disabled,
  onChange,
  ...props
}: PropsWithChildren<Props>) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const disabledDate = [
    ...disabledDays,
    { from: disabledRange?.from, to: disabledRange?.to },
  ];

  const getSelectedDate = (date?: any) => {
    if (!date) return undefined;
    const selectedDate = new Date(date);
    const adjustedDate = new Date(
      selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
    );
    return adjustedDate;
  };

  const monthFocus = (date?: any) => {
    if (!date) return undefined;
    const selectedDate = new Date(date);
    const adjustedDate = new Date(
      selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
    );
    const newDate = new Date(
      adjustedDate.getFullYear(),
      adjustedDate.getMonth(),
    );
    return newDate;
  };

  const isDateAvailable = (date: Date, dateSet: Set<string>): boolean => {
    return dateSet.has(date.toDateString());
  };

  const enableDates = {
    disabled: (date: Date) =>
      enableDays || enableRange
        ? !isDateAvailable(date, availableDateSet)
        : false,
  };

  const availableDateSet = useMemo(() => {
    const set = new Set<string>();
    if (enableDays && enableDays.length > 0) {
      enableDays.forEach((dayStr) => {
        const day = new Date(dayStr);
        set.add(day.toDateString());
      });
    }
    if (enableRange) {
      const currentDate = new Date(enableRange.from);
      if (enableRange.to) {
        while (currentDate <= new Date(enableRange.to)) {
          set.add(currentDate.toDateString());
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        set.add(currentDate.toDateString());
      }
    }
    return set;
  }, [enableDays, enableRange]);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen} {...props}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            'w-full justify-between text-left font-normal flex items-center py-2 pr-0 pl-2 border border-input border-solid rounded text-neutral-400 text-sm h-10',
            !field?.value && 'text-muted-foreground',
            {
              'opacity-50 bg-neutral_high-light cursor-not-allowed': disabled,
            },
          )}
        >
          <CalendarIcon className="h-4 w-4 mr-1.5" />
          {field?.value ? dateDisplay(field?.value) : <span>dd/mm/aaaa</span>}
          {field?.value && !disabledClear ? (
            <div
              title="Limpar"
              className="flex flex-col justify-center items-center p-1 mt-0.5 mx-1.5 rounded-full hover:bg-muted cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                field?.onChange(undefined);
              }}
            >
              <X className="h-4 w-4 stroke-muted-foreground" />
            </div>
          ) : (
            <div className={cn(disabledClear ? 'w-4' : 'w-9')}></div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={getSelectedDate(field?.value)}
          onSelect={(e: any) => {
            field?.onChange(e);
            if (onChange) onChange(e);
            if (closeAfterSelect) setIsCalendarOpen(false);
          }}
          defaultMonth={monthFocus(field?.value)}
          disabled={disabledDate}
          initialFocus
          onMonthChange={props?.onMonthChange}
          modifiers={enableDates}
        />
      </PopoverContent>
    </Popover>
  );
}
