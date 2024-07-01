import {
  PaginationOptions,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  pageSizeOptions,
} from '@/components';
import { Icons, cn } from '@/index';
import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationOptions?: PaginationOptions;
}

export function DataTablePagination<TData>({
  table,
  paginationOptions,
}: DataTablePaginationProps<TData>) {
  const { paginationRange } = useSimplePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    pageCount: table.getPageCount(),
  });

  return (
    <div className="w-full md:flex md:flex-row md:items-center md:justify-between py-2 px-0 md:py-0 md:px-2">
      {paginationOptions?.rowCount && (
        <div
          className="text-sm truncate"
          title={`${paginationOptions?.rowCount} itens`}
        >
          {paginationOptions?.rowCount == 1
            ? '1 item'
            : `${paginationOptions?.rowCount} itens`}
        </div>
      )}

      <div className="w-auto !flex !flex-col !items-end md:!flex-row md:!items-center">
        <div className="flex h-full !mb-2 md:!mb-0 !mr-0 md:!mr-4">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Mostrar {pageSize} itens
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center md:!justify-center h-8 relative">
          <div
            className={cn(
              'h-full w-8 p-0 border rounded-l-full border-muted-foreground/50 flex justify-center items-center',
              !table.getCanPreviousPage()
                ? 'cursor-not-allowed text-muted-foreground'
                : 'cursor-pointer text-brand',
            )}
            onClick={() =>
              !table.getCanPreviousPage() ? null : table.previousPage()
            }
          >
            <span className="sr-only">Ir para a página anterior</span>
            <Icons.ChevronLeftIcon className="h-4 w-4" />
          </div>
          {paginationRange.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                item !== '...' && table.setPageIndex(Number(item) - 1)
              }
              className={cn(
                'h-full w-auto min-w-[28px] max-w-max break-words p-0 px-1 border-r border-t border-b border-muted-foreground/50 flex justify-center items-center text-xs',
                typeof item === 'number' &&
                  table.getState().pagination.pageIndex === item - 1
                  ? 'text-brand font-semibold'
                  : 'text-muted-foreground',
                typeof item === 'number'
                  ? 'cursor-pointer hover:text-brand'
                  : 'cursor-not-allowed',
              )}
            >
              {item}
            </div>
          ))}
          <div
            className={cn(
              'h-full w-8 p-0 border-r border-t border-b rounded-r-full border-muted-foreground/50 flex justify-center items-center',
              !table.getCanNextPage()
                ? 'cursor-not-allowed text-muted-foreground'
                : 'cursor-pointer text-brand',
            )}
            onClick={() => (!table.getCanNextPage() ? null : table.nextPage())}
          >
            <span className="sr-only">Ir para a próxima página</span>
            <Icons.ChevronRightIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

const useSimplePagination = ({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) => {
  const paginationRange = useMemo(() => {
    let range = [];

    if (pageCount <= 5) {
      // Se o total de páginas for 5 ou menos, exibir todas
      range = [...Array(pageCount).keys()].map((n) => n + 1);
    } else {
      // Adicionar a primeira página sempre
      range.push(1);

      // Determinando a gama dinâmica de páginas a ser exibida
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(pageCount - 1, currentPage + 1);

      // Ajustando o início e o fim para manter o tamanho do intervalo constante
      if (currentPage < 4) {
        endPage = 5;
      } else if (currentPage > pageCount - 3) {
        startPage = pageCount - 4;
      }

      // Adicionando "..." se necessário após a primeira página
      if (startPage > 2) {
        range.push('...');
      }

      // Adicionando as páginas intermediárias
      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      // Adicionando "..." se necessário antes da última página
      if (endPage < pageCount - 1) {
        range.push('...');
      }

      // Adicionando a última página sempre
      range.push(pageCount);
    }

    return range;
  }, [currentPage, pageCount]);

  return { paginationRange, pageCount };
};
