import { LogOut, Menu } from 'lucide-react';
import { Button } from '../ui';
import { ApplicationsOptions } from './applications-options';
import { UserNav, UserProps } from './user-nav';

type Props = {
  isMobile?: boolean;
  user?: UserProps;
  hideApps?: boolean;
  hideNotifications?: boolean;
  hideUser?: boolean;
  hideLogout?: boolean;
  setCollapsed: () => void;
  goLogin?: () => void;
  logout?: () => void;
};
export function NavbarApp({
  isMobile,
  user,
  hideApps,
  hideUser,
  hideLogout,
  setCollapsed,
  goLogin,
  logout,
}: Props) {
  return (
    <nav className="bg-white w-full h-14 flex items-center justify-center shadow-sm flex-none z-10">
      <div className="w-full px-3 h-full flex items-center justify-between">
        {!isMobile ? (
          <div className="flex justify-start items-center">
            <Button variant={'ghost'} size={'icon'} onClick={setCollapsed}>
              <Menu className="h-5 w-5 stroke-muted-foreground" />
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex flex-none space-x-2">
          {!hideApps ? <ApplicationsOptions /> : null}
          {/* <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <Bell className="h-4 w-4 stroke-muted-foreground fill-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="flex items-center gap-4">
              Notificações
            </TooltipContent>
          </Tooltip> */}

          {!hideUser ? (
            <UserNav
              user={user}
              isMobile={isMobile}
              goLogin={goLogin}
              logout={logout}
            />
          ) : null}

          {!hideLogout ? (
            <Button
              variant={'ghost'}
              size={'icon'}
              className="!hidden md:!flex"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 stroke-muted-foreground" />
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
