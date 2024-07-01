import { cn } from '@/lib';
import { useEffect, useRef } from 'react';

type Props = {
  pathname?: string;
  isCollapsed: boolean;
  preventingScrollRoutes?: string[];
  sibebar: React.ReactNode;
  navbar: React.ReactNode;
  content: React.ReactNode;
};
export function LayoutApp({
  pathname,
  isCollapsed,
  preventingScrollRoutes,
  sibebar,
  navbar,
  content,
}: Props) {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname) {
      if (scrollDivRef.current) {
        if (!preventingScrollRoutes?.includes(pathname || ''))
          scrollDivRef.current.scrollTop = 0;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="bg-background-screen flex h-screen bg-gray-100 overflow-y-hidden">
      <div
        className={cn(
          'transition-all duration-300 ease-in-out shadow-md min-h-screen bg-white flex-none',
          isCollapsed ? 'w-[50px]' : 'w-[223px]',
        )}
      >
        {sibebar}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {navbar}

        <main
          className="flex-1 overflow-x-hidden overflow-y-auto"
          ref={scrollDivRef}
          data-restore-scroll={preventingScrollRoutes?.includes(pathname || '')}
        >
          <div className="mx-auto py-4 px-8">{content}</div>
        </main>
      </div>
    </div>
  );
}
