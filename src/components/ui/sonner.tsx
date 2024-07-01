import {
  AlertTriangle,
  CheckCircle2,
  Info,
  RefreshCcw,
  XCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="stroke-green-600 h-5 w-5" />,
        info: <Info className="stroke-sky-600 h-5 w-5" />,
        warning: <AlertTriangle className="stroke-yellow-600 h-5 w-5" />,
        error: <XCircle className="stroke-destructive h-5 w-5" />,
        loading: <RefreshCcw className="stroke-brand h-5 w-5" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
