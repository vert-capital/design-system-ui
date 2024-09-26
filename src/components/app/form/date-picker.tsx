import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, dateDisplay } from "@/index";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { PropsWithChildren, useMemo, useState } from "react";

export type DateRange = {
  from?: Date;
  to?: Date;
  after?: Date;
  before?: Date;
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
  className?: string;
  classNameContent?: string;
  placeholder?: string;
  align?: "left" | "center";
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
  className,
  classNameContent,
  placeholder,
  align = "left",
  onChange,
  ...props
}: PropsWithChildren<Props>) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const disabledDate = useMemo(() => {
    const set = new Set<string>();
    disabledDays.forEach((day) => set.add(day.toDateString()));

    if (disabledRange?.from && disabledRange?.to) {
      const currentDate = new Date(disabledRange.from);
      while (currentDate <= new Date(disabledRange.to!)) {
        set.add(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return set;
  }, [disabledDays, disabledRange]);

  const availableDateSet = useMemo(() => {
    const set = new Set<string>();
    if (enableDays) {
      enableDays.forEach((dayStr) => {
        const day = new Date(dayStr);
        set.add(day.toDateString());
      });
    }

    if (enableRange?.from) {
      const currentDate = new Date(enableRange.from);
      while (enableRange.to && currentDate <= new Date(enableRange.to)) {
        set.add(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return set;
  }, [enableDays, enableRange]);

  const isDisabled = (date: Date) => {
    const dateString = date.toDateString();

    // Enable dates should override disabled dates
    if (availableDateSet.size > 0) {
      return !availableDateSet.has(dateString); // If it's not an enabled date, disable it
    }

    // If the date is not in the enabled list and is in the disabled list, disable it
    return disabledDate.has(dateString);
  };

  const ContentButton = () => {
    return (
      <>
        <CalendarIcon className="ds-calendar-icon-vert mr-1.5 h-4 w-4" />
        {field?.value ? (
          dateDisplay(field?.value)
        ) : (
          <span className="ds-calendar-placeholder-vert">
            {placeholder || "dd/mm/aaaa"}
          </span>
        )}
      </>
    );
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen} {...props}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between truncate rounded border border-solid border-input py-2 pl-2 pr-0 text-left text-sm font-normal text-neutral-400",
            !field?.value && "text-muted-foreground",
            {
              "cursor-not-allowed bg-neutral_high-light opacity-50": disabled,
            },
            className,
          )}
        >
          {align === "center" ? (
            <ContentButton />
          ) : (
            <div className="flex items-center justify-start">
              <ContentButton />
            </div>
          )}

          {field?.value && !disabledClear ? (
            <div
              title="Limpar"
              className="ds-calendar-close-vert mx-1.5 mt-0.5 flex cursor-pointer flex-col items-center justify-center rounded-full p-1 hover:bg-muted"
              onClick={(e: any) => {
                e.stopPropagation();
                field?.onChange(undefined);
                if (onChange) onChange(undefined);
              }}
            >
              <X className="h-4 w-4 stroke-muted-foreground" />
            </div>
          ) : (
            <div className={cn(disabledClear ? "w-4" : "w-9")}></div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0", classNameContent)}>
        <Calendar
          mode="single"
          selected={getSelectedDate(field?.value)}
          onSelect={(e: any) => {
            field?.onChange(e);
            if (onChange) onChange(e);
            if (closeAfterSelect) setIsCalendarOpen(false);
          }}
          defaultMonth={monthFocus(field?.value)}
          disabled={
            disabledRange?.after
              ? {
                  after: disabledRange.after,
                }
              : disabledRange?.before
                ? {
                    before: disabledRange.before,
                  }
                : isDisabled
          }
          initialFocus
          onMonthChange={props?.onMonthChange}
          className="ds-calendar-vert"
        />
      </PopoverContent>
    </Popover>
  );
}
