import { useState } from "react";

export function SafeImg({
  src,
  alt,
  className = "",
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className={`grid place-items-center bg-gradient-to-b from-[#2a2a32] to-[#121216] ${className}`} role="img" aria-label={alt}>
        <span className="px-2 text-center font-display text-lg tracking-wide text-white/70">{fallback ?? alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setOk(false)} />;
}
