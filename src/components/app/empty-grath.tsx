import { cn } from '@/lib';
import { BarChartBig } from 'lucide-react';

interface EmptyGraphProps {
  description?: string;
  className?: string;
}

export function EmptyGraph({ description, className }: EmptyGraphProps) {
  return (
    <div className={cn('w-full h-full flex flex-col justify-center')}>
      <div
        className={cn(
          'm-auto w-full flex flex-col justify-center items-center space-y-3',
          className,
        )}
      >
        <BarChartBig className="text-neutral-200 m-auto w-16 h-16 stroke-[1.5]" />
        <p className="text-sm xl:text-base text-neutral-400 w-3/4 m-auto font-bold text-center">
          {description
            ? description
            : 'Não há dados disponíveis para esta visualização'}
        </p>
      </div>
    </div>
  );
}
