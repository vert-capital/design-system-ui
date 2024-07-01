import React, { useCallback, useRef, useState } from 'react';

import { Button } from '@/components/ui';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Icons } from '@/index';
import { cn, debounce } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { CommandList } from 'cmdk';
import { CheckBoxBasic } from './checkbox-basic';

const selectVariants = cva('', {
  variants: {
    size: {
      large: 'h-12',
      medium: 'h-10',
      small: 'h-8',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SearchboxProps extends VariantProps<typeof selectVariants> {
  disabled?: boolean;
  multiple?: boolean;
  value?: string | string[] | null;
  options: SearchItemOptions[];
  selecteds: SearchItemOptions[];
  className?: string;
  placeholder?: string;
  loading?: boolean;
  moreLoading?: boolean;
  totalRegisters?: number;
  error?: string;
  onSelect: (item: SearchItemOptions) => void;
  onClear?: () => void;
  onFetchMore?: () => void;
  onSearch?: (inputValue: string) => Promise<SearchItemOptions[]>;
}

export interface SearchItemOptions {
  value: string;
  label: string;
}

export const Searchbox = React.forwardRef<HTMLInputElement, SearchboxProps>(
  (
    {
      disabled = false,
      options,
      selecteds,
      className,
      size = 'medium',
      placeholder = 'Buscar',
      loading,
      moreLoading,
      error: errorParent,
      totalRegisters,
      onFetchMore,
      onSearch,
      onSelect,
    }: SearchboxProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [filteredItems, setFilteredItems] = useState<SearchItemOptions[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const [error, setError] = useState<string>(errorParent || '');
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce(async (searchValue: string) => {
        try {
          setError('');
          if (!searchValue) {
            setIsSearching(false);
            setFilteredItems([]);
            return;
          }

          if (onSearch) {
            setSearchLoading(true);
            const fetchedItems = await onSearch(searchValue);
            setFilteredItems(fetchedItems);
            setIsSearching(true);
          }
        } catch (error) {
          console.error('Erro ao buscar itens', error);
          setError('Ocorreu um erro');
        } finally {
          setSearchLoading(false);
        }
      }, 500),
      [onSearch],
    );

    const onValueChangeHandler = async (value: string): Promise<void> => {
      setInputValue(value);
      if (onSearch) {
        setSearchLoading(true);
        debouncedSearch(value);
      }
    };

    const hasSelected = (item: SearchItemOptions): boolean | undefined => {
      return selecteds?.some((selected) => selected.value === item.value);
    };

    // Render default items
    function RenderItems() {
      if (
        !isSearching &&
        !filteredItems?.length &&
        !options?.length &&
        !loading
      ) {
        return (
          <CommandItem
            key={`${inputValue}`}
            value={`${inputValue}`}
            className="text-xs text-muted-foreground"
          >
            <div className={cn('mr-2 h-4 w-4')} />
            Não há emissões
          </CommandItem>
        );
      }

      return (
        <>
          {!isSearching &&
            !filteredItems?.length &&
            options
              ?.filter((i) => !hasSelected(i))
              .map((item, index) => {
                return (
                  <CommandItem
                    key={`${item.value}-${index}`}
                    value={item.label}
                    className="px-0 pb-0 pt-4 aria-selected:bg-transparent flex flex-col items-start"
                  >
                    <CheckBoxBasic
                      disabled={disabled}
                      className="flex-1 "
                      label={item.label}
                      onCheckedChange={() => onSelect(item)}
                    />
                  </CommandItem>
                );
              })}

          {/* Botão de carregar mais */}
          {!isSearching &&
          !filteredItems?.length &&
          totalRegisters &&
          options &&
          totalRegisters > options?.length ? (
            <div className="flex h-auto mt-4 w-full justify-center items-center">
              <Button
                type="button"
                variant={'ghost'}
                className="w-full"
                disabled={moreLoading}
                onClick={() => {
                  if (onFetchMore && !moreLoading) {
                    onFetchMore();
                  }
                }}
              >
                {moreLoading ? (
                  <Icons.Loader2 className="h-4 w-4 animate-fast-spin stroke-brand" />
                ) : (
                  'Carregar mais'
                )}
              </Button>
            </div>
          ) : null}
        </>
      );
    }

    function RenderfilteredItems() {
      /* API Data list for Fetched Items*/
      return isSearching && !filteredItems?.length ? (
        <div className="w-full flex justify-center items-center text-muted-foreground p-1 text-sm">
          Nenhuma emissão encontrada
        </div>
      ) : isSearching ? (
        <div className="flex flex-col justify-start items-start mb-5">
          {filteredItems
            ?.filter((i) => !hasSelected(i))
            .map((item, index) => {
              return (
                <CommandItem
                  key={`${item.value}-${index}`}
                  value={item.label}
                  className="px-0 pb-0 pt-4 aria-selected:bg-transparent flex flex-col items-start"
                >
                  <CheckBoxBasic
                    disabled={disabled}
                    className="flex-1"
                    label={item.label}
                    onCheckedChange={() => onSelect(item)}
                  />
                </CommandItem>
              );
            })}
        </div>
      ) : null;
    }

    // RENDER COMPONENT
    return (
      <div className="w-full" ref={ref}>
        <Command shouldFilter={!onSearch}>
          <div className="relative border-neutral_low-medium rounded border">
            <CommandInput
              ref={inputRef}
              placeholder={placeholder}
              value={inputValue}
              onValueChange={onValueChangeHandler}
              className={cn(
                selectVariants({ size: size ?? 'medium', className }),
              )}
              disabled={disabled}
            />
            {searchLoading ? (
              <div className="absolute top-0 right-0 h-10 w-10 bg-white flex justify-center items-center">
                <Icons.Loader2 className="h-4 w-4 animate-fast-spin stroke-brand" />
              </div>
            ) : null}
          </div>
          <CommandList>
            {error ? (
              <CommandEmpty>{error}</CommandEmpty>
            ) : (
              <CommandGroup className="">
                <RenderItems />
                <RenderfilteredItems />
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>
    );
  },
);
