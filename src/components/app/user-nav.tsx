import { cn } from '@/lib';
import { LogOut } from 'lucide-react';
import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import { ImageFallback } from '.';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SliderStep,
} from '../ui';

export type UserProps = {
  id: number;
  nomeCompleto: string;
  email: string;
  avatar?: string;
  iniciais: string;
};

type Props = {
  user?: UserProps;
  isMobile?: boolean;
  goLogin?: () => void;
  logout?: () => void;
};
export function UserNav({ user, goLogin, logout }: Props) {
  const [fontSize, setFontSize] = useState(16);

  const handleSliderChange = useCallback((value: any) => {
    // change font size html tag
    const html = document.querySelector('html');
    if (html) {
      html.style.fontSize = `${value}px`;
      flushSync(() => {
        setFontSize(value);
      });
    }
  }, []);

  return !user?.id ? (
    goLogin ? (
      <Button variant={'outline'} onClick={goLogin}>
        Entrar
      </Button>
    ) : null
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative rounded-full  flex justify-end items-center space-x-3 cursor-pointer text-muted-foreground">
          <Avatar className="w-9 h-9">
            <ImageFallback
              height={40}
              width={40}
              src={user.avatar}
              className="border-[3px] border-neutral-100 rounded-full bg-neutral-200"
              alt={`User ${user.nomeCompleto}`}
            />
            <AvatarFallback className="bg-neutral-200">
              <div className="bg-muted-foreground text-white rounded-full h-7 w-7 flex justify-center items-center text-xs">
                {user.iniciais}
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <div className="w-full flex justify-center items-end mt-2">
          <Avatar className="w-16 h-16">
            <AvatarImage
              height={80}
              width={80}
              src={user.avatar}
              className="border-[3px] border-neutral-100 rounded-full"
              alt="User avatar"
            />
            <AvatarFallback className="bg-neutral-200">
              <div className="bg-muted-foreground text-white rounded-full h-12 w-12 flex justify-center items-center text-md">
                {user.iniciais}
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col justify-center items-center space-y-1 px-1 pb-2.5">
            <div className="text-sm font-bold leading-none truncate">
              {user.nomeCompleto}
            </div>
            <p className="text-xs leading-tight truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <div className="flex p-1 font-normal justify-between items-center">
            <div>Interface</div>
            <SliderStep
              defaultValue={[fontSize]}
              onValueCommit={handleSliderChange}
              className={cn('w-[60%]')}
              min={14}
              max={18}
              step={2}
            />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="!flex md:!hidden" />
        <DropdownMenuItem className="!flex md:!hidden" onClick={logout}>
          <div className="w-full flex p-1 font-normal justify-between items-center">
            <div>Sair</div>
            <LogOut className="h-4 w-4 stroke-destructive" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
