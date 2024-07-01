import { cn } from '@/lib';
import { Button } from '..';
type Props = {
  error?: string;
  onRefresh?: () => void;
  textBtn?: string;
  className?: string;
};
export function TryAgain({ error, onRefresh, textBtn, className }: Props) {
  return (
    <div
      className={cn('w-full h-64 flex justify-center items-center', className)}
    >
      <div
        className={cn(
          'w-full h-full bg-transparent flex flex-col justify-center items-center',
        )}
      >
        {error || 'Ocorreu um erro ao carregar os dados'}
        {onRefresh ? (
          <Button variant={'ghost'} onClick={onRefresh}>
            {textBtn || 'Tentar novamente'}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
