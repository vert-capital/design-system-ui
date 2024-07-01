import { cn } from '@/lib';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CardTotalList({ children, className }: Props) {
  return (
    <div
      className={cn(
        'grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}
