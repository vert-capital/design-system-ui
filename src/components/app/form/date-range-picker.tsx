import { Button, DateRange } from "@/components";
import { cn, dateDisplay } from "@/index";
import { PopoverClose } from "@radix-ui/react-popover";
import { CalendarIcon, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export interface DateRangePickerProps {
  field?: any;
  description?: string;
  placeholder?: string;
  alignText?: "left" | "center";
  align?: "start" | "center" | "end";
  disabledRange?: DateRange;
  disabledDays?: any[];
  enableDays?: Date[];
  enableRange?: DateRange;
  limitBefore?: { day?: number; month?: number };
  limitAfter?: { day?: number; month?: number };
  closeAfterSelect?: boolean;
  disabled?: boolean;
  className?: string;
  disabledClear?: boolean;
  bookedDates?: Date[];
  bookedText?: string;
  onSelected?: (value: { from?: Date; to?: Date } | undefined) => void;
  onOpenChange?: (value: boolean) => void;
}

export function DateRangePicker({
  align = "end",
  alignText = "left",
  field,
  placeholder,
  disabledRange,
  disabledDays = [],
  enableDays,
  enableRange,
  limitBefore,
  limitAfter,
  closeAfterSelect,
  disabled,
  className,
  disabledClear,
  bookedDates,
  bookedText,
  onSelected,
  onOpenChange,
  ...props
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicLimitBefore, setDynamicLimitBefore] = useState<
    Date | undefined
  >(undefined);
  const [dynamicLimitAfter, setDynamicLimitAfter] = useState<Date | undefined>(
    undefined,
  );

  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  // Criar conjunto de datas desabilitadas
  const disabledDate = useMemo(() => {
    const set = new Set<string>();
    disabledDays.forEach((day) => set.add(new Date(day).toDateString()));

    if (disabledRange?.from && disabledRange?.to) {
      const currentDate = new Date(disabledRange.from);
      while (currentDate <= new Date(disabledRange.to)) {
        set.add(currentDate.toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return set;
  }, [disabledDays, disabledRange]);

  // Criar conjunto de datas habilitadas
  const availableDateSet = useMemo(() => {
    const set = new Set<string>();
    if (enableDays) {
      enableDays.forEach((day) => {
        const date = new Date(day);
        set.add(date.toDateString());
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

  // Verificação de desabilitação com base em limitBefore, limitAfter e limites dinâmicos
  const isDisabled = (date: Date) => {
    const dateString = date.toDateString();

    // Verifica se a data está fora dos limites dinâmicos
    if (dynamicLimitBefore && date < dynamicLimitBefore) {
      return true;
    }

    if (dynamicLimitAfter && date > dynamicLimitAfter) {
      return true;
    }

    // Se há datas habilitadas, desabilita todas que não estão na lista de habilitadas
    if (availableDateSet.size > 0) {
      return !availableDateSet.has(dateString);
    }

    // Se não há datas habilitadas, usa as datas desabilitadas
    return disabledDate.has(dateString);
  };

  // Definir os limites dinâmicos com base na data selecionada
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

    setDynamicLimitBefore(beforeDate);
    setDynamicLimitAfter(afterDate);
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

  const ContentButton = () => {
    return (
      <>
        <CalendarIcon className="ds-calendar-icon-vert mr-1.5 h-4 w-4" />
        {field?.value?.from ? (
          dateDisplay(field.value.from) + " - " + dateDisplay(field.value.to)
        ) : (
          <span className="ds-calendar-placeholder-vert">
            {placeholder || "dd/mm/aaaa - dd/mm/aaaa"}
          </span>
        )}
      </>
    );
  };

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => setIsOpen(open)}
      {...props}
    >
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded border border-solid border-input py-2 pl-2 pr-0 text-left text-sm font-normal text-neutral-400",
            !field?.value && "text-muted-foreground",
            {
              "cursor-not-allowed bg-neutral_high-light opacity-50": disabled,
            },
            className,
          )}
        >
          {alignText === "center" ? (
            <ContentButton />
          ) : (
            <div className="flex items-center justify-start">
              <ContentButton />
            </div>
          )}

          {(field?.value?.from || field?.value?.to) && !disabledClear ? (
            <div
              title="Limpar"
              className="ds-calendar-close-vert mx-1.5 mt-0.5 flex cursor-pointer flex-col items-center justify-center rounded-full p-1 hover:bg-muted"
              onClick={(e: any) => {
                e?.stopPropagation();
                field?.onChange({ from: undefined, to: undefined });
                if (onSelected) onSelected(undefined);

                setDynamicLimitBefore(undefined);
                setDynamicLimitAfter(undefined);
              }}
            >
              <X className="h-4 w-4 stroke-muted-foreground" />
            </div>
          ) : (
            <div className={cn(disabledClear ? "w-4" : "w-9")}></div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="relative w-full p-0">
        <div className="flex flex-col">
          <Calendar
            mode="range"
            disabled={isDisabled}
            onSelect={(value: { from?: Date; to?: Date } | undefined) => {
              if (value?.from) {
                getLimitDates(value?.from); // Define os limites dinâmicos a partir da data inicial
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
            modifiers={{
              booked: bookedDates?.length ? bookedDates : [],
            }}
            bookedText={bookedText}
          />
          <div className="flex w-full items-center justify-between pb-2 pl-2 pr-2">
            <Button
              variant="ghost"
              size={"sm"}
              type="button"
              className="rounded-md px-2 text-sm font-normal text-muted-foreground"
              onClick={(e: any) => {
                e.stopPropagation();
                field?.onChange({ from: undefined, to: undefined });
                if (onSelected) onSelected({ from: undefined, to: undefined });

                setDynamicLimitBefore(undefined);
                setDynamicLimitAfter(undefined);
              }}
            >
              Limpar
            </Button>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                size={"sm"}
                type="button"
                className="rounded-md px-2 text-sm"
              >
                OK
              </Button>
            </PopoverClose>
          </div>
          <div className="absolute -right-2 -top-2">
            <PopoverClose asChild>
              <div
                title="Fechar"
                className="cursor-pointer rounded-full border bg-white p-1 hover:bg-muted"
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
