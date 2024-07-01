import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CopyableText,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Skeleton,
  cn,
} from '@/index';
import { Mail, Star } from 'lucide-react';

type Props = {
  img?: string;
  name: string;
  initials?: string;
  area: string;
  email: string;
  isMain?: boolean;
  loading?: boolean;
  error?: boolean;
};

export function ResponsibleListItem({
  img,
  name,
  email,
  initials,
  area,
  isMain,
  loading,
  error,
}: Props) {
  return loading ? (
    <div className="w-full flex space-x-2 justify-start items-center">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-9/12" />
      </div>
    </div>
  ) : error ? (
    <p className="w-full p-0 text-xs font-bold text-destructive flex justify-start items-center">
      <Icons.XCircle className="h-3 w-3 mr-1" />
      <span>Ocorreu um erro</span>
    </p>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'w-auto py-1 pl-1 pr-8 flex justify-start items-center rounded-full cursor-pointer',
            isMain
              ? 'bg-brand/10 space-x-2'
              : 'bg-muted-foreground/30 space-x-4',
          )}
          title="Clique para ver detalhes"
        >
          <div className="w-8 flex-none">
            <Avatar className="h-9 w-9 rounded-full">
              <AvatarImage src={img} className="opacity-90" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          {isMain && (
            <div className="h-full w-5 flex-none flex justify-center items-center">
              <Star className="h-4 w-4 fill-brand stroke-brand" />
            </div>
          )}
          <div className="w-full flex-1 -space-y-1">
            <h6 className="p-0 text-sm font-bold line-clamp-1">{name}</h6>
            <p className="p-0 text-xs line-clamp-1">{area}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start" forceMount>
        <DropdownMenuLabel className="relative w-full font-normal flex justify-start items-center">
          <div className="w-12 flex-none">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarImage src={img} className="opacity-90" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-1 px-1 py-2.5">
            <div
              className="text-base font-bold leading-none line-clamp-1"
              title={name}
            >
              {name}
            </div>
            <p className="text-sm leading-tight line-clamp-1" title={name}>
              {area}
            </p>
          </div>
          <div className="absolute bottom-0 right-2 flex justify-end items-center">
            {isMain && (
              <Star className="h-2 w-2 fill-brand stroke-brand mr-1" />
            )}

            <span className="text-xs">
              {isMain ? 'Principal' : 'Secundário'}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <CopyableText
            text={email}
            icon={
              <Mail className="h-4 w-4 mt-[0.18rem] mr-1 fill-brand stroke-white" />
            }
          />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
