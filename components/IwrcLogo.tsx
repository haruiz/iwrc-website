type IwrcLogoProps = {
  alt?: string;
  "aria-hidden"?: boolean | "true" | "false";
  className?: string;
  variant?: "icon" | "wordmark";
};

export function IwrcLogo({
  alt = "IWRC",
  "aria-hidden": ariaHidden,
  className,
  variant = "icon"
}: IwrcLogoProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const isAriaHidden = ariaHidden === true || ariaHidden === "true";
  const isWordmark = variant === "wordmark";

  return (
    <img
      src={`${basePath}/images/${isWordmark ? "iwrc-logo.png" : "iwrc-icon.png"}`}
      alt={isAriaHidden ? "" : alt}
      aria-hidden={isAriaHidden || undefined}
      className={className}
      width={isWordmark ? 1200 : 512}
      height={isWordmark ? 534 : 512}
    />
  );
}
