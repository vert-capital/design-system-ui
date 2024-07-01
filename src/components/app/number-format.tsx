import {
  AmountDisplayProps,
  amountDisplay,
  cn,
  percentageDisplay,
} from '@/lib';

type Props = {
  value: number;
  truncate?: boolean;
  type?: 'currency' | 'percentage';
  options?: AmountDisplayProps;
  className?: string;
};

export function NumberFormat({
  value,
  truncate = true,
  type = 'currency',
  options,
  className,
}: Props) {
  const result =
    type === 'percentage'
      ? percentageDisplay(value)
      : amountDisplay(value, options);
  return (
    <div
      className={cn(
        className,
        value < 0 && !options?.disableNegative ? 'text-destructive' : '',
        truncate && 'truncate',
      )}
      title={result}
    >
      {result}
    </div>
  );
}
