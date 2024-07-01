import { Icons, Skeleton } from '@/index';

type Props = {
  loading?: boolean;
  title: string;
  description?: any;
  error?: boolean;
  children?: React.ReactNode;
};

export function LabelInfo({
  loading,
  title,
  description,
  error,
  children,
}: Props) {
  const transformText = (description: any) => {
    if (typeof description === 'boolean') {
      return description ? 'Sim' : 'Não';
    }
    if (typeof description === 'number' && description === 0) {
      return '0';
    }
    return description || '-';
  };

  return loading ? (
    <div className="w-full space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-9/12" />
    </div>
  ) : (
    <div className="flex flex-col justify-start items-start">
      <label className="text-xs text-accent-foreground">{title}</label>
      {!error ? (
        <p className="p-0 text-sm font-bold">{transformText(description)}</p>
      ) : (
        <p className="p-0 text-xs font-bold text-destructive flex justify-start items-center">
          <Icons.XCircle className="h-3 w-3 mr-1" />
          <span>Ocorreu um erro</span>
        </p>
      )}

      {children}
    </div>
  );
}
