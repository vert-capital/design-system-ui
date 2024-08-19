import { cn } from "@/lib";
import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  column: Column<any, unknown>;
  title: string;
  isSort?: boolean;
  className?: string;
};
export function DataTableHeader({ title, column, isSort, className }: Props) {
  const toggleSorting = () => {
    const currentSort = column.getIsSorted();

    if (currentSort === "asc") {
      column.toggleSorting(true); // Muda para 'desc'
    } else if (currentSort === "desc") {
      column.clearSorting(); // Muda para 'nenhum'
    } else {
      column.toggleSorting(false); // Muda para 'asc'
    }
  };

  return (
    <div
      className={cn(
        "flex justify-start items-center space-x-1",
        className,
        isSort ? "cursor-pointer" : ""
      )}
      onClick={isSort ? toggleSorting : undefined}
    >
      <div className="text-xs select-none truncate" title={title}>
        {title}
      </div>
      {isSort ? (
        column.getSortIndex() >= 0 ? (
          column.getIsSorted() === "asc" ? (
            <div className="flex flex-col justify-center items-center">
              <ChevronUp className="h-3 w-3 stroke-[3] stroke-brand -mb-1.5" />
              <ChevronDown className="h-3 w-3 stroke-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <ChevronUp className="h-3 w-3 -mb-1.5 stroke-muted-foreground" />
              <ChevronDown className="h-3 w-3 stroke-[3] stroke-brand" />
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center">
            <ChevronUp className="h-3 w-3 -mb-1.5 stroke-muted-foreground" />
            <ChevronDown className="h-3 w-3 stroke-muted-foreground" />
          </div>
        )
      ) : null}
    </div>
  );
}
