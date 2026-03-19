import Image from "next/image";

export function TypeIcon({
  icon,
  name,
  size = 48,
  className = "",
}: {
  icon: string;
  name: string;
  size?: number;
  className?: string;
}) {
  // If icon is a path (starts with /), render as image; otherwise render as emoji text
  if (icon.startsWith("/")) {
    return (
      <Image
        src={icon}
        alt={`${name} icon`}
        width={size}
        height={size}
        className={className}
      />
    );
  }
  return <span className={className}>{icon}</span>;
}
