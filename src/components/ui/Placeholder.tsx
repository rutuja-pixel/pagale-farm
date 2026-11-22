import { Trees } from 'lucide-react';

interface Props {
  tone?: number;
  label?: string;
  src?: string;
  ratio?: string;
  className?: string;
}

/** Shows a real photo when `src` is set, otherwise a labelled green placeholder. */
export default function Placeholder({ tone = 1, label = 'Photo placeholder', src, ratio, className = '' }: Props) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (src) {
    return <img className={`ph ph--img ${className}`} src={src} alt={label} style={style} loading="lazy" />;
  }
  return (
    <div className={`ph ph--${tone} ${className}`} role="img" aria-label={label} style={style}>
      <Trees size={28} strokeWidth={1.2} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
