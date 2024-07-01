import { useEffect, useState } from 'react';

type ComponentProps = {
  children: React.ReactNode;
};

export function ClientOnly(props: ComponentProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR && props.children;
}
