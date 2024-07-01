import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  camelToSnake,
  cn,
} from '@/index';
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import { DataTablePagination } from './pagination';

export const pageSizeOptions = [5, 10, 30, 50];

export type PaginationOptions = {
  pageSize?: number;
  page?: number;
  pageCount?: number;
  rowCount?: number;
};

export type SortingOptions = {
  orderBy?: string;
  sortOrder?: string;
};

export type DataTableOptions = {
  pagination: PaginationOptions;
  sorting?: SortingOptions;
  loading?: boolean;
  error?: string;
  noResults?: string;
  disableHeader?: boolean;
  empty?: React.ReactNode;
  defaultExpanded?: boolean;
};

type DataTableProps = {
  columns: ColumnDef<any, any>[];
  data?: any[];
  options?: DataTableOptions;
  className?: string;
  initialHeight?: string;
  onPaginationChange?: (pagination: { page: number; pageSize: number }) => void;
  onSortingChange?: (sorting: { orderBy: string; sortOrder: string }) => void;
  onRefresh?: () => void;
  renderRowDetails?: (row: any) => React.ReactNode;
  footer?: React.ReactNode;
};

const mapSorting = (sorting?: SortingOptions) => {
  return [
    {
      id: sorting?.orderBy || '',
      desc: sorting?.sortOrder === 'desc',
    },
  ];
};

export function DataTable({
  columns,
  data = [],
  options,
  className,
  initialHeight = '15rem',
  onPaginationChange,
  onSortingChange,
  onRefresh,
  renderRowDetails,
  footer,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>(
    mapSorting(options?.sorting),
  );

  const handlePaginationChange: OnChangeFn<PaginationState> = (
    updaterOrValue: Updater<PaginationState> | PaginationState,
  ) => {
    let newPaginationState: PaginationState;

    if (typeof updaterOrValue === 'function') {
      newPaginationState = (
        updaterOrValue as (old: PaginationState) => PaginationState
      )({
        pageSize: options?.pagination?.pageSize || pageSizeOptions[0],
        pageIndex: options?.pagination?.page || 0,
      });
    } else {
      newPaginationState = updaterOrValue;
    }

    if (onPaginationChange)
      onPaginationChange({
        page: newPaginationState.pageIndex,
        pageSize: newPaginationState.pageSize,
      });
  };

  const handleSortingChange: OnChangeFn<SortingState> = (
    updaterOrValue: Updater<SortingState> | SortingState,
  ) => {
    let newSortingState: SortingState;

    if (typeof updaterOrValue === 'function') {
      newSortingState = (updaterOrValue as (old: SortingState) => SortingState)(
        sorting,
      );
    } else {
      newSortingState = updaterOrValue;
    }

    if (onSortingChange) {
      onSortingChange({
        orderBy: camelToSnake(newSortingState[0]?.id),
        sortOrder: newSortingState[0]?.desc ? 'desc' : 'asc',
      });
      setSorting(newSortingState);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: options?.pagination?.pageCount,
    state: {
      pagination: {
        pageSize: options?.pagination?.pageSize || pageSizeOptions[0],
        pageIndex: options?.pagination?.page || 0,
      },
      sorting: sorting,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    manualPagination: true,
    manualSorting: true,
  });

  // Determine the stripe style based on the last row
  const stripeFooterClass =
    table.getRowModel().rows.length % 2 === 0
      ? '[&_tr]:bg-white'
      : '[&_tr]:bg-muted/40';

  return (
    <div>
      <div className="relative">
        {options?.loading ? (
          <div className="z-20 absolute w-full h-full bg-white/60 flex flex-col justify-center items-center">
            <Loader2 className="h-12 w-12 animate-fast-spin stroke-1 stroke-brand" />
          </div>
        ) : null}

        <Table className={cn('z-10 relative', className)}>
          {options?.disableHeader != true && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}

          <TableBody>
            {options?.error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <div
                    style={{ height: initialHeight }}
                    className={cn(
                      'w-full bg-transparent flex flex-col justify-center items-center',
                    )}
                  >
                    {options?.error}
                    <Button variant={'ghost'} onClick={onRefresh}>
                      Tentar novamente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className="even:bg-muted/40 hover:bg-muted/70"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="pl-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {(row.getIsExpanded() || options?.defaultExpanded) &&
                    renderRowDetails &&
                    renderRowDetails(row.original) && (
                      <TableRow key={`${row.id}-detail`}>
                        <TableCell colSpan={columns.length} className="p-0">
                          {renderRowDetails(row.original)}
                        </TableCell>
                      </TableRow>
                    )}
                </Fragment>
              ))
            ) : options?.empty ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  {options?.empty}
                </TableCell>
              </TableRow>
            ) : !options?.loading &&
              (options?.pagination?.page != undefined ||
                options?.pagination?.page != null) &&
              options?.pagination?.page >= 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <div
                    style={{ height: initialHeight }}
                    className={cn(
                      'w-full bg-transparent flex flex-col justify-center items-center',
                    )}
                  >
                    {options?.noResults || 'Nenhum resultado'}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <div
                    style={{ height: initialHeight }}
                    className={cn('w-full bg-transparent')}
                  ></div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {footer && (
            <TableFooter
              className={cn(
                '[&_td]:pl-4 [&_td]:py-3 border-b',
                stripeFooterClass,
              )}
            >
              {footer}
            </TableFooter>
          )}
        </Table>
      </div>

      {options?.pagination?.rowCount && options.pagination.rowCount > 5 ? (
        <div className="mt-4">
          <DataTablePagination
            table={table}
            paginationOptions={options.pagination}
          />
        </div>
      ) : null}
    </div>
  );
}
