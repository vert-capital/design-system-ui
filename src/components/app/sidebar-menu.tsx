import { cn } from '@/lib';
import { LucideIcon } from 'lucide-react';
import {
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui';

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'link' | 'default';
    active?: boolean;
    onClick?: () => void;
  }[];
}
export function SidebarMenu({ links, isCollapsed }: NavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <ScrollArea className="h-[90%] w-full">
        <nav className="">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    key={index}
                    onClick={() => {
                      link.onClick?.();
                    }}
                    className={cn(
                      'group w-full border-l-4 border-brand flex items-center h-12 pl-3.5 cursor-pointer hover:border-brand hover:bg-brand/10 hover:text-brand',
                      link.active ? 'border-brand bg-brand/10' : 'border-white',
                    )}
                  >
                    <link.icon
                      className={cn(
                        'h-4 w-4 group-hover:stroke-brand',
                        link.active
                          ? 'stroke-brand'
                          : 'stroke-muted-foreground',
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div
                key={index}
                onClick={() => {
                  link.onClick?.();
                }}
                className={cn(
                  'group border-l-4 flex justify-start items-center text-sm h-12 pl-3.5 font-medium cursor-pointer hover:border-brand hover:bg-brand/10 hover:text-brand',
                  link.active
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-white text-muted-foreground',
                )}
              >
                <link.icon
                  className={cn(
                    'h-3.5 w-3.5 mr-3 group-hover:stroke-brand',
                    link.active ? 'stroke-brand' : 'stroke-muted-foreground',
                  )}
                />
                {link.title}
              </div>
            ),
          )}
        </nav>
      </ScrollArea>
    </TooltipProvider>
  );
}
