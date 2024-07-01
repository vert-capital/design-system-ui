import { cn } from '@/lib';
import { useState } from 'react';

type Props = {
  src?: string;
  className?: string;
  height?: number;
  width?: number;
  alt?: string;
  fallback?: React.ReactNode;
};

export function ImageFallback({ src, className, height, width, alt }: Props) {
  const checkIsUrlImage = () => {
    // check is url http or https and is image
    return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|svg)/g.test(
      src || '',
    );
  };

  const [show, setShow] = useState(!checkIsUrlImage() ? false : true);

  const hideImg = () => {
    setShow(false);
  };
  return (
    <img
      className={cn(
        className,
        !show || !src || !checkIsUrlImage() ? 'hidden' : '',
      )}
      height={height || 40}
      width={width || 40}
      src={src}
      alt={alt || 'Image'}
      onError={hideImg}
    />
  );
}
