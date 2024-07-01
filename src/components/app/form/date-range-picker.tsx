import { Button } from '@/components';
import { cn, dateDisplay } from '@/index';
import { PopoverClose } from '@radix-ui/react-popover';
import { CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

// Fonte -> https://github.com/johnpolacek/date-range-picker-for-shadcn/blob/main/src/date-range-picker.tsx

export interface DateRangePickerProps {
  field?: any;
  description?: string;
  /** Alignment of popover */
  align?: 'start' | 'center' | 'end';
  disabledRange?: {
    from: Date;
    to?: Date;
  };
  disabledDays?: any[];
  limitBefore?: { day?: number; month?: number };
  limitAfter?: { day?: number; month?: number };
  closeAfterSelect?: boolean;
  disabled?: boolean;
  onSelected?: (value: { from?: Date; to?: Date } | undefined) => void;
}

/** The DateRangePicker component allows a user to select a range of dates */
export function DateRangePicker({
  align = 'end',
  field,
  disabledRange,
  disabledDays = [],
  limitBefore,
  limitAfter,
  closeAfterSelect,
  disabled,
  onSelected,
  ...props
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [disabledDate, setDisabledDate] = useState([
    ...disabledDays,
    { from: disabledRange?.from, to: disabledRange?.to },
  ]);

  const getLimitDates = (fromDate: Date) => {
    let beforeDate: Date | undefined;
    let afterDate: Date | undefined;

    if (!limitBefore && !limitAfter) return;
    // Adjust 'before' date based on limitBefore value
    if (limitBefore) {
      beforeDate = new Date(fromDate);
      if (limitBefore.month !== undefined) {
        beforeDate.setMonth(beforeDate.getMonth() - limitBefore.month);
      }
      if (limitBefore.day !== undefined) {
        beforeDate.setDate(beforeDate.getDate() - limitBefore.day);
      }
    }

    // Ajusta 'afterDate' com base em 'limitAfter'
    if (limitAfter) {
      afterDate = new Date(fromDate);
      if (limitAfter.month !== undefined) {
        afterDate.setMonth(afterDate.getMonth() + limitAfter.month);
      }
      if (limitAfter.day !== undefined) {
        afterDate.setDate(afterDate.getDate() + limitAfter.day);
      }
    }

    setDisabledDate((prev) => ({
      ...prev,
      ...(beforeDate ? { before: beforeDate } : {}),
      ...(afterDate ? { after: afterDate } : {}),
    }));
  };

  const getSelectedDate = (date?: any) => {
    if (!date) return undefined;
    const selectedDate = new Date(date);
    const adjustedDate = new Date(
      selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000,
    );
    return adjustedDate;
  };

  const getSelectedRangeDate = (
    date?: { from?: Date; to?: Date } | undefined,
  ) => {
    return {
      from: getSelectedDate(date?.from),
      to: getSelectedDate(date?.to),
    };
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

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
      }}
      {...props}
    >
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            'w-full justify-between text-left font-normal flex items-center py-2 px-4 border border-input border-solid rounded text-sm text-neutral-400 h-10',
            {
              'opacity-50 bg-neutral_high-light cursor-not-allowed': disabled,
            },
          )}
        >
          <div className="py-1">
            {field?.value?.from ? (
              dateDisplay(field.value.from) +
              ' - ' +
              dateDisplay(field.value.to)
            ) : (
              <span>dd/mm/aaaa - dd/mm/aaaa</span>
            )}
          </div>
          <div className="flex justify-center items-center pl-1 text-sm text-neutral-400">
            {field?.value?.from || field?.value?.to ? (
              <div
                title="Limpar"
                className="flex flex-col justify-center items-center p-1 mt-0.5 mr-0.5 rounded-full hover:bg-muted cursor-pointer"
                onClick={(e: any) => {
                  e?.stopPropagation();
                  field?.onChange({ from: undefined, to: undefined });
                  if (onSelected) onSelected(undefined);

                  setDisabledDate([
                    ...disabledDays,
                    { from: disabledRange?.from, to: disabledRange?.to },
                  ]);
                }}
              >
                <X className="h-4 w-4 stroke-muted-foreground" />
              </div>
            ) : null}
            <CalendarIcon className="h-4 w-4" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-full relative p-0">
        <div className="flex flex-col">
          <Calendar
            mode="range"
            disabled={disabledDate}
            onSelect={(value: { from?: Date; to?: Date } | undefined) => {
              if (value?.from) {
                getLimitDates(value?.from);
                field?.onChange(value);
              }

              if (value?.to && onSelected) {
                onSelected(value);

                if (closeAfterSelect) {
                  setIsOpen(false);
                }
              }
            }}
            selected={getSelectedRangeDate(field?.value)}
            defaultMonth={monthFocus(field?.value?.from)}
          />
          <div className="w-full flex justify-between items-center pl-2 pr-2 pb-2">
            <Button
              variant="ghost"
              size={'sm'}
              type="button"
              className="text-sm rounded-md px-2 text-muted-foreground font-normal"
              onClick={(e: any) => {
                e.stopPropagation();
                field?.onChange({ from: undefined, to: undefined });
                if (onSelected) onSelected({ from: undefined, to: undefined });

                setDisabledDate([
                  ...disabledDays,
                  { from: disabledRange?.from, to: disabledRange?.to },
                ]);
              }}
            >
              Limpar
            </Button>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                size={'sm'}
                type="button"
                className="text-sm rounded-md px-2"
              >
                OK
              </Button>
            </PopoverClose>
          </div>
          <div className="absolute -top-2 -right-2">
            <PopoverClose asChild>
              <div
                title="Fechar"
                className="p-1 cursor-pointer rounded-full border bg-white hover:bg-muted"
              >
                <X className="h-4 w-4 stroke-brand" />
              </div>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
