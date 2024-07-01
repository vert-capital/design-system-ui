type Props = {
  children?: React.ReactNode;
};
export function Navbar({ children }: Props) {
  return (
    <nav className="bg-white w-full h-16 flex items-center justify-center shadow-sm flex-none">
      <div className="w-full px-6 h-full sm:px-20 lg:max-w-content flex items-center justify-between space-x-4">
        {children}
      </div>
    </nav>
  );
}
