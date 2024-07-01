import { Icons, ResponsibleListItem, Skeleton } from '@/index';

type Props = {
  loading?: boolean;
  error?: boolean;
  count?: number;
  children?: React.ReactNode;
};

export function ResponsibleList({ loading, error, count, children }: Props) {
  return loading ? (
    <div className="w-full flex flex-col items-start justify-start space-y-2">
      <FakeItem />
      <FakeItem />
      <FakeItem />
    </div>
  ) : error ? (
    <p className="w-full p-0 text-xs font-bold text-destructive flex justify-start items-center">
      <Icons.XCircle className="h-3 w-3 mr-1" />
      <span>Ocorreu um erro</span>
    </p>
  ) : (
    <div className="w-full flex flex-col justify-start items-start space-y-2">
      {!count ? (
        <p className="p-0 text-xs text-accent-foreground">
          Nenhum responsável encontrado
        </p>
      ) : (
        children
      )}
    </div>
  );

  function FakeItem() {
    return (
      <div className="w-full flex space-x-2 justify-start items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="w-full space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-9/12" />
        </div>
      </div>
    );
  }
}

ResponsibleList.Item = ResponsibleListItem;
