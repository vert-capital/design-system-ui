import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from '@/index';
import { Copy } from 'lucide-react';
import { useState } from 'react';

type Props = {
  icon?: React.ReactNode;
  text: string;
  successMessage?: string;
  className?: string;
  hideText?: boolean;
};

export function CopyableText({
  icon,
  text,
  successMessage,
  className,
  hideText,
}: Props) {
  const [openCopyMsg, setOpenCopyMsg] = useState(false);
  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(text);
      setOpenCopyMsg(true);
      setTimeout(() => {
        setOpenCopyMsg(false);
      }, 1400);
    } catch (_) {
      setOpenCopyMsg(false);
    }
  };
  return (
    <TooltipProvider>
      <Tooltip open={openCopyMsg}>
        <TooltipTrigger asChild>
          {!hideText ? (
            <div
              className={cn(
                'h-full flex p-1 font-normal justify-between items-center cursor-pointer',
                className,
              )}
              onClick={copyEmail}
              title="Clique para copiar o texto"
            >
              <div className="h-full flex justify-center items-center">
                {icon}
                <div className="line-clamp-1 w-[12rem]">{text}</div>
              </div>
              <Copy className="h-3 w-3 mt-[0.18rem]" />
            </div>
          ) : (
            <div
              className={cn(
                'h-full flex font-normal justify-between items-center cursor-pointer',
                className,
              )}
              onClick={copyEmail}
              title="Clique para copiar o texto"
            >
              <Copy className="h-4 w-4" />
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{successMessage || 'Texto copiado!'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
