import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/index";
import { cn } from "@/lib/utils";
import ptBR from "date-fns/locale/pt-BR";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { CaptionLabelProps, DayPicker, useNavigation } from "react-day-picker";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const months = [
  { label: "Janeiro", value: 0 },
  { label: "Fevereiro", value: 1 },
  { label: "Março", value: 2 },
  { label: "Abril", value: 3 },
  { label: "Maio", value: 4 },
  { label: "Junho", value: 5 },
  { label: "Julho", value: 6 },
  { label: "Agosto", value: 7 },
  { label: "Setembro", value: 8 },
  { label: "Outubro", value: 9 },
  { label: "Novembro", value: 10 },
  { label: "Dezembro", value: 11 },
];

const monthsShort = [
  { label: "Jan", value: 0 },
  { label: "Fev", value: 1 },
  { label: "Mar", value: 2 },
  { label: "Abr", value: 3 },
  { label: "Mai", value: 4 },
  { label: "Jun", value: 5 },
  { label: "Jul", value: 6 },
  { label: "Ago", value: 7 },
  { label: "Set", value: 8 },
  { label: "Out", value: 9 },
  { label: "Nov", value: 10 },
  { label: "Dez", value: 11 },
];

const generateYears = () => {
  const interval = 10;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - interval; i <= currentYear + interval; i++) {
    years.push(i);
  }
  return years.sort((a, b) => a - b);
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fixedWeeks
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 focus:text-brand text-brand aria-selected:border-none",
        ),
        day_range_end: "day-range-end aria-selected:text-slate-50",
        day_selected:
          "day-selected-only bg-brand !text-slate-50 hover:!bg-brand/50 hover:!text-primary-foreground focus:bg-brand focus:text-primary-foreground",
        day_today: "border-dashed border-2 !text-brand",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:text-muted-foreground aria-selected:opacity-30 hover:text-brand",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "day-range-middle aria-selected:!bg-accent aria-selected:!text-accent-foreground",
        day_hidden: "invisible",
        day_range_start: "day-range-start aria-selected:text-slate-50",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" {...props} />
        ),
        CaptionLabel: (prop) => <CaptionLabel prop={prop} />,
      }}
      locale={ptBR}
      {...props}
    />
  );
}

function CaptionLabel({ prop }: { prop: CaptionLabelProps }) {
  const { goToMonth } = useNavigation();

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center justify-center rounded-md px-1.5 text-sm hover:bg-brand/10">
            {
              [...months].find(
                (m) => m.value === new Date(prop.displayMonth).getMonth(),
              )?.label
            }
            <ChevronDown className="ml-1 h-3 w-3" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid grid-cols-2 gap-1 p-1">
            {monthsShort.map((m) => (
              <DropdownMenuItem
                key={m.value}
                className={cn(
                  "cursor-pointer justify-center rounded-md px-1.5 text-center text-sm",
                  {
                    "bg-brand/20":
                      new Date(prop.displayMonth).getMonth() === m.value,
                  },
                )}
                onClick={() => {
                  const newDate = new Date(prop.displayMonth);
                  newDate.setMonth(m.value);
                  goToMonth(newDate);
                  // setOpen(false);
                }}
              >
                {m.label}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center justify-center rounded-md px-1.5 text-sm hover:bg-brand/10">
            {[...generateYears()].find(
              (m) => m === new Date(prop.displayMonth).getFullYear(),
            )}
            <ChevronDown className="ml-1 h-3 w-3" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid grid-cols-2 gap-1 p-1">
            {generateYears().map((m) => (
              <DropdownMenuItem
                key={m}
                className={cn(
                  "cursor-pointer justify-center rounded-md px-1.5 text-center text-sm",
                  {
                    "bg-brand/20":
                      new Date(prop.displayMonth).getFullYear() === m,
                  },
                )}
                onClick={() => {
                  const newDate = new Date(prop.displayMonth);
                  newDate.setFullYear(m);
                  goToMonth(newDate);
                }}
              >
                {m}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
