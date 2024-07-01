import { Card, CardContent, Icons, Skeleton, cn } from '@/index';

type Props = {
  loading?: boolean;
  amount?: string;
  title?: string;
  error?: boolean;
  className?: string;
};

export function CardTotal({
  loading,
  amount = '0,00',
  title = '',
  error,
  className,
}: Props) {
  if (error) {
    return (
      <Card className={cn('relative', className)}>
        <CardContent>
          <div className="flex flex-col">
            <div className="amount text-xl font-bold truncate w-full">
              Ocorreu um erro
            </div>
            <div className="title text-xs text-accent-foreground w-max cursor-pointer flex justify-start items-center">
              <Icons.RefreshCw className="mr-1 h-3 w-3" />
              Tente novamente
            </div>
          </div>
        </CardContent>
        <Icons.XCircle className="absolute top-2 right-2 h-4 w-4 text-destructive" />
      </Card>
    );
  }
  if (loading) {
    return (
      <Card className={cn(className)}>
        <CardContent>
          <div className="flex flex-col space-y-3">
            <div className="amount text-2xl font-bold truncate w-full">
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="title text-xs text-accent-foreground">
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex flex-col">
          <div
            className="amount text-2xl font-bold truncate w-full"
            title={amount}
          >
            {amount}
          </div>
          <div
            className="title text-xs text-accent-foreground truncate"
            title={title}
          >
            {title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
