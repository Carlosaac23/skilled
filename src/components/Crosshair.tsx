export default function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute z-10 text-text-muted/40 ${className}`}
      width='11'
      height='11'
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Crosshair</title>
      <path d='M5.5 0V11M0 5.5H11' stroke='currentColor' strokeWidth='1' />
    </svg>
  );
}
