type Key = 'house' | 'medal' | 'dollar';

const PATHS: Record<Key, React.ReactNode> = {
  house: (
    <>
      <path d="M8 32 L32 12 L56 32" />
      <path d="M14 30 V52 H50 V30" />
      <path d="M28 52 V40 H36 V52" />
    </>
  ),
  medal: (
    <>
      <circle cx="32" cy="26" r="14" />
      <path d="M22 38 L18 56 L32 48 L46 56 L42 38" />
      <path d="M27 26 L31 30 L38 22" />
    </>
  ),
  dollar: (
    <>
      <line x1="32" y1="8" x2="32" y2="56" />
      <path d="M44 18 H26 a6 6 0 0 0 0 12 h12 a6 6 0 0 1 0 12 H20" />
    </>
  ),
};

export function AdvantageIcon({ kind }: { kind: Key }) {
  return (
    <svg
      className="advantage__icon"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[kind]}
    </svg>
  );
}
