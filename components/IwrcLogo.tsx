type IwrcLogoProps = {
  className?: string;
};

export function IwrcLogo({ className }: IwrcLogoProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="IWRC">
      <rect width="64" height="64" rx="14" fill="#102f3f" />
      <path d="M16 42c12-2 22-10 28-24 4 11 1 21-8 29-8 7-16 6-20-5Z" fill="#94c7c3" />
      <path d="M19 43c8-9 17-16 27-22" fill="none" stroke="#f6fbfb" strokeLinecap="round" strokeWidth="3" />
      <path d="M20 24c5 1 10 4 14 9" fill="none" stroke="#b7791f" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
