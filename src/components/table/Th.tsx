interface ThProps {
  children: React.ReactNode;
  className?: string;
}

export function Th({className, children}:ThProps) {
  return (
    <th
      scope="col"
      className={`
        px-2 md:px-4 py-3 text-left md:text-sm text-[10px] font-medium text-zinc-300 uppercase tracking-wider
        ${className}
        `}>
      {children}
    </th>
  );
}
