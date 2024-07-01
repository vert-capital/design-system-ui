import { Logo } from './logo';

export function Footer() {
  return (
    <nav className="bg-white w-full h-16 flex items-center justify-center border-t border-muted-foreground/30 flex-none">
      <div className="w-full px-6 h-full sm:px-20 lg:max-w-content flex items-center justify-between">
        <Logo />
      </div>
    </nav>
  );
}
