import LogoImg from '@/assets/logo.svg';
import { cn } from '@/lib';

type Props = {
  className?: string;
  height?: number;
  width?: number;
  src?: string;
};
export function Logo({ className, height, width, src }: Props) {
  return (
    <img
      src={src || LogoImg}
      alt="Logo VERT Capital"
      height={height || 40}
      width={width || 80}
      className={cn(!height && 'h-auto', !width && ' w-20', className)}
    />
  );
}
