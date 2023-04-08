interface ThProps {
  children: React.ReactNode;
  className?: string;
}

export function Td({ className, children }: ThProps) {
  return (
    <td
      className={`
      px-2 md:px-4 py-4 whitespace-nowrap
        ${className}
        `}
    >
      {children}
    </td>
  );
}
